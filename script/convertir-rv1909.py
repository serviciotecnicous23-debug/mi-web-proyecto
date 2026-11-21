"""Convierte la RV1909 de open-bibles (USFX, dominio público) al archivo compacto que lee la web:
server/data/biblia/rv1909.json.gz = [libro 1..66][capítulo 1..n] -> [[versículo, texto], ...]

    python -I script/convertir-rv1909.py spa-rv1909.usfx.xml server/data/biblia/rv1909.json.gz

El USFX se baja de https://github.com/seven1m/open-bibles (spa-rv1909.usfx.xml, «Public Domain»).

Quita las etiquetas de Strong (<w s=...>) y deja solo el texto, como hoy hace la web con el de getBible."""
import gzip
import json
import re
import sys

CODIGOS = (
    "GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS "
    "JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT "
    "PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV"
).split()
assert len(CODIGOS) == 66

entrada, salida = sys.argv[1], sys.argv[2]
s = open(entrada, encoding="utf-8-sig").read()


def limpiar(t: str) -> str:
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"\s+([,.;:!?)\]»])", r"\1", t)  # sin espacio antes de la puntuación
    t = re.sub(r"([¡¿(\[«])\s+", r"\1", t)  # ni después de la que abre
    return t


TITULOS_QUITADOS: list = []
libros = {}
for m in re.finditer(r'<book id="(\w+)">(.*?)</book>', s, re.S):
    codigo, cuerpo = m.group(1), m.group(2)
    capitulos: list[list] = []
    cap = None
    ver = None
    trozos: list[str] = []

    def cerrar():
        global ver
        if cap is not None and ver is not None:
            texto = limpiar("".join(trozos))
            if texto:
                capitulos[cap - 1].append([ver, texto])
        trozos.clear()
        ver = None

    for tok in re.split(r"(<[^>]+>)", cuerpo):
        if not tok:
            continue
        if tok.startswith("<"):
            mc = re.match(r'<c id="(\d+)"', tok)
            mv = re.match(r'<v id="(\d+)"', tok)
            if mc:
                cerrar()
                cap = int(mc.group(1))
                while len(capitulos) < cap:
                    capitulos.append([])
            elif mv:
                cerrar()
                ver = int(mv.group(1))
            elif tok.startswith("<ve"):
                cerrar()
            elif tok.startswith("</p") or tok.startswith("<p"):
                # El título de un salmo («Salmo de David…») viene dentro del versículo 1, cerrado por </p>: como en
                # getBible y en las biblias en español, va aparte del versículo y no se guarda.
                if codigo == "PSA" and ver == 1 and tok.startswith("</p") and limpiar("".join(trozos)):
                    TITULOS_QUITADOS.append((cap, limpiar("".join(trozos))))
                    trozos.clear()
                elif ver is not None:
                    trozos.append(" ")
            # <w>, <add>: se queda su texto; <h>, <toc>, <id>: fuera de los versículos, no se guardan
            continue
        if ver is not None:
            trozos.append(tok)
    cerrar()
    libros[codigo] = capitulos

faltan = [c for c in CODIGOS if c not in libros]
assert not faltan, f"faltan libros: {faltan}"
datos = [libros[c] for c in CODIGOS]
total = sum(len(v) for cap in datos for v in cap)
caps = sum(len(l) for l in datos)
vacios = [(CODIGOS[i], j + 1) for i, l in enumerate(datos) for j, c in enumerate(l) if not c]
assert not vacios, f"capítulos sin versículos: {vacios[:10]}"
crudo = json.dumps(datos, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
with gzip.GzipFile(salida, "wb", compresslevel=9, mtime=0) as f:
    f.write(crudo)
print(f"libros 66, capítulos {caps}, versículos {total}, json {len(crudo)//1024} KB")
print("Juan 3:16 ->", datos[42][2][15])
print("Génesis 1:1 ->", datos[0][0][0])
print("Salmos 3:1 ->", datos[18][2][0])
print("3 Juan 1 ->", [v[0] for v in datos[63][0]])
import collections
inicios = collections.Counter(" ".join(t.split()[:2]) for _, t in TITULOS_QUITADOS)
print(f"títulos de salmos quitados: {len(TITULOS_QUITADOS)}; empiezan con: {inicios.most_common(12)}")
raros = [(c, t[:60]) for c, t in TITULOS_QUITADOS if not re.match(r"(Salmo|Al Músico|Masquil|Mictam|Oración|Cántico|Canción|Sigaión|Michtam|Para|De David|A David|Salmo y)", t)]
print("títulos que no empiezan como se espera:", raros)
