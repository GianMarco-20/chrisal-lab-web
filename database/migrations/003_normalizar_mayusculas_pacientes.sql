-- 003_normalizar_mayusculas_pacientes.sql
-- Pone en mayúsculas los nombres/apellidos de pacientes que se cargaron antes
-- de que el backend lo hiciera automático (quedaban inconsistentes: algunos
-- en mayúsculas, otros no). Es idempotente: no hace nada si ya están bien.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/003_normalizar_mayusculas_pacientes.sql

BEGIN;

UPDATE public.pacientes
SET nombres = UPPER(TRIM(nombres)),
    apellidos = UPPER(TRIM(apellidos))
WHERE nombres <> UPPER(TRIM(nombres))
   OR apellidos <> UPPER(TRIM(apellidos));

COMMIT;
