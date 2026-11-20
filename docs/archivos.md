# Los archivos que sube la gente

Las fotos de perfil, las imágenes y los adjuntos de Comunidad, del chat y de la Biblioteca, y la foto del carné de la
academia se guardan en uno de dos lugares:

- **Dentro de la base de datos** (como hasta ahora), si no hay almacenamiento externo configurado. Se guardan por
  partes de 512 KB y se sirven en `/files/<id>/<nombre>` (`server/file-store.ts`). Tope total: `FILE_DB_LIMIT_MB`
  (850 MB por defecto, porque la base de Render tiene 1 GB).
- **En Cloudflare R2** (o cualquier almacenamiento compatible con S3), si en Render están las variables `S3_*`
  (`server/file-storage.ts`). Los archivos nuevos van allí y la base deja de llenarse. Los de antes siguen en la base
  y se siguen sirviendo igual.

## Cloudflare R2

- Depósito: `avivando-archivos`, con su dirección pública `https://pub-3de501b50ef943768bbb1baa22d40c07.r2.dev`.
  Lo creó Wrangler el 20-nov-2026, en la cuenta de Cloudflare de Luis.
- El plan gratis da 10 GB, compartidos con la voz de la academia (depósito `avivando-academia-voz`, ≈1,1 GB).
- Para no pasar de lo gratis hay tres topes:
  - `S3_LIMIT_MB`: tope total de los archivos subidos, 6000 MB por defecto. Al llegar, las subidas responden «El
    espacio para archivos está lleno».
  - `CHAT_QUOTA_MB`: lo que cada persona puede subir al chat, 150 MB por defecto (también con R2).
  - Videos de hasta 100 MB.
- Cada archivo subido a R2 queda anotado en la tabla `archivos_externos` con su dueño, su carpeta y su peso. Así:
  - **al borrar una cuenta** se borran sus archivos de Comunidad, del chat, de la academia y su foto de perfil (las
    mismas reglas que con la base);
  - **al eliminar un mensaje del chat «para todos»** se borra su adjunto, si nadie más lo usa;
  - se calculan los topes.
- La biblioteca de AWS manda las sumas de verificación solo cuando la operación las exige
  (`requestChecksumCalculation: "WHEN_REQUIRED"`), como recomienda Cloudflare para R2.
- La Administración ve lo que ocupa en `GET /api/files/status` (`externo.bytes` y `externo.limitBytes`).

## Cómo se activa (lo hace Luis, porque son claves secretas)

1. En Cloudflare, **R2 → Manage API tokens → Create API token**:
   - permiso **Object Read & Write**;
   - solo para el depósito `avivando-archivos`;
   - sin vencimiento.
2. Cloudflare muestra tres datos: **Access Key ID**, **Secret Access Key** y el **endpoint**
   (`https://<id de la cuenta>.r2.cloudflarestorage.com`).
3. En Render (servicio `ministerio-avivando-el-fuego` → Environment), agregar:
   - `S3_ENDPOINT` = el endpoint;
   - `S3_ACCESS_KEY_ID` = el Access Key ID;
   - `S3_SECRET_ACCESS_KEY` = el Secret Access Key;
   - `S3_BUCKET` = `avivando-archivos`;
   - `S3_PUBLIC_URL` = `https://pub-3de501b50ef943768bbb1baa22d40c07.r2.dev`.
4. Guardar: Render vuelve a publicar la web. Para comprobarlo, subir una foto de perfil: su dirección debe empezar
   con la de `S3_PUBLIC_URL`.

Para volver atrás, se quitan esas variables: los archivos nuevos vuelven a la base.

## Cómo se probó (20-nov-2026)

En local, con un almacenamiento S3 de imitación:
- subir;
- un adjunto del chat borrado «para todos» se borra del almacenamiento;
- borrar una cuenta borra su foto de perfil, su adjunto del chat y la foto del carné (su archivo de publicación queda,
  como con la base);
- con `S3_LIMIT_MB=1`, un archivo de 2 MB recibe «lleno».
