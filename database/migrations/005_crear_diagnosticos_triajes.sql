-- 005_crear_diagnosticos_triajes.sql
-- Tablas para el flujo Pendiente de Triaje -> Pendiente de Diagnóstico
-- (ver estados_cita, migración 004). Cada cita puede tener a lo más un
-- triaje y a lo más un diagnóstico, no todas lo tienen todavía — por eso
-- cita_id es UNIQUE en las dos, en vez de solo un índice normal.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/migrations/005_crear_diagnosticos_triajes.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.diagnosticos
(
    diagnostico_id serial NOT NULL,
    cita_id        integer NOT NULL,
    diagnostico    text NOT NULL,
    fecha_registro timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT diagnosticos_pkey PRIMARY KEY (diagnostico_id),
    CONSTRAINT diagnosticos_cita_id_key UNIQUE (cita_id),
    CONSTRAINT diagnosticos_cita_id_fkey FOREIGN KEY (cita_id)
        REFERENCES public.citas (cita_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.diagnosticos OWNER TO postgres;

CREATE INDEX IF NOT EXISTS idx_diagnosticos_cita_id
    ON public.diagnosticos USING btree (cita_id);

CREATE TABLE IF NOT EXISTS public.triajes
(
    triaje_id           serial NOT NULL,
    cita_id             integer NOT NULL,
    peso                numeric(5, 2),  -- kg
    talla               numeric(5, 1),  -- cm
    presion_arterial    varchar(15),    -- ej. "120/80"
    temperatura         numeric(4, 1),  -- °C
    frecuencia_cardiaca integer,        -- lpm
    saturacion_o2       integer,        -- %
    motivo_consulta     text,
    fecha_registro      timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT triajes_pkey PRIMARY KEY (triaje_id),
    CONSTRAINT triajes_cita_id_key UNIQUE (cita_id),
    CONSTRAINT triajes_cita_id_fkey FOREIGN KEY (cita_id)
        REFERENCES public.citas (cita_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.triajes OWNER TO postgres;

CREATE INDEX IF NOT EXISTS idx_triajes_cita_id
    ON public.triajes USING btree (cita_id);

COMMIT;
