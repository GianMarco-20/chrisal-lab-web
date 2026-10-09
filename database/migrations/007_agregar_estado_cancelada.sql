-- 007_agregar_estado_cancelada.sql
-- Agrega el 5º estado a estados_cita (ver migración 004): una cita
-- "Pendiente de Triaje" o "Ausente" ahora se puede cancelar.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/007_agregar_estado_cancelada.sql

BEGIN;

INSERT INTO public.estados_cita (codigo, nombre, descripcion, color, orden) VALUES
    ('cancelada', 'Cancelada', 'La cita fue cancelada antes de la atención', 'gray', 5)
ON CONFLICT (codigo) DO NOTHING;

COMMIT;
