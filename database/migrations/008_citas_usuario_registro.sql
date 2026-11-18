-- 008_citas_usuario_registro.sql
-- Guarda qué usuario (recepcionista) registró cada cita, igual que
-- ordenes_laboratorio.usuario_muestra_id lo hace con las órdenes.
-- Lo usa el dashboard del administrador para contar citas por usuario.
--
-- Las citas anteriores a esta migración quedan con usuario_registro_id NULL
-- (no se puede saber quién las creó); el dashboard las agrupa como "Sin registrar".
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/008_citas_usuario_registro.sql

BEGIN;

ALTER TABLE citas
    ADD COLUMN IF NOT EXISTS usuario_registro_id INTEGER REFERENCES usuarios(usuario_id);

CREATE INDEX IF NOT EXISTS idx_citas_usuario_registro ON citas(usuario_registro_id);

COMMIT;
