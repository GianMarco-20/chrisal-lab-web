--
-- PostgreSQL database dump
--

\restrict kvySLpsyLuV8khLkrF4ABuoCELtdVimLuuXbOFb0i0naxfHyc8a85wfvJwrztqA

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias_examen; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categorias_examen (
    categoria_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    categoria_padre_id integer
);


--
-- Name: categorias_examen_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categorias_examen_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categorias_examen_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categorias_examen_categoria_id_seq OWNED BY public.categorias_examen.categoria_id;


--
-- Name: cita_examenes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cita_examenes (
    cita_examen_id integer NOT NULL,
    cita_id integer NOT NULL,
    examen_id integer NOT NULL,
    estado character varying(20) DEFAULT 'pendiente'::character varying NOT NULL,
    CONSTRAINT cita_examenes_estado_check CHECK (((estado)::text = ANY ((ARRAY['pendiente'::character varying, 'con_resultado'::character varying])::text[])))
);


--
-- Name: cita_examenes_cita_examen_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cita_examenes_cita_examen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cita_examenes_cita_examen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cita_examenes_cita_examen_id_seq OWNED BY public.cita_examenes.cita_examen_id;


--
-- Name: citas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.citas (
    cita_id integer NOT NULL,
    cuenta_id integer NOT NULL,
    servicio_id integer NOT NULL,
    fecha_cita date NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    programacion_id integer,
    estado character varying(20) DEFAULT 'programada'::character varying NOT NULL,
    fecha_registro timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT citas_estado_check CHECK (((estado)::text = ANY ((ARRAY['programada'::character varying, 'atendida'::character varying, 'no_asistio'::character varying])::text[])))
);


--
-- Name: citas_cita_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.citas_cita_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: citas_cita_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.citas_cita_id_seq OWNED BY public.citas.cita_id;


--
-- Name: consultorios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.consultorios (
    consultorio_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    ubicacion character varying(100)
);


--
-- Name: consultorios_consultorio_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.consultorios_consultorio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: consultorios_consultorio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.consultorios_consultorio_id_seq OWNED BY public.consultorios.consultorio_id;


--
-- Name: cuentas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cuentas (
    cuenta_id integer NOT NULL,
    historia_clinica character varying(15) NOT NULL,
    fecha_apertura timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: cuentas_cuenta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cuentas_cuenta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cuentas_cuenta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cuentas_cuenta_id_seq OWNED BY public.cuentas.cuenta_id;


--
-- Name: examenes_catalogo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.examenes_catalogo (
    examen_id integer NOT NULL,
    categoria_id integer NOT NULL,
    nombre character varying(150) NOT NULL
);


--
-- Name: examenes_catalogo_examen_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.examenes_catalogo_examen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: examenes_catalogo_examen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.examenes_catalogo_examen_id_seq OWNED BY public.examenes_catalogo.examen_id;


--
-- Name: medicos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medicos (
    medico_id integer NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    especialidad character varying(100),
    dni character varying(15)
);


--
-- Name: medicos_medico_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medicos_medico_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: medicos_medico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medicos_medico_id_seq OWNED BY public.medicos.medico_id;


--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pacientes (
    historia_clinica character varying(15) NOT NULL,
    dni character varying(15) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    sexo character varying(1),
    celular character varying(20),
    fecha_registro timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT pacientes_sexo_check CHECK (((sexo)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying])::text[])))
);


--
-- Name: programacion_medica; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programacion_medica (
    programacion_id integer NOT NULL,
    medico_id integer NOT NULL,
    consultorio_id integer NOT NULL,
    fecha date NOT NULL,
    turno character varying(10) NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    CONSTRAINT chk_horario_programacion CHECK ((hora_fin > hora_inicio)),
    CONSTRAINT programacion_medica_turno_check CHECK (((turno)::text = ANY ((ARRAY['mañana'::character varying, 'tarde'::character varying])::text[])))
);


--
-- Name: programacion_medica_programacion_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.programacion_medica_programacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: programacion_medica_programacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.programacion_medica_programacion_id_seq OWNED BY public.programacion_medica.programacion_id;


--
-- Name: resultados_examen; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resultados_examen (
    resultado_id integer NOT NULL,
    cita_examen_id integer NOT NULL,
    resultado_texto text NOT NULL,
    fecha_registro timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: resultados_examen_resultado_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.resultados_examen_resultado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resultados_examen_resultado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.resultados_examen_resultado_id_seq OWNED BY public.resultados_examen.resultado_id;


--
-- Name: servicios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.servicios (
    servicio_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    tipo character varying(20) NOT NULL,
    CONSTRAINT servicios_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['consultorio'::character varying, 'laboratorio'::character varying])::text[])))
);


