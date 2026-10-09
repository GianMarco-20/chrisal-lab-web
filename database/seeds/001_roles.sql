-- 001_roles.sql
-- Roles iniciales del sistema. Es idempotente: se puede ejecutar más de una vez.
-- Requiere haber aplicado antes migrations/001_crear_tabla_roles.sql
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/seeds/001_roles.sql

INSERT INTO public.roles (nombre, es_admin) VALUES
    ('admin',       true),
    ('recepcion',   false),
    ('medico',      false),
    ('laboratorio', false)
ON CONFLICT (nombre) DO UPDATE
    SET es_admin = EXCLUDED.es_admin;
