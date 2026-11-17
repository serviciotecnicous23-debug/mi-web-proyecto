"""La narración grabada de las lecciones (docs/academia.md, «La voz de las lecciones»).

Graba con la voz de la academia (OmniVoice, clonando la referencia de esta carpeta: una voz hecha con IA, no la de una
persona) cada guion que dejó `npx tsx scripts/academia/narracion.ts guion <carpeta> ...`, y deja en la misma carpeta:
  <lección>.m4a          el audio (AAC 40 kbps, mono, 24 kHz, listo para el teléfono)
  <lección>.marcas.json  la huella, cuánto dura y el segundo en que empieza cada lugar de la página
Después: `npx tsx scripts/academia/narracion.ts registrar <carpeta>`.

Corre en WSL con Wan2GP (en la PC de Luis):  bash scripts/academia/voz/narrar.sh <carpeta> [--rehacer] [lección...]
Cada trozo se escucha con whisper: si no dice lo que tiene que decir, se graba otra vez (hasta 4 veces) y queda el mejor.
Se puede cortar y seguir: las lecciones que ya tienen su audio con la misma huella y el mismo guion se saltan
(--rehacer graba otra vez las lecciones nombradas aunque ya estén).
"""
import hashlib, json, os, re, subprocess, sys, time
from difflib import SequenceMatcher
from pathlib import Path

import numpy as np
import soundfile as sf
import librosa

AQUI = Path(__file__).resolve().parent
# la voz: voz-academia.json de esta carpeta (o la que diga VOZ_ACADEMIA, para probar otra)
VOZ_JSON = Path(os.environ.get("VOZ_ACADEMIA") or AQUI / "voz-academia.json")
VOZ = json.loads(VOZ_JSON.read_text(encoding="utf-8"))
REFERENCIA = VOZ_JSON.parent / VOZ["archivo"]
SR = 24000
MAX_TROZO = 230          # letras por trozo (una a tres oraciones)
PAUSA_ORACIONES = 0.32   # entre trozos de un mismo lugar
INTENTOS = 4
INTENTOS_CORTOS = 7      # un trozo de 6 palabras o menos (un subtítulo): sale rápido y le cuesta más
PARECIDO_MINIMO = 0.86   # lo que whisper entiende contra lo que debía decir (0 a 1)

# la cadena de locución (la de la Fábrica Viral, medida con OmniVoice) y el volumen final para el teléfono
CADENA = ("highpass=f=80:poles=2,equalizer=f=300:t=q:w=0.9:g=-3,equalizer=f=3500:t=q:w=1:g=2,"
          "equalizer=f=7000:t=q:w=1:g=-5,deesser=i=0.6:m=0.5:f=0.5:s=o,"
          "acompressor=threshold=-21dB:ratio=3:attack=15:release=120:knee=4:makeup=1.259,"
          "alimiter=limit=0.8414:attack=5:release=60:level=disabled")
LUFS = -16


def trozos(texto):
    """El texto en trozos de una a tres oraciones, sin pasar de MAX_TROZO letras (las largas se cortan en comas)."""
    oraciones = re.findall(r"[^.!?…]+[.!?…]+[»”\"]?\s*|[^.!?…]+$", texto.strip())
    out, actual = [], ""
    for o in oraciones:
        o = o.strip()
        partes = [o] if len(o) <= MAX_TROZO else re.split(r"(?<=[,;:])\s+", o)
        for p in partes:
            if actual and len(actual) + 1 + len(p) > MAX_TROZO:
                out.append(actual)
                actual = ""
            actual = f"{actual} {p}".strip()
    if actual:
        out.append(actual)
    return out


def palabras(t):
    from num2words import num2words
    t = re.sub(r"\d+", lambda m: num2words(int(m.group()), lang="es"), t.lower())
    t = t.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ü", "u")
    return re.sub(r"[^a-zñ ]", " ", t).split()


def recortar(y):
    """Quita el silencio del principio y del final (deja 40 ms de aire)."""
    i = librosa.effects.split(y, top_db=45)
    if not len(i):
        return y
    a = max(0, i[0][0] - int(0.04 * SR))
    b = min(len(y), i[-1][1] + int(0.04 * SR))
    return y[a:b]


