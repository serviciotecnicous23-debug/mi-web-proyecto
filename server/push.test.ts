// Los avisos push (server/push.ts) con web-push 4, sin red y sin cuentas reales: se intercepta https.request,
// se revisan la firma VAPID y las cabeceras, y se descifra el aviso como lo hace el teléfono (aes128gcm, RFC 8291).
// npx tsx --test server/push.test.ts
import { test, type TestContext } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import https from "node:https";
import { EventEmitter } from "node:events";
import * as webPush from "web-push";

// Claves VAPID de prueba, hechas aquí mismo, antes de cargar server/push.ts (las lee al arrancar).
const vapid = webPush.generateVAPIDKeys();
process.env.VAPID_PUBLIC_KEY = vapid.publicKey;
process.env.VAPID_PRIVATE_KEY = vapid.privateKey;
process.env.VAPID_SUBJECT = "mailto:pruebas@example.com";
const push = await import("./push");

/** Un teléfono de mentira: las claves con que recibe los avisos cifrados. */
function telefono(endpoint: string) {
  const ecdh = crypto.createECDH("prime256v1");
  ecdh.generateKeys();
  const auth = crypto.randomBytes(16);
  return {
    ecdh,
    auth,
    suscripcion: { endpoint, keys: { p256dh: ecdh.getPublicKey().toString("base64url"), auth: auth.toString("base64url") } },
  };
}

/** Descifra el cuerpo como el navegador (RFC 8188 y 8291): sal, tamaño, clave del servidor y un solo registro. */
function descifrar(cuerpo: Buffer, tel: ReturnType<typeof telefono>): string {
  const sal = cuerpo.subarray(0, 16);
  const largoClave = cuerpo[20];
  const claveServidor = cuerpo.subarray(21, 21 + largoClave);
  const registro = cuerpo.subarray(21 + largoClave);
  const secreto = tel.ecdh.computeSecret(claveServidor);
  const info = Buffer.concat([Buffer.from("WebPush: info\0"), tel.ecdh.getPublicKey(), claveServidor]);
  const ikm = Buffer.from(crypto.hkdfSync("sha256", secreto, tel.auth, info, 32));
  const cek = Buffer.from(crypto.hkdfSync("sha256", ikm, sal, Buffer.from("Content-Encoding: aes128gcm\0"), 16));
  const nonce = Buffer.from(crypto.hkdfSync("sha256", ikm, sal, Buffer.from("Content-Encoding: nonce\0"), 12));
  const descifrador = crypto.createDecipheriv("aes-128-gcm", cek, nonce);
  descifrador.setAuthTag(registro.subarray(registro.length - 16));
  const claro = Buffer.concat([descifrador.update(registro.subarray(0, registro.length - 16)), descifrador.final()]);
  let fin = claro.length - 1;
  while (fin >= 0 && claro[fin] === 0) fin--; // el relleno
  assert.equal(claro[fin], 2, "el último registro termina en 0x02");
  return claro.subarray(0, fin).toString("utf8");
}

type Pedido = { opciones: https.RequestOptions; cuerpo: Buffer };

/** El servicio de avisos de mentira: guarda cada pedido y responde con el código que diga `estado`. */
function servicioDeAvisos(t: TestContext, estado: (ruta: string) => number): Pedido[] {
  const pedidos: Pedido[] = [];
  const falso = (opciones: https.RequestOptions, alResponder: (respuesta: EventEmitter) => void) => {
    const partes: Buffer[] = [];
    const pedido = new EventEmitter();
    Object.assign(pedido, {
      write(b: Buffer | string) {
        partes.push(Buffer.from(b));
      },
      end() {
        pedidos.push({ opciones, cuerpo: Buffer.concat(partes) });
        const respuesta = Object.assign(new EventEmitter(), { statusCode: estado(String(opciones.path)), headers: {} });
        setImmediate(() => {
          alResponder(respuesta);
          respuesta.emit("end");
        });
      },
      destroy(e?: Error) {
        if (e) pedido.emit("error", e);
      },
    });
    return pedido;
  };
  t.mock.method(https, "request", falso as unknown as typeof https.request);
  return pedidos;
}

