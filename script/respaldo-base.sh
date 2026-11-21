#!/usr/bin/env bash
# El respaldo de la base de datos de la web. Lo usa .github/workflows/respaldo-base.yml (docs/vigilancia-y-respaldos.md).
#
#   script/respaldo-base.sh respaldar URL ARCHIVO.gpg   copia la base (pg_dump 18) y la cifra con RESPALDO_CLAVE
#   script/respaldo-base.sh restaurar ARCHIVO.gpg URL   la descifra y la carga en otra base (vacía)
#   script/respaldo-base.sh tablas ARCHIVO.gpg          cuántas tablas trae la copia
#   script/respaldo-base.sh contar URL                  cuántas filas tiene cada tabla («tabla filas», una por línea)
#
# pg_dump y pg_restore salen de la imagen oficial de PostgreSQL 18 (Docker): la base de Render es PostgreSQL 18 y
# pg_dump no copia una base más nueva que él (por eso no sirve el respaldo de server/backup.ts en Render, que trae un
# pg_dump más viejo). La clave va en la variable RESPALDO_CLAVE, nunca en un archivo: el repositorio es público.
# La dirección de la base pasa por una variable de entorno, así que no aparece en el registro ni en la lista de procesos.
set -euo pipefail

IMAGEN="${RESPALDO_IMAGEN:-postgres:18-alpine}"

# Una orden de PostgreSQL 18 con la carpeta $2 montada en /trabajo y la dirección de la base $1 en $PGURL.
pg18() {
  local url="$1" carpeta="$2"
  shift 2
  # Corre como el usuario de la imagen (root): psql falla con un usuario que la imagen no conoce. Los archivos que deja
  # quedan en una carpeta temporal del ejecutor y se borran al terminar.
  PGURL="$url" docker run --rm --network host -e PGURL -v "$carpeta:/trabajo" "$IMAGEN" "$@"
}

# ARCHIVO.gpg CARPETA -> CARPETA/base.dump
descifrar() {
  : "${RESPALDO_CLAVE:?falta la variable RESPALDO_CLAVE}"
  gpg --batch --yes --quiet --pinentry-mode loopback --passphrase-fd 3 --output "$2/base.dump" --decrypt "$1" 3<<<"$RESPALDO_CLAVE"
}

respaldar() {
  local url="$1" salida="$2" dir
  : "${RESPALDO_CLAVE:?falta la variable RESPALDO_CLAVE}"
  dir="$(mktemp -d)"
  # formato propio de pg_dump: ya va comprimido y pg_restore puede elegir qué cargar
  # (chmod: el archivo lo crea root dentro del contenedor y gpg lo lee afuera con el usuario del ejecutor)
  pg18 "$url" "$dir" sh -c 'pg_dump --format=custom --compress=9 --no-owner --no-privileges --file=/trabajo/base.dump "$PGURL" && chmod 644 /trabajo/base.dump'
  if [ ! -s "$dir/base.dump" ]; then
    echo "::error::pg_dump no dejó ninguna copia"
    exit 1
  fi
  gpg --batch --yes --quiet --pinentry-mode loopback --passphrase-fd 3 --symmetric --cipher-algo AES256 \
    --output "$salida" "$dir/base.dump" 3<<<"$RESPALDO_CLAVE"
  rm -rf "$dir"
  echo "Copia cifrada: $(du -h "$salida" | cut -f1)"
}

restaurar() {
  local archivo="$1" url="$2" dir
  dir="$(mktemp -d)"
  descifrar "$archivo" "$dir"
  # Sin --exit-on-error: un detalle que no se pueda recrear (por ejemplo, el comentario de una extensión) no tumba
  # todo. Lo que vale es que estén las tablas y sus filas, y eso se revisa después con «tablas» y «contar».
  if ! pg18 "$url" "$dir" sh -c 'pg_restore --no-owner --no-privileges --dbname="$PGURL" /trabajo/base.dump'; then
    echo "::warning::pg_restore terminó con avisos (ver arriba); se revisan las tablas"
  fi
  rm -rf "$dir"
}

tablas() {
  local archivo="$1" dir n
  dir="$(mktemp -d)"
  descifrar "$archivo" "$dir"
  n="$(pg18 "" "$dir" pg_restore --list /trabajo/base.dump | grep -cE '^[0-9]+; [0-9]+ [0-9]+ TABLE public ' || true)"
  rm -rf "$dir"
  echo "$n"
}

contar() {
  local url="$1" dir
  dir="$(mktemp -d)"
  cat > "$dir/contar.sql" <<'SQL'
select table_name || ' ' || (xpath('/row/n/text()', query_to_xml(format('select count(*) as n from %I.%I', table_schema, table_name), false, true, '')))[1]::text
from information_schema.tables
where table_schema = 'public' and table_type = 'BASE TABLE'
order by table_name;
SQL
  pg18 "$url" "$dir" sh -c 'psql "$PGURL" -X -v ON_ERROR_STOP=1 -At -f /trabajo/contar.sql'
  rm -rf "$dir"
}

orden="${1:-}"
[ $# -gt 0 ] && shift
case "$orden" in
  respaldar) respaldar "$@" ;;
  restaurar) restaurar "$@" ;;
  tablas) tablas "$@" ;;
  contar) contar "$@" ;;
  *)
    echo "uso: $0 respaldar URL ARCHIVO.gpg | restaurar ARCHIVO.gpg URL | tablas ARCHIVO.gpg | contar URL" >&2
    exit 2
    ;;
esac