--
-- Name: servicios_servicio_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.servicios_servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: servicios_servicio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.servicios_servicio_id_seq OWNED BY public.servicios.servicio_id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    usuario_id integer NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    rol character varying(20) NOT NULL,
    medico_id integer,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    ultimo_login timestamp without time zone,
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['admin'::character varying, 'recepcion'::character varying, 'medico'::character varying])::text[])))
);


--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_usuario_id_seq OWNED BY public.usuarios.usuario_id;


--
-- Name: categorias_examen categoria_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias_examen ALTER COLUMN categoria_id SET DEFAULT nextval('public.categorias_examen_categoria_id_seq'::regclass);


--
-- Name: cita_examenes cita_examen_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cita_examenes ALTER COLUMN cita_examen_id SET DEFAULT nextval('public.cita_examenes_cita_examen_id_seq'::regclass);


--
-- Name: citas cita_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas ALTER COLUMN cita_id SET DEFAULT nextval('public.citas_cita_id_seq'::regclass);


--
-- Name: consultorios consultorio_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultorios ALTER COLUMN consultorio_id SET DEFAULT nextval('public.consultorios_consultorio_id_seq'::regclass);


--
-- Name: cuentas cuenta_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cuentas ALTER COLUMN cuenta_id SET DEFAULT nextval('public.cuentas_cuenta_id_seq'::regclass);


--
-- Name: examenes_catalogo examen_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examenes_catalogo ALTER COLUMN examen_id SET DEFAULT nextval('public.examenes_catalogo_examen_id_seq'::regclass);


--
-- Name: medicos medico_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicos ALTER COLUMN medico_id SET DEFAULT nextval('public.medicos_medico_id_seq'::regclass);


--
-- Name: programacion_medica programacion_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programacion_medica ALTER COLUMN programacion_id SET DEFAULT nextval('public.programacion_medica_programacion_id_seq'::regclass);


--
-- Name: resultados_examen resultado_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resultados_examen ALTER COLUMN resultado_id SET DEFAULT nextval('public.resultados_examen_resultado_id_seq'::regclass);


--
-- Name: servicios servicio_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.servicios ALTER COLUMN servicio_id SET DEFAULT nextval('public.servicios_servicio_id_seq'::regclass);


--
-- Name: usuarios usuario_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuarios_usuario_id_seq'::regclass);


--
-- Name: categorias_examen categorias_examen_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias_examen
    ADD CONSTRAINT categorias_examen_pkey PRIMARY KEY (categoria_id);


--
-- Name: cita_examenes cita_examenes_cita_id_examen_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cita_examenes
    ADD CONSTRAINT cita_examenes_cita_id_examen_id_key UNIQUE (cita_id, examen_id);


--
-- Name: cita_examenes cita_examenes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cita_examenes
    ADD CONSTRAINT cita_examenes_pkey PRIMARY KEY (cita_examen_id);


--
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (cita_id);


--
-- Name: consultorios consultorios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultorios
    ADD CONSTRAINT consultorios_pkey PRIMARY KEY (consultorio_id);


--
-- Name: cuentas cuentas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cuentas
    ADD CONSTRAINT cuentas_pkey PRIMARY KEY (cuenta_id);


--
-- Name: examenes_catalogo examenes_catalogo_categoria_id_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examenes_catalogo
    ADD CONSTRAINT examenes_catalogo_categoria_id_nombre_key UNIQUE (categoria_id, nombre);


--
-- Name: examenes_catalogo examenes_catalogo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examenes_catalogo
    ADD CONSTRAINT examenes_catalogo_pkey PRIMARY KEY (examen_id);


--
-- Name: medicos medicos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicos
    ADD CONSTRAINT medicos_pkey PRIMARY KEY (medico_id);


--
-- Name: pacientes pacientes_dni_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_dni_key UNIQUE (dni);


--
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (historia_clinica);


--
-- Name: programacion_medica programacion_medica_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programacion_medica
    ADD CONSTRAINT programacion_medica_pkey PRIMARY KEY (programacion_id);


--
-- Name: resultados_examen resultados_examen_cita_examen_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resultados_examen
    ADD CONSTRAINT resultados_examen_cita_examen_id_key UNIQUE (cita_examen_id);


--
-- Name: resultados_examen resultados_examen_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resultados_examen
    ADD CONSTRAINT resultados_examen_pkey PRIMARY KEY (resultado_id);