test("un aviso sale bien: POST firmado con VAPID, con TTL y aes128gcm, y el teléfono lo descifra igual", async (t) => {
  const tel = telefono("https://push.example.com/aviso/abc123?canal=1");
  const pedidos = servicioDeAvisos(t, () => 201);
  const aviso = { title: "La radio está en vivo", body: "Únete a la oración de las 7 · ¡Dios te bendiga!", url: "/radio", tag: "radio" };
  assert.equal(push.isPushConfigured, true);
  assert.equal(await push.sendPushToSubscription(tel.suscripcion, aviso, { ttl: 3600.4 }), true);
  assert.equal(pedidos.length, 1);

  const { opciones, cuerpo } = pedidos[0];
  assert.equal(opciones.method, "POST");
  assert.equal(opciones.hostname, "push.example.com");
  assert.equal(opciones.path, "/aviso/abc123?canal=1");
  assert.equal(opciones.timeout, 10_000);
  const h = opciones.headers as Record<string, string | number>;
  assert.equal(String(h.TTL), "3600");
  assert.equal(h["Content-Encoding"], "aes128gcm");
  assert.equal(h["Content-Type"], "application/octet-stream");

  // La firma: «vapid t=<JWT>, k=<clave pública>», con el JWT firmado ES256 para el origen del servicio.
  const m = /^vapid t=([^,]+), k=(.+)$/.exec(String(h.Authorization));
  assert.ok(m, "la cabecera Authorization es vapid t=…, k=…");
  assert.equal(m[2], vapid.publicKey);
  const [cabeza, datos, firma] = m[1].split(".");
  const reclamo = JSON.parse(Buffer.from(datos, "base64url").toString("utf8"));
  assert.equal(reclamo.aud, "https://push.example.com");
  assert.equal(reclamo.sub, "mailto:pruebas@example.com");
  assert.ok(reclamo.exp * 1000 > Date.now() && reclamo.exp * 1000 <= Date.now() + 24 * 3600 * 1000, "vence antes de 24 horas");
  const pub = Buffer.from(vapid.publicKey, "base64url");
  const clave = crypto.createPublicKey({
    key: { kty: "EC", crv: "P-256", x: pub.subarray(1, 33).toString("base64url"), y: pub.subarray(33).toString("base64url") },
    format: "jwk",
  });
  assert.ok(crypto.verify("sha256", Buffer.from(`${cabeza}.${datos}`), { key: clave, dsaEncoding: "ieee-p1363" }, Buffer.from(firma, "base64url")), "la firma VAPID vale");

  assert.deepEqual(JSON.parse(descifrar(cuerpo, tel)), aviso);
});

test("sin ttl, el aviso espera hasta 4 semanas si el teléfono está apagado", async (t) => {
  const pedidos = servicioDeAvisos(t, () => 201);
  assert.equal(await push.sendPushToSubscription(telefono("https://push.example.com/x").suscripcion, { title: "Hola", body: "Hola" }), true);
  assert.equal(String((pedidos[0].opciones.headers as Record<string, string | number>).TTL), String(28 * 24 * 3600));
});

test("si el servicio responde 410 o 404, la suscripción venció (se borra); con otro error se guarda", async (t) => {
  const codigos: Record<string, number> = { "/vencida": 410, "/no-existe": 404, "/caido": 500 };
  servicioDeAvisos(t, (ruta) => codigos[ruta] ?? 201);
  t.mock.method(console, "error", () => {}); // el 500 se anota en el registro; aquí no hace falta verlo
  const aviso = { title: "Prueba", body: "Prueba" };
  assert.equal(await push.sendPushToSubscription(telefono("https://push.example.com/vencida").suscripcion, aviso), false);
  assert.equal(await push.sendPushToSubscription(telefono("https://push.example.com/no-existe").suscripcion, aviso), false);
  assert.equal(await push.sendPushToSubscription(telefono("https://push.example.com/caido").suscripcion, aviso), true);
});

test("sendPushToMany manda a todas (de 10 en 10) y devuelve solo las que vencieron", async (t) => {
  const pedidos = servicioDeAvisos(t, (ruta) => (ruta === "/s/7" || ruta === "/s/12" ? 410 : 201));
  const subs = Array.from({ length: 13 }, (_, i) => ({ id: i + 1, subscription: telefono(`https://push.example.com/s/${i + 1}`).suscripcion }));
  const vencidas = await push.sendPushToMany(subs, { title: "Aviso", body: "Para todos" });
  assert.equal(pedidos.length, 13);
  assert.deepEqual([...vencidas].sort((a, b) => a - b), [7, 12]);
});

test("las claves VAPID: la pública de 65 bytes y la privada de 32; getVapidPublicKey da la configurada", () => {
  const k = push.generateVapidKeys();
  assert.equal(Buffer.from(k.publicKey, "base64url").length, 65);
  assert.equal(Buffer.from(k.privateKey, "base64url").length, 32);
  assert.equal(push.getVapidPublicKey(), vapid.publicKey);
});
