#!/bin/bash
# Graba la narración de las lecciones en WSL con Wan2GP (ver narrar.py). Toma el candado de la tarjeta de video.
# Uso: bash scripts/academia/voz/narrar.sh <carpeta de guiones> [lección...]
AQUI="$(cd "$(dirname "$0")" && pwd)"
CARPETA="$(cd "$1" && pwd)"; shift
cd /root/Wan2GP || exit 1
source venv/bin/activate
export LD_LIBRARY_PATH=/root/Wan2GP/venv/lib/python3.11/site-packages/nvidia/cu13/lib:$LD_LIBRARY_PATH
export PYTHONUNBUFFERED=1 PYTHONUTF8=1
exec flock /root/gpu.lock python "$AQUI/narrar.py" "$CARPETA" "$@"