--
-- Name: servicios servicios_nombre_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_key UNIQUE (nombre);


--
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (servicio_id);


--
-- Name: usuarios usuarios_nombre_usuario_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nombre_usuario_key UNIQUE (nombre_usuario);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);


--
-- Name: idx_cita_examenes_cita; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cita_examenes_cita ON public.cita_examenes USING btree (cita_id);


--
-- Name: idx_citas_cuenta; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_citas_cuenta ON public.citas USING btree (cuenta_id);


--
-- Name: idx_citas_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_citas_fecha ON public.citas USING btree (fecha_cita);


--
-- Name: idx_citas_servicio_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_citas_servicio_fecha ON public.citas USING btree (servicio_id, fecha_cita);


--
-- Name: idx_cuentas_historia_clinica; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cuentas_historia_clinica ON public.cuentas USING btree (historia_clinica);


--
-- Name: idx_examenes_categoria; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_examenes_categoria ON public.examenes_catalogo USING btree (categoria_id);


--
-- Name: idx_pacientes_nombres; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pacientes_nombres ON public.pacientes USING btree (apellidos, nombres);


--
-- Name: idx_programacion_consultorio_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programacion_consultorio_fecha ON public.programacion_medica USING btree (consultorio_id, fecha);


--
-- Name: idx_programacion_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programacion_fecha ON public.programacion_medica USING btree (fecha);


--
-- Name: idx_programacion_medico_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programacion_medico_fecha ON public.programacion_medica USING btree (medico_id, fecha);


--
-- Name: idx_usuarios_nombre_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuarios_nombre_usuario ON public.usuarios USING btree (nombre_usuario);


--
-- Name: idx_usuarios_rol; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuarios_rol ON public.usuarios USING btree (rol);


--
-- Name: categorias_examen categorias_examen_categoria_padre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categorias_examen
    ADD CONSTRAINT categorias_examen_categoria_padre_id_fkey FOREIGN KEY (categoria_padre_id) REFERENCES public.categorias_examen(categoria_id);


--
-- Name: cita_examenes cita_examenes_cita_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cita_examenes
    ADD CONSTRAINT cita_examenes_cita_id_fkey FOREIGN KEY (cita_id) REFERENCES public.citas(cita_id);


--
-- Name: cita_examenes cita_examenes_examen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cita_examenes
    ADD CONSTRAINT cita_examenes_examen_id_fkey FOREIGN KEY (examen_id) REFERENCES public.examenes_catalogo(examen_id);


--
-- Name: citas citas_cuenta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_cuenta_id_fkey FOREIGN KEY (cuenta_id) REFERENCES public.cuentas(cuenta_id);


--
-- Name: citas citas_programacion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_programacion_id_fkey FOREIGN KEY (programacion_id) REFERENCES public.programacion_medica(programacion_id);


--
-- Name: citas citas_servicio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_servicio_id_fkey FOREIGN KEY (servicio_id) REFERENCES public.servicios(servicio_id);


--
-- Name: cuentas cuentas_historia_clinica_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cuentas
    ADD CONSTRAINT cuentas_historia_clinica_fkey FOREIGN KEY (historia_clinica) REFERENCES public.pacientes(historia_clinica);


--
-- Name: examenes_catalogo examenes_catalogo_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examenes_catalogo
    ADD CONSTRAINT examenes_catalogo_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias_examen(categoria_id);


--
-- Name: programacion_medica programacion_medica_consultorio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programacion_medica
    ADD CONSTRAINT programacion_medica_consultorio_id_fkey FOREIGN KEY (consultorio_id) REFERENCES public.consultorios(consultorio_id);


--
-- Name: programacion_medica programacion_medica_medico_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programacion_medica
    ADD CONSTRAINT programacion_medica_medico_id_fkey FOREIGN KEY (medico_id) REFERENCES public.medicos(medico_id);


--
-- Name: resultados_examen resultados_examen_cita_examen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resultados_examen
    ADD CONSTRAINT resultados_examen_cita_examen_id_fkey FOREIGN KEY (cita_examen_id) REFERENCES public.cita_examenes(cita_examen_id);


--
-- Name: usuarios usuarios_medico_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_medico_id_fkey FOREIGN KEY (medico_id) REFERENCES public.medicos(medico_id);


--
-- PostgreSQL database dump complete
--

\unrestrict kvySLpsyLuV8khLkrF4ABuoCELtdVimLuuXbOFb0i0naxfHyc8a85wfvJwrztqA

