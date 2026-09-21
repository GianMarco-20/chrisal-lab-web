-- 001_crear_tabla_roles.sql
-- Reemplaza la columna de texto usuarios.rol (con CHECK) por una tabla roles
-- y una llave foránea usuarios.rol_id.
--
-- ANTES DE EJECUTAR: haz un respaldo completo de la base.
--   pg_dump -U postgres -d clinica -F c -f clinica_respaldo.dump
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/001_crear_tabla_roles.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.roles
(
    rol_id   serial PRIMARY KEY,
    nombre   varchar(20) NOT NULL UNIQUE,
    es_admin boolean     NOT NULL DEFAULT false
);

ALTER TABLE IF EXISTS public.roles OWNER TO postgres;

-- Conserva los roles que ya están en uso en usuarios.rol
INSERT INTO public.roles (nombre, es_admin)
SELECT DISTINCT rol, (rol = 'admin') FROM public.usuarios
ON CONFLICT (nombre) DO NOTHING;

-- Nueva columna, llenada a partir del texto actual
ALTER TABLE public.usuarios ADD COLUMN rol_id integer;

UPDATE public.usuarios u
SET rol_id = r.rol_id
FROM public.roles r
WHERE r.nombre = u.rol;

ALTER TABLE public.usuarios ALTER COLUMN rol_id SET NOT NULL;

ALTER TABLE public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey
    FOREIGN KEY (rol_id) REFERENCES public.roles (rol_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

CREATE INDEX IF NOT EXISTS idx_usuarios_rol_id
    ON public.usuarios USING btree (rol_id);

-- Ya no hacen falta el CHECK ni la columna de texto
ALTER TABLE public.usuarios DROP CONSTRAINT usuarios_rol_check;
ALTER TABLE public.usuarios DROP COLUMN rol;

COMMIT;
