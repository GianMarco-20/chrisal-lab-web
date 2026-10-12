-- 004_citas_estado_varchar.sql
-- Modifica la tabla citas para que use la columna de texto 'estado' en lugar de llave foránea.
-- Esto alinea la base de datos con la entidad de TypeORM (cita.entity.ts).

BEGIN;

ALTER TABLE public.citas DROP COLUMN IF EXISTS estado_id;
ALTER TABLE public.citas DROP COLUMN IF EXISTS id_estado;

ALTER TABLE public.citas ADD COLUMN IF NOT EXISTS estado VARCHAR(20) DEFAULT 'programada';

-- Ya no necesitamos la tabla estados
DROP TABLE IF EXISTS public.estados CASCADE;

COMMIT;
