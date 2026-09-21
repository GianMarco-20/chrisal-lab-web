-- 001_roles.sql
-- Roles iniciales del sistema. Es idempotente: se puede ejecutar más de una vez.
-- Requiere haber aplicado antes migrations/001_crear_tabla_roles.sql
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/seeds/001_roles.sql
--
-- Agrega aquí cualquier otro rol que use el sistema (por ejemplo médico o laboratorio).

INSERT INTO public.roles (nombre, es_admin) VALUES
    ('admin',     true),
    ('recepcion', false)
ON CONFLICT (nombre) DO UPDATE
    SET es_admin = EXCLUDED.es_admin;