def correr_ffmpeg(*args):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], check=True)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    carpeta = Path(sys.argv[1]).resolve()
    rehacer = "--rehacer" in sys.argv[2:]
    solo = {x for x in sys.argv[2:] if x != "--rehacer"}
    guiones = sorted(p for p in carpeta.glob("*.json") if not p.name.endswith((".marcas.json", ".qa.json")))
    if solo:
        guiones = [g for g in guiones if g.stem in solo]
    pendientes = []
    for g in guiones:
        d = json.loads(g.read_text(encoding="utf-8"))
        if not isinstance(d, dict) or "leccionId" not in d or "partes" not in d:
            continue  # (otro archivo: la voz de prueba, por ejemplo)
        # la huella del texto que se dice: si cambia la manera de decir algo, la lección se graba otra vez
        d["guion"] = hashlib.sha1(json.dumps(d["partes"], ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:12]
        marcas = carpeta / f"{d['leccionId']}.marcas.json"
        if not rehacer and marcas.exists() and (carpeta / f"{d['leccionId']}.m4a").exists():
            hecho = json.loads(marcas.read_text(encoding="utf-8"))
            if hecho.get("huella") == d["huella"] and hecho.get("guion", d["guion"]) == d["guion"]:
                continue
        pendientes.append(d)
    print(f"[narrar] {len(pendientes)} lecciones por grabar (de {len(guiones)})", flush=True)
    if not pendientes:
        return

    sys.path.insert(0, "/root/Wan2GP")
    os.chdir("/root/Wan2GP")
    from shared.api import init
    import whisper

    s = init(root=Path("/root/Wan2GP"), console_output=False)
    oido = whisper.load_model("medium")

    def decir(texto, semilla):
        st = s.get_default_settings("omnivoice")
        st.update({"prompt": texto, "audio_prompt_type": "A", "audio_guide": str(REFERENCIA), "alt_prompt": VOZ["texto"],
                   "model_mode": "spanish", "seed": semilla})
        r = s.submit_task(st).result()
        if not r.success:
            raise RuntimeError("; ".join(e.message for e in r.errors))
        f = [x for x in r.generated_files if x.endswith((".wav", ".flac", ".mp3"))] or r.generated_files
        y, _ = librosa.load(f[0], sr=SR, mono=True)
        return recortar(y)

    def escuchar(y):
        r = oido.transcribe(y.astype(np.float32) if SR == 16000 else librosa.resample(y, orig_sr=SR, target_sr=16000).astype(np.float32),
                            language="es", temperature=0, condition_on_previous_text=False)
        return r["text"].strip()

    for d in pendientes:
        t0 = time.time()
        lid = d["leccionId"]
        audio, marcas, qa = [np.zeros(int(0.25 * SR), dtype=np.float32)], [], []
        largo = len(audio[0])
        for parte in d["partes"]:
            marcas.append([parte["lugar"], round(largo / SR, 2)])
            ts = trozos(parte["texto"])
            for k, texto in enumerate(ts):
                mejor = None
                for intento in range(INTENTOS_CORTOS if len(texto.split()) <= 6 else INTENTOS):
                    y = decir(texto, 7 + intento * 101)
                    oido_txt = escuchar(y)
                    parecido = SequenceMatcher(None, palabras(texto), palabras(oido_txt), autojunk=False).ratio()
                    ritmo = len(palabras(texto)) / max(0.1, len(y) / SR)
                    nota = parecido - (0.2 if ritmo < 1.4 or ritmo > 3.6 else 0)
                    if mejor is None or nota > mejor[0]:
                        mejor = (nota, y, parecido, oido_txt, intento)
                    if nota >= PARECIDO_MINIMO:
                        break
                nota, y, parecido, oido_txt, intento = mejor
                qa.append({"lugar": parte["lugar"], "texto": texto, "oido": oido_txt, "parecido": round(parecido, 3), "intentos": intento + 1})
                if parecido < PARECIDO_MINIMO:
                    print(f"[revisar] {lid} {parte['lugar']}: {parecido:.2f} «{texto[:60]}» → «{oido_txt[:60]}»", flush=True)
                audio.append(y.astype(np.float32))
                largo += len(y)
                pausa = PAUSA_ORACIONES if k < len(ts) - 1 else max(0.35, float(parte["pausa"]))
                audio.append(np.zeros(int(pausa * SR), dtype=np.float32))
                largo += int(pausa * SR)
        audio.append(np.zeros(int(0.5 * SR), dtype=np.float32))
        crudo = carpeta / f"{lid}.crudo.wav"
        sf.write(crudo, np.concatenate(audio), SR, subtype="PCM_16")
        # la cadena de locución y el volumen final medido (dos pasadas de loudnorm)
        cadena = carpeta / f"{lid}.cadena.wav"
        correr_ffmpeg("-i", str(crudo), "-af", CADENA, "-ar", str(SR), "-ac", "1", str(cadena))
        medida = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(cadena), "-af", f"loudnorm=I={LUFS}:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                                capture_output=True, text=True).stderr
        m = json.loads(medida[medida.rindex("{"):medida.rindex("}") + 1])
        filtro = (f"loudnorm=I={LUFS}:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
                  f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
        final = carpeta / f"{lid}.m4a"
        correr_ffmpeg("-i", str(cadena), "-af", filtro, "-ar", str(SR), "-ac", "1", "-c:a", "aac", "-b:a", "40k", "-movflags", "+faststart", str(final))
        segundos = round(sf.info(str(cadena)).duration, 2)
        (carpeta / f"{lid}.marcas.json").write_text(json.dumps({"leccionId": lid, "huella": d["huella"], "guion": d["guion"], "segundos": segundos, "voz": VOZ["nombre"], "marcas": marcas}, ensure_ascii=False), encoding="utf-8")
        (carpeta / f"{lid}.qa.json").write_text(json.dumps(qa, ensure_ascii=False, indent=1), encoding="utf-8")
        crudo.unlink()
        cadena.unlink()
        flojos = [q for q in qa if q["parecido"] < PARECIDO_MINIMO]
        print(json.dumps({"leccion": lid, "segundos": segundos, "trozos": len(qa), "repetidos": sum(q["intentos"] > 1 for q in qa),
                          "flojos": len(flojos), "peor": min(q["parecido"] for q in qa), "tardo_s": round(time.time() - t0)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
