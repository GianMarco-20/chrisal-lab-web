-- 006_ampliar_diagnosticos_triajes.sql
-- Completa los campos que pide el modal de triaje/diagnóstico del panel de
-- recepción (ver frontend-sistema/app/citas/estados/), que la migración 005
-- no cubría: frecuencia respiratoria en triajes, y síntomas/indicaciones
-- separados del texto de diagnóstico en diagnosticos.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/006_ampliar_diagnosticos_triajes.sql

BEGIN;

ALTER TABLE public.triajes
    ADD COLUMN IF NOT EXISTS frecuencia_respiratoria integer; -- rpm

ALTER TABLE public.diagnosticos
    ADD COLUMN IF NOT EXISTS sintomas text,
    ADD COLUMN IF NOT EXISTS indicaciones text;

COMMIT;
