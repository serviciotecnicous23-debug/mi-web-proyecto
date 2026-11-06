// Pruebas del reconocimiento de enlaces. Correr: npx tsx --test shared/media.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyUrl, extractUrls, splitTextWithLinks, fileTypeOf, isShortLink } from "./media";

test("YouTube: watch, youtu.be, shorts, live, inicio y lista", () => {
  const w = classifyUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1m30s")!;
  assert.equal(w.provider, "youtube");
  assert.equal(w.kind, "video");
  assert.equal(w.id, "dQw4w9WgXcQ");
  assert.equal(w.start, 90);
  assert.match(w.embedUrl!, /youtube-nocookie\.com\/embed\/dQw4w9WgXcQ\?.*start=90/);
  assert.equal(w.thumbnail, "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
  assert.equal(classifyUrl("https://youtu.be/dQw4w9WgXcQ?si=abc")!.id, "dQw4w9WgXcQ");
  const s = classifyUrl("https://youtube.com/shorts/dQw4w9WgXcQ")!;
  assert.ok(s.aspect < 1, "los shorts son verticales");
  assert.equal(classifyUrl("https://m.youtube.com/live/dQw4w9WgXcQ?feature=share")!.id, "dQw4w9WgXcQ");
  assert.match(classifyUrl("https://www.youtube.com/playlist?list=PL1234567890abc")!.embedUrl!, /videoseries\?list=PL1234567890abc/);
  assert.equal(classifyUrl("https://www.youtube.com/@MinisterioAvivando")!.kind, "web");
});

test("Instagram, Facebook y TikTok", () => {
  const reel = classifyUrl("https://www.instagram.com/reel/C8abcDEF123/?igsh=xyz")!;
  assert.equal(reel.provider, "instagram");
  assert.equal(reel.kind, "video");
  assert.equal(reel.embedUrl, "https://www.instagram.com/reel/C8abcDEF123/embed/captioned/");
  const conUsuario = classifyUrl("https://www.instagram.com/pastor.juan/reel/C8abcDEF123/")!;
  assert.equal(conUsuario.id, "C8abcDEF123");
  assert.equal(classifyUrl("https://instagram.com/p/C8abcDEF123/")!.kind, "post");
  assert.equal(classifyUrl("https://www.instagram.com/ministerio/")!.kind, "web");

  const fb = classifyUrl("https://www.facebook.com/ministerio/videos/1234567890/")!;
  assert.equal(fb.kind, "video");
  assert.match(fb.embedUrl!, /plugins\/video\.php\?href=/);
  assert.ok(classifyUrl("https://www.facebook.com/reel/1234567890")!.aspect < 1);
  assert.equal(classifyUrl("https://fb.watch/abc123/")!.kind, "video");
  assert.equal(classifyUrl("https://www.facebook.com/ministerio/posts/pfbid0abc")!.kind, "post");

  const tk = classifyUrl("https://www.tiktok.com/@pastor/video/7312345678901234567?lang=es")!;
  assert.equal(tk.provider, "tiktok");
  assert.equal(tk.id, "7312345678901234567");
  assert.match(tk.embedUrl!, /tiktok\.com\/player\/v1\/7312345678901234567/);
  assert.ok(isShortLink("https://vm.tiktok.com/ZMabc123/"));
  assert.equal(classifyUrl("https://vm.tiktok.com/ZMabc123/")!.embedUrl, undefined);
});

test("Audio, otras plataformas y documentos de Google", () => {
  const sp = classifyUrl("https://open.spotify.com/intl-es/episode/4rOoJ6Egrf8K2IrywzwOMk?si=1")!;
  assert.equal(sp.kind, "audio");
  assert.equal(sp.height, 152);
  assert.match(sp.embedUrl!, /open\.spotify\.com\/embed\/episode\/4rOoJ6Egrf8K2IrywzwOMk/);
  assert.equal(classifyUrl("https://soundcloud.com/pastor/predica-domingo")!.kind, "audio");
  assert.equal(classifyUrl("https://vimeo.com/123456789/abcdef1234")!.embedUrl, "https://player.vimeo.com/video/123456789?autoplay=1&dnt=1&h=abcdef1234");
  assert.match(classifyUrl("https://www.twitch.tv/videos/123456")!.embedUrl!, /\{parent\}/);
  assert.equal(classifyUrl("https://x.com/pastor/status/1790000000000000000")!.kind, "post");
  const drive = classifyUrl("https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing")!;
  assert.equal(drive.embedUrl, "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/preview");
  assert.equal(classifyUrl("https://docs.google.com/document/d/1AbCdEfGhIjKlMnOp/edit")!.embedUrl, "https://docs.google.com/document/d/1AbCdEfGhIjKlMnOp/preview");
  assert.equal(classifyUrl("https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOp/edit")!.provider, "slides");
});

test("Archivos directos, subidos y data URL", () => {
  assert.equal(classifyUrl("https://ejemplo.com/estudio.PDF?x=1")!.fileType, "pdf");
  assert.equal(classifyUrl("https://ejemplo.com/predica.mp3")!.kind, "audio");
  assert.equal(classifyUrl("/files/abc123/Estudio%20de%20Romanos.docx")!.fileType, "word");
  assert.equal(classifyUrl("data:application/pdf;base64,JVBERi0=")!.fileType, "pdf");
  const db = classifyUrl("https://www.dropbox.com/scl/fi/abc/clase.pdf?rlkey=1&dl=0")!;
  assert.equal(db.provider, "dropbox");
  assert.match(db.embedUrl!, /raw=1/);
  assert.equal(classifyUrl("javascript:alert(1)"), null);
  assert.equal(classifyUrl("https://ministerioavivandoelfuego.com/eventos")!.kind, "web");
});

test("Enlaces dentro de un texto", () => {
  const text = "Miren esta prédica (https://youtu.be/dQw4w9WgXcQ). También www.ejemplo.com/estudio, y https://es.wikipedia.org/wiki/Fe_(religión).";
  assert.deepEqual(extractUrls(text), [
    "https://youtu.be/dQw4w9WgXcQ",
    "https://www.ejemplo.com/estudio",
    "https://es.wikipedia.org/wiki/Fe_(religión)",
  ]);
  const parts = splitTextWithLinks("Hola https://a.com/x!");
  assert.deepEqual(parts.map((p) => p.type), ["text", "link", "text"]);
  assert.equal(parts[2].value, "!");
  assert.deepEqual(extractUrls(""), []);
});

test("Tipo de archivo", () => {
  assert.equal(fileTypeOf("clase.pptx", ""), "powerpoint");
  assert.equal(fileTypeOf("x", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"), "word");
  assert.equal(fileTypeOf("foto.HEIC", ""), "image");
  assert.equal(fileTypeOf("datos.csv", "text/csv"), "csv");
  assert.equal(fileTypeOf("raro.xyz", ""), "other");
});
