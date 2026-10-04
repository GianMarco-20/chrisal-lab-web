-- 004_normalizar_estados_cita.sql
-- Normaliza citas.estado (texto con CHECK) a una tabla estados_cita, igual
-- que se hizo con roles en la migración 001. Hacía falta además porque cada
-- estado necesita color y descripción para la interfaz (ver mockup de
-- "Vista previa de modales"), y eso no tiene sentido repetido en el código.
--
-- Los 4 estados del flujo real: Pendiente de Triaje -> Pendiente de
-- Diagnóstico -> Atendida, o Ausente si el paciente no llega. Los valores
-- viejos ('programada', 'atendida', 'no_asistio') se migran así:
--   programada  -> pendiente_triaje (es el primer paso del flujo nuevo)
--   atendida    -> atendida
--   no_asistio  -> ausente
--
-- ANTES DE EJECUTAR: haz un respaldo completo de la base.
--   pg_dump -U postgres -d clinica -F c -f clinica_respaldo.dump
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/004_normalizar_estados_cita.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.estados_cita
(
    estado_id   serial PRIMARY KEY,
    codigo      varchar(30)  NOT NULL UNIQUE,
    nombre      varchar(50)  NOT NULL,
    descripcion varchar(150),
    color       varchar(20)  NOT NULL,
    orden       smallint     NOT NULL UNIQUE
);

ALTER TABLE IF EXISTS public.estados_cita OWNER TO postgres;

INSERT INTO public.estados_cita (codigo, nombre, descripcion, color, orden) VALUES
    ('pendiente_triaje',      'Pendiente de Triaje',      'Recepción registra los signos vitales',      'amber',  1),
    ('pendiente_diagnostico', 'Pendiente de Diagnóstico', 'El médico registra síntomas y diagnóstico',  'violet', 2),
    ('atendida',              'Atendida',                 'La cita ya fue atendida',                    'blue',   3),
    ('ausente',               'Ausente',                  'El paciente no llegó a la cita',             'red',    4)
ON CONFLICT (codigo) DO NOTHING;

-- Columna nueva, llenada a partir del texto actual
ALTER TABLE public.citas ADD COLUMN estado_id integer;

UPDATE public.citas c
SET estado_id = e.estado_id
FROM public.estados_cita e
WHERE e.codigo = CASE c.estado
    WHEN 'programada' THEN 'pendiente_triaje'
    WHEN 'atendida'   THEN 'atendida'
    WHEN 'no_asistio' THEN 'ausente'
    ELSE 'pendiente_triaje'
END;

ALTER TABLE public.citas ALTER COLUMN estado_id SET NOT NULL;

ALTER TABLE public.citas
    ADD CONSTRAINT citas_estado_id_fkey
    FOREIGN KEY (estado_id) REFERENCES public.estados_cita (estado_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

CREATE INDEX IF NOT EXISTS idx_citas_estado_id
    ON public.citas USING btree (estado_id);

-- Ya no hacen falta el CHECK ni la columna de texto
ALTER TABLE public.citas DROP CONSTRAINT citas_estado_check;
ALTER TABLE public.citas DROP COLUMN estado;

COMMIT;
