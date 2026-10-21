-- AgregarEdadPacientes.sql
-- Agrega la edad (en años) a pacientes. Sirve para ajustar los rangos del
-- triaje y para los formatos de laboratorio. Los pacientes ya registrados
-- quedan con edad NULL hasta que se la pidan en su próxima cita u orden.
--
-- Es idempotente: se puede ejecutar más de una vez. Solo hace falta en una
-- base ya creada; New.sql ya incluye la columna.
--
-- Ejecutar (PowerShell):
--   psql -U postgres -d clinica -f database/NewDatabase/AgregarEdadPacientes.sql

BEGIN;

ALTER TABLE pacientes
    ADD COLUMN IF NOT EXISTS edad SMALLINT;

ALTER TABLE pacientes DROP CONSTRAINT IF EXISTS pacientes_edad_check;
ALTER TABLE pacientes
    ADD CONSTRAINT pacientes_edad_check CHECK (edad BETWEEN 0 AND 120);

COMMIT;
