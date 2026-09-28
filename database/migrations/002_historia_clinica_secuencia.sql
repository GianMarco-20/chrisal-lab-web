-- 002_historia_clinica_secuencia.sql
-- pacientes.historia_clinica es texto (no una columna serial), así que el
-- backend necesita una secuencia de Postgres para generar valores únicos
-- del tipo HC-000001, HC-000002, ... sin choques entre registros simultáneos.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/002_historia_clinica_secuencia.sql

BEGIN;

CREATE SEQUENCE IF NOT EXISTS public.pacientes_historia_clinica_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Si ya existen pacientes con historia_clinica en formato HC-000001, adelanta
-- la secuencia para que el backend no repita un número ya usado. Si la tabla
-- está vacía o no tiene ese formato, no hace nada (queda en 1).
SELECT setval(
    'public.pacientes_historia_clinica_seq',
    COALESCE(
        (SELECT MAX(SUBSTRING(historia_clinica FROM '\d+')::int)
         FROM public.pacientes
         WHERE historia_clinica ~ '^HC-\d+$'),
        0
    ) + 1,
    false
);

COMMIT;
