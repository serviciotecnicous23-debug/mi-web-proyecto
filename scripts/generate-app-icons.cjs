// Genera los íconos "maskable" y el de iPhone a partir del logo oficial con fondo
// (client/public/icons/logo-transparent.png, el mismo logo con su brillo de fuego).
//
// Por qué: icon-192/512 llevan el logo con texto sobre fondo blanco y se declaraban
// "any maskable". Android recorta los maskable en círculo o "squircle" y se comía las
// esquinas de "AVIVANDO EL FUEGO". Un ícono maskable debe tener TODO lo importante dentro
// del círculo central del 80 % y fondo hasta los bordes.
//
// Uso: node scripts/generate-app-icons.cjs   (necesita sharp, que ya está instalado)
const path = require("path");
const sharp = require("sharp");

const ICONS = path.join(__dirname, "..", "client", "public", "icons");
const SOURCE = path.join(ICONS, "logo-transparent.png");

async function maskable(size) {
  const inner = Math.round(size * 0.78); // el logo entero cabe en la zona segura (círculo del 80 %)
  // Fondo: el mismo logo ampliado y desenfocado, para que el borde no se note.
  const background = await sharp(SOURCE)
    .resize(size, size, { fit: "cover" })
    .blur(Math.max(8, Math.round(size / 18)))
    .modulate({ brightness: 0.55 })
    .toBuffer();
  const logo = await sharp(SOURCE).resize(inner, inner).png().toBuffer();
  return sharp(background)
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
}

(async () => {
  const big = await maskable(512);
  await sharp(big).toFile(path.join(ICONS, "maskable-512.png"));
  await sharp(big).resize(192, 192).png({ compressionLevel: 9 }).toFile(path.join(ICONS, "maskable-192.png"));
  // iPhone no recorta en círculo (solo redondea esquinas) y no admite transparencia.
  await sharp(big).resize(180, 180).png({ compressionLevel: 9 }).toFile(path.join(ICONS, "apple-touch-icon.png"));
  console.log("íconos: maskable-512.png, maskable-192.png, apple-touch-icon.png");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
