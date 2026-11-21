# Vigilancia, respaldos, mapa del sitio y la RV1909 (21-nov-2026)

Esto es lo que se hizo sin abrir cuentas nuevas, a partir del informe de servicios gratis del 20-nov. Lo que falta
depende de cuentas que abre Luis.

## 1. La página de salud: `GET /api/salud`

Sirve para que un vigilante de afuera, como UptimeRobot, sepa si la web anda de verdad. Además de ver que el servidor
esté vivo, prueba la base de datos con `SELECT 1`. Tiene dos respuestas:

- **200** con `{"ok":true,"base":"ok",…}` cuando todo anda;
- **503** con `"ok":false` si la base no contesta en 4 segundos.

También trae `version`, que son los primeros 7 caracteres del commit publicado. Sirve para saber si un cambio ya salió.
El código está en `server/salud.ts` y sus pruebas en `server/salud.test.ts`.

`/api/hello` sigue igual: es la que usa Render para saber si el servidor arrancó, y no debe depender de la base.

### Los vigilantes que conviene crear (UptimeRobot, plan gratis)

| Qué vigila | Tipo | Dirección | Palabra |
|---|---|---|---|
| La web y la base | Palabra clave | `https://ministerioavivandoelfuego.com/api/salud` | `"ok":true` |
| La radio | Palabra clave | `https://radio.ministerioavivandoelfuego.com/api/nowplaying/avivando_el_fuego` | `"is_online":true` |

En las dos, el vigilante avisa cuando la palabra **no** aparece. La página de la radio la da AzuraCast. El 21-nov
respondía `"is_online":true`.

## 2. El respaldo diario: `.github/workflows/respaldo-base.yml`

Es una tarea diaria de GitHub que corre a las 9:17 UTC (madrugada en Texas). Hace esto:

1. **Copia la base** con `pg_dump` de PostgreSQL 18, la misma versión de la base de Render. El módulo
   `server/backup.ts` (`BACKUP_ENABLED`) **no debe encenderse**: corre en el servidor de Render, que trae un
   `pg_dump` más viejo, y no puede copiar una base PostgreSQL 18.
2. **La cifra** con la clave `RESPALDO_CLAVE` (gpg, AES256). Sin esa clave, la copia no se puede abrir.
3. **Prueba que se puede restaurar.** La carga en una base PostgreSQL 18 vacía dentro de la misma tarea y revisa que
   estén todas las tablas y que haya cuentas.
4. **La guarda en R2**, en una carpeta privada (bucket):
   - cada día en `diario/AAAA-MM-DD.dump.gpg`;
   - el día 1 de cada mes, también en `mensual/AAAA-MM.dump.gpg`.
5. **Avisa a Healthchecks.io** al empezar, al terminar bien y si falla.

**Hasta que se pongan los secretos, no hace nada**: solo deja un aviso. Las órdenes están en `script/respaldo-base.sh`.

Cada solicitud de cambio que toque el flujo o su script corre un **simulacro**. Arma una base de prueba con tildes y
eñes, la copia, la cifra, comprueba que no abre con otra clave, la restaura y compara tabla por tabla. No usa secretos
ni sube nada.

### Lo que hace Luis (una sola vez)

1. **En Cloudflare R2**, crear una carpeta privada para las copias, separada de la de los audios. Por ejemplo,
   `avivando-respaldos`, sin acceso público.
2. Crear un **token de API de R2** con permiso «Object Read & Write» **solo para esa carpeta**. Anotar el «Access Key
   ID», el «Secret Access Key» y la dirección S3, `https://<ID de la cuenta>.r2.cloudflarestorage.com`.
3. En la carpeta, poner dos **reglas de ciclo de vida** que borren las copias viejas:
   - `diario/` a los 35 días;
   - `mensual/` a los 400 días.
4. **En Render**, abrir la base y copiar la **External Database URL**. Si en «Access Control» la base solo acepta
   ciertas direcciones IP, GitHub no podrá entrar, porque sus máquinas cambian de IP.
5. Inventar una **clave larga** para cifrar y guardarla en un gestor de contraseñas. **Si se pierde, ninguna copia se
   podrá abrir.**
6. (Opcional) En **Healthchecks.io**, crear un chequeo diario con 2 horas de gracia y conectar Telegram. Así avisa si
   un día no llega la copia, o si GitHub apaga la tarea: lo hace en repositorios públicos tras 60 días sin cambios.
