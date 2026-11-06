// Genera todos los íconos de la app desde el logo oficial del ministerio
// (assets/brand/logo-ministerio.png: la Biblia abierta con la llama, 1254×1254; no se publica).
//
//   icon-192/512        "any": el logo completo (ya trae su fondo oscuro).
//   maskable-192/512    Android recorta en círculo o "squircle": el logo va al 72 % para que
//                       las letras de abajo queden dentro de la zona segura (círculo del 80 %),
//                       y el fondo (el mismo logo desenfocado) llega hasta los bordes.
//   apple-touch-icon    180 px, opaco (iPhone redondea las esquinas, no recorta en círculo).
//   favicon-16/32 y favicon.ico  solo el SÍMBOLO (Biblia y llama): a 32 px las letras no se leen.
//   simbolo-512         el símbolo solo, para pantallas como la bienvenida.
//   og-image            1200×630 para compartir en WhatsApp, Facebook, etc.
//
// Uso: node scripts/generate-app-icons.cjs   (necesita sharp, que ya está instalado)
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC = path.join(__dirname, "..", "client", "public");
const ICONS = path.join(PUBLIC, "icons");
const SOURCE = path.join(__dirname, "..", "assets", "brand", "logo-ministerio.png");
// PNG con paleta: se ven igual y pesan mucho menos que un PNG de foto.
const PNG = { palette: true, quality: 92, compressionLevel: 9, effort: 10 };

// Recorte del símbolo dentro del logo de 1254 px (la llama y la Biblia, sin las letras).
const SYMBOL_CROP = { left: 287, top: 18, width: 680, height: 680 };

// Color de las esquinas del logo: el fondo de afuera lleva ese mismo tono para que no se vea
// "un cuadrado negro" pegado encima.
async function cornerColor() {
  const { width, height } = await sharp(SOURCE).metadata();
  const s = 60;
  const spots = [[0, 0], [width - s, 0], [0, height - s], [width - s, height - s]];
  // La esquina MÁS OSCURA (las de arriba traen humo rojo y aclararían el fondo).
  let best = null;
  for (const [left, top] of spots) {
    // stats() mide la imagen de entrada e ignora extract(): primero se recorta a un búfer aparte.
    const corner = await sharp(SOURCE).extract({ left, top, width: s, height: s }).toBuffer();
    const { channels } = await sharp(corner).stats();
    const rgb = channels.slice(0, 3).map((c) => Math.round(c.mean));
    if (!best || rgb.reduce((a, b) => a + b, 0) < best.reduce((a, b) => a + b, 0)) best = rgb;
  }
  return best;
}

// Fondo del color de las esquinas con un brillo de brasa suave en el centro.
async function background(width, height) {
  const [r, g, b] = await cornerColor();
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="#ff5a1f" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#ff5a1f" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="rgb(${r},${g},${b})"/>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

// El logo con la orilla desvanecida, para que se funda con el fondo.
async function softLogo(size) {
  const blur = Math.round(size * 0.035);
  const pad = Math.round(size * 0.05);
  const mask = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${blur}"/></filter></defs>
    <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" rx="${Math.round(size * 0.12)}" fill="#fff" filter="url(#f)"/>
  </svg>`);
  return sharp(SOURCE).resize(size, size).ensureAlpha()
    .composite([{ input: await sharp(mask).png().toBuffer(), blend: "dest-in" }])
    .png().toBuffer();
}

async function maskable(size) {
  const logo = await softLogo(Math.round(size * 0.72));
  return sharp(await background(size, size)).composite([{ input: logo, gravity: "center" }]).png(PNG).toBuffer();
}

/** Un .ico con una sola imagen PNG dentro (válido en todos los navegadores actuales). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: ícono
  header.writeUInt16LE(1, 4); // una imagen
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // sin paleta
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por píxel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  return Buffer.concat([header, entry, png]);
}

(async () => {
  const save = (buf, name) => fs.writeFileSync(path.join(ICONS, name), buf);

  // "any": el logo completo
  for (const size of [192, 512]) {
    save(await sharp(SOURCE).resize(size, size).png(PNG).toBuffer(), `icon-${size}.png`);
  }
  // maskable
  const big = await maskable(512);
  save(big, "maskable-512.png");
  save(await sharp(big).resize(192, 192).png(PNG).toBuffer(), "maskable-192.png");
  // iPhone
  save(await sharp(SOURCE).resize(180, 180).flatten({ background: "#0a0507" }).png(PNG).toBuffer(), "apple-touch-icon.png");

  // símbolo (sin letras) y favicons
  const symbol = await sharp(SOURCE).extract(SYMBOL_CROP).resize(512, 512).png(PNG).toBuffer();
  save(symbol, "simbolo-512.png");
  const fav32 = await sharp(symbol).resize(32, 32).png().toBuffer();
  save(fav32, "favicon-32.png");
  save(await sharp(symbol).resize(16, 16).png().toBuffer(), "favicon-16.png");
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), pngToIco(fav32, 32));

  // imagen para compartir 1200×630
  const logo = await softLogo(600);
  const og = await sharp(await background(1200, 630)).composite([{ input: logo, gravity: "center" }]).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  save(og, "og-image.jpg");

  console.log("íconos listos: icon-192/512, maskable-192/512, apple-touch-icon, favicon-16/32, favicon.ico, simbolo-512, og-image.jpg");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
