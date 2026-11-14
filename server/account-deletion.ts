import { randomBytes } from "crypto";
import { sql } from "drizzle-orm";
import { db } from "./db";

// "Eliminar mi cuenta" (Perfil). Lo piden las tiendas de apps y es un derecho de cada persona.
//
// Se BORRA lo personal: lo que publicó en Comunidad, el Club y el muro de oración (con los
// comentarios y oraciones que otros dejaron en eso), sus mensajes privados, amistades, avisos,
// suscripciones de notificaciones y su estudio personal (resaltados, notas, lectura).
// La fila de la cuenta queda ANÓNIMA ("Cuenta eliminada", sin correo, teléfono, foto ni redes
// y sin poder entrar): así no se rompen los registros que deben quedar, como diezmos y
// donaciones (contabilidad), certificados, asistencias y lo que enseñó como maestro.

// Orden importante: primero lo que apunta a las publicaciones, después las publicaciones.
// Los nombres de tabla son fijos (nunca vienen del usuario).
const BORRADOS: Array<[tabla: string, condicion: (id: number) => ReturnType<typeof sql>]> = [
  ["post_comments", (id) => sql`user_id = ${id} OR post_id IN (SELECT id FROM member_posts WHERE user_id = ${id})`],
  ["member_posts", (id) => sql`user_id = ${id}`],
  ["reading_club_post_likes", (id) => sql`user_id = ${id} OR post_id IN (SELECT id FROM reading_club_posts WHERE user_id = ${id})`],
  ["reading_club_comments", (id) => sql`user_id = ${id} OR post_id IN (SELECT id FROM reading_club_posts WHERE user_id = ${id})`],
  ["reading_club_posts", (id) => sql`user_id = ${id}`],
  ["prayer_request_prayers", (id) => sql`user_id = ${id} OR request_id IN (SELECT id FROM prayer_requests WHERE user_id = ${id})`],
  ["prayer_requests", (id) => sql`user_id = ${id}`],
  ["direct_messages", (id) => sql`sender_id = ${id} OR receiver_id = ${id}`],
  ["friendships", (id) => sql`requester_id = ${id} OR addressee_id = ${id}`],
  ["notifications", (id) => sql`user_id = ${id}`],
  ["push_subscriptions", (id) => sql`user_id = ${id}`],
  ["game_avisos_pref", (id) => sql`user_id = ${id}`],
  ["game_avisos", (id) => sql`user_id = ${id}`],
  ["password_reset_tokens", (id) => sql`user_id = ${id}`],
  // la academia: su avance, sus exámenes y sus respuestas escritas (docs/academia.md)
  ["academia_respuestas", (id) => sql`user_id = ${id}`],
  ["academia_intentos", (id) => sql`user_id = ${id}`],
  ["academia_apelaciones", (id) => sql`user_id = ${id}`],
  ["academia_pruebas", (id) => sql`user_id = ${id}`],
  ["academia_versiculos", (id) => sql`user_id = ${id}`],
  ["academia_niveles", (id) => sql`user_id = ${id}`],
  ["academia_certificados", (id) => sql`user_id = ${id}`],
  ["academia_lecciones", (id) => sql`user_id = ${id}`],
  ["academia_materias", (id) => sql`user_id = ${id}`],
  ["academia_inscripciones", (id) => sql`user_id = ${id}`],
  ["academia_alumnos", (id) => sql`user_id = ${id}`],
  ["bible_highlights", (id) => sql`user_id = ${id}`],
  ["bible_notes", (id) => sql`user_id = ${id}`],
  ["sermon_notes", (id) => sql`user_id = ${id}`],
  ["bible_reading_log", (id) => sql`user_id = ${id}`],
  ["game_scores", (id) => sql`user_id = ${id}`],
  ["game_saves", (id) => sql`user_id = ${id}`],
  ["game_scores_week", (id) => sql`user_id = ${id}`],
  ["game_event_cheers", (id) => sql`user_id = ${id} OR event_id IN (SELECT id FROM game_events WHERE user_id = ${id})`],
  ["game_events", (id) => sql`user_id = ${id}`],
  // Jerusalén en línea: primero lo que apunta a los personajes, después los personajes.
  ["game_question_log", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_season_merit", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_offices", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_house_blessings", (id) => sql`visitor_user_id = ${id} OR house_character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_houses", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_studies", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_aportes", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_chat", (id) => sql`user_id = ${id} OR character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_votos", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_juntos", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_pueblo_dones", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_copa_premios", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_barrio_copa_aportes", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_sabio_duelos", (id) => sql`a_user = ${id} OR b_user = ${id}`],
  ["game_sabio_noches", (id) => sql`anfitrion_user = ${id} OR jugadores @> jsonb_build_array(jsonb_build_object('u', ${id}::int))`],
  ["game_sabio_partidas", (id) => sql`user_id = ${id} OR character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_sabio_premios_semana", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_sabio", (id) => sql`character_id IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_juegos_jugadores", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["game_juegos_grupo", (id) => sql`titular IN (SELECT id FROM game_characters WHERE user_id = ${id})`],
  ["user_blocks", (id) => sql`blocker_id = ${id} OR blocked_id = ${id}`],
  ["game_characters", (id) => sql`user_id = ${id}`],
];

/** Borra los datos personales de la cuenta y la deja anónima. Todo o nada (transacción). */
export async function eliminarCuentaPropia(userId: number, hashDeClaveImposible: string): Promise<void> {
  const alias = `eliminada-${userId}-${randomBytes(4).toString("hex")}`;
  await db.transaction(async (tx) => {
    // Archivos que subió para sus publicaciones de Comunidad, su foto de perfil y la foto de su carné de la academia
    // (guardados en la base, /files/...): se borran, salvo que otra persona use el mismo archivo.
    const hayArchivos = await tx.execute(sql`SELECT to_regclass('public.stored_files') AS t`);
    if ((hayArchivos as unknown as { rows?: Array<{ t: string | null }> }).rows?.[0]?.t) {
      await tx.execute(sql`
        DELETE FROM stored_files f
        WHERE f.owner_id = ${userId}
          AND (f.folder IN ('comunidad', 'avatars', 'chat', 'academia')
               OR EXISTS (SELECT 1 FROM users u WHERE u.id = ${userId} AND u.avatar_url LIKE '/files/' || f.id || '/%'))
          AND NOT EXISTS (
            SELECT 1 FROM member_posts p
            WHERE p.user_id <> ${userId}
              AND (p.file_url LIKE '/files/' || f.id || '/%' OR p.image_url LIKE '/files/' || f.id || '/%')
          )
      `);
    }
    for (const [tabla, condicion] of BORRADOS) {
      // Una base vieja puede no tener alguna tabla todavía: se salta en lugar de fallar.
      const existe = await tx.execute(sql`SELECT to_regclass(${`public.${tabla}`}) AS t`);
      const fila = (existe as unknown as { rows?: Array<{ t: string | null }> }).rows?.[0];
      if (!fila?.t) continue;
      await tx.execute(sql`DELETE FROM ${sql.raw(`"${tabla}"`)} WHERE ${condicion(userId)}`);
    }
    // si acompañaba a alguien en la academia como mentor, deja de hacerlo
    const alumnos = await tx.execute(sql`SELECT to_regclass('public.academia_alumnos') AS t`);
    if ((alumnos as unknown as { rows?: Array<{ t: string | null }> }).rows?.[0]?.t) {
      await tx.execute(sql`UPDATE academia_alumnos SET mentor_user_id = NULL WHERE mentor_user_id = ${userId}`);
    }
    await tx.execute(sql`
      UPDATE users SET
        username = ${alias},
        password = ${hashDeClaveImposible},
        display_name = 'Cuenta eliminada',
        bio = NULL, avatar_url = NULL, email = NULL, phone = NULL, cargo = NULL, country = NULL,
        facebook = NULL, instagram = NULL, youtube = NULL, tiktok = NULL, twitter = NULL, website = NULL,
        is_active = false, email_verified = false, email_verify_token = NULL, email_verify_expires = NULL,
        email_notify_account_approved = false, email_notify_direct_message = false,
        email_notify_new_course = false, email_notify_event_reminder = false
      WHERE id = ${userId}
    `);
  });
}