7. **En GitHub**, entrar en *Settings → Secrets and variables → Actions → New repository secret* y crear estos
   secretos:

| Secreto | Qué va |
|---|---|
| `RESPALDO_DATABASE_URL` | La External Database URL de Render |
| `RESPALDO_CLAVE` | La clave larga del paso 5 |
| `RESPALDO_R2_ENDPOINT` | `https://<ID de la cuenta>.r2.cloudflarestorage.com` |
| `RESPALDO_R2_BUCKET` | El nombre de la carpeta privada |
| `RESPALDO_R2_ACCESS_KEY_ID` | El Access Key ID del token |
| `RESPALDO_R2_SECRET_ACCESS_KEY` | El Secret Access Key del token |
| `RESPALDO_HEALTHCHECKS_URL` | (Opcional) La dirección de ping del chequeo |

Las llaves van **solo** en los secretos de GitHub, nunca en un archivo: el repositorio es público.

Después, para probarlo a mano: *Actions → Respaldo de la base → Run workflow*.

### Cómo restaurar una copia

En una computadora con Docker y gpg:

```bash
# 1. bajar la copia desde el panel de R2 (por ejemplo diario/2026-12-01.dump.gpg)
# 2. cargarla en una base vacía (la clave se pide por la variable, no queda en el historial con «read -s»)
read -s RESPALDO_CLAVE; export RESPALDO_CLAVE
bash script/respaldo-base.sh restaurar 2026-12-01.dump.gpg "postgresql://usuario:clave@servidor:5432/base_nueva"
```

Conviene ensayarla una vez al año en una base nueva de Render. **Nunca sobre la base en uso.** La tarea diaria ya prueba
cada copia en una base temporal.

## 3. El mapa del sitio y las respuestas 404

- **`/sitemap.xml`** (`server/sitemap.ts`). Trae las páginas públicas de siempre y la portada de la academia. Con la
  academia abierta, suma su catálogo, sus recursos, el reglamento, la declaración de fe, los 5 niveles, las 12
  especialidades y cada materia que ya se puede estudiar. Ya no pone la fecha del día como «última modificación»: Google
  deja de creerle a esa fecha si siempre es hoy.
- **Las direcciones que no son ninguna página responden 404**, con la misma página, que dice «Página no encontrada».
  Antes respondían 200, y Google las marcaba «soft 404». Se decide con la lista de rutas de `shared/titulos.ts`
  (`esRutaInexistente` en `server/seo.ts`). Por eso **una página nueva debe agregarse a `TITULOS`**, y
  `shared/titulos.test.ts` ya lo exige.
- `server/sitemap.test.ts` comprueba tres cosas:
  - que el mapa no traiga nada de lo que `robots.txt` cierra;
  - que ninguna página del mapa responda 404;
  - qué direcciones dan 404 y cuáles no.

## 4. La RV1909 dentro de la web

La Reina-Valera 1909 es de dominio público y ahora va dentro de la web, en `server/data/biblia/rv1909.json.gz` (1,3 MB).
Ya no se pide a getBible ni a la base. Así **el respaldo de las demás versiones siempre responde**: cuando Bolls no
contesta, se sirve la RV1909 con `fallbackFrom`.

- **De dónde sale:** la RV1909 de open-bibles (`spa-rv1909.usfx.xml`, marcada «Public Domain»), sin las etiquetas de
  Strong y sin el título de los salmos dentro del versículo 1, igual que la de getBible que se servía antes. Se armó
  con `script/convertir-rv1909.py`.
- **Comparada con getBible el 21-nov:** de 147 versículos de prueba, todos iguales.
- **Lo que tiene:** 66 libros, 1.189 capítulos y 31.087 versículos.
- **Las pruebas** están en `server/bible.test.ts`:
  - que cada libro tenga todos sus capítulos;
  - textos exactos con sus tildes (Juan 3:16, Génesis 1:1, Salmo 23:1);
  - que no salga a internet.

**Pendiente de Luis:** según el informe, la RVR1960 que se toma de Bolls probablemente no tiene licencia para mostrarse
completa en una web; la ABS pide permiso escrito. Hay dos caminos:

- pedir el permiso;
- cambiar a versiones libres. open-bibles trae también la *Biblia en Español Sencillo* (CC BY 4.0) y la *Versión Biblia
  Libre* (CC BY-SA 4.0).
