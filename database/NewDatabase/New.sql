-- 001_schema_db.sql
BEGIN;

SET client_encoding = 'UTF8';

-- ==========================================
-- 1. DOMINIOS Y CATÁLOGOS BASE
-- ==========================================

CREATE TABLE roles (
    rol_id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    es_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE estados (
    estado_id SERIAL PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    ambito VARCHAR(20) NOT NULL CHECK (ambito IN ('cita', 'laboratorio')),
    descripcion VARCHAR(150),
    color VARCHAR(20) NOT NULL,
    orden SMALLINT NOT NULL
);

CREATE TABLE consultorios (
    consultorio_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(150)
);

CREATE TABLE servicios (
    servicio_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('consultorio', 'laboratorio'))
);

-- ==========================================
-- 2. GESTIÓN DE PERSONAL (USUARIOS Y MÉDICOS)
-- ==========================================

CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    rol_id INTEGER NOT NULL REFERENCES roles(rol_id),
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    dni VARCHAR(15) UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP
);

CREATE TABLE medicos (
    medico_id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL UNIQUE REFERENCES usuarios(usuario_id),
    especialidad VARCHAR(100) NOT NULL,
    cmp VARCHAR(15) UNIQUE
);

-- ==========================================
-- 3. PACIENTES Y CUENTAS (EPISODIOS DE ATENCIÓN)
-- ==========================================

CREATE TABLE pacientes (
    paciente_id SERIAL PRIMARY KEY,
    historia_clinica VARCHAR(20) NOT NULL UNIQUE,
    dni VARCHAR(15) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    sexo VARCHAR(1) CHECK (sexo IN ('M', 'F')),
    celular VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_pacientes_nombres ON pacientes(apellidos, nombres);

-- Secuencia para generación automática de Historia Clínica (HC-000001)
CREATE SEQUENCE pacientes_historia_clinica_seq START 1;

CREATE TABLE cuentas (
    cuenta_id SERIAL PRIMARY KEY,
    paciente_id INTEGER NOT NULL REFERENCES pacientes(paciente_id) ON DELETE CASCADE,
    fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_cuentas_paciente ON cuentas(paciente_id);

-- ==========================================
-- 4. CATÁLOGO DE EXÁMENES (Compartido entre Citas y Laboratorio)
-- ==========================================

CREATE TABLE categorias_examen (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_padre_id INTEGER REFERENCES categorias_examen(categoria_id)
);

CREATE TABLE examenes_catalogo (
    examen_id SERIAL PRIMARY KEY,
    categoria_id INTEGER NOT NULL REFERENCES categorias_examen(categoria_id),
    nombre VARCHAR(150) NOT NULL,
    UNIQUE (categoria_id, nombre)
);

-- ==========================================
-- 5. FLUJO DE ATENCIÓN MÉDICA (CITAS)
-- ==========================================

CREATE TABLE programacion_medica (
    programacion_id SERIAL PRIMARY KEY,
    medico_id INTEGER NOT NULL REFERENCES medicos(medico_id),
    consultorio_id INTEGER NOT NULL REFERENCES consultorios(consultorio_id),
    fecha DATE NOT NULL,
    turno VARCHAR(10) NOT NULL CHECK (turno IN ('mañana', 'tarde')),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    CONSTRAINT chk_horario_prog CHECK (hora_fin > hora_inicio)
);

CREATE TABLE citas (
    cita_id SERIAL PRIMARY KEY,
    cuenta_id INTEGER NOT NULL REFERENCES cuentas(cuenta_id),
    servicio_id INTEGER NOT NULL REFERENCES servicios(servicio_id),
    programacion_id INTEGER REFERENCES programacion_medica(programacion_id),
    estado_id INTEGER NOT NULL REFERENCES estados(estado_id),
    fecha_cita DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_citas_cuenta ON citas(cuenta_id);
CREATE INDEX idx_citas_fecha ON citas(fecha_cita);

CREATE TABLE triajes (
    triaje_id SERIAL PRIMARY KEY,
    cita_id INTEGER NOT NULL UNIQUE REFERENCES citas(cita_id) ON DELETE CASCADE,
    peso NUMERIC(5, 2),
    talla NUMERIC(5, 1),
    presion_arterial VARCHAR(15),
    temperatura NUMERIC(4, 1),
    frecuencia_cardiaca INTEGER,
    frecuencia_respiratoria INTEGER,
    saturacion_o2 INTEGER,
    motivo_consulta TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE diagnosticos (
    diagnostico_id SERIAL PRIMARY KEY,
    cita_id INTEGER NOT NULL UNIQUE REFERENCES citas(cita_id) ON DELETE CASCADE,
    sintomas TEXT,
    diagnostico TEXT NOT NULL,
    indicaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Órdenes de laboratorio emitidas durante la consulta médica
CREATE TABLE cita_examenes (
    cita_examen_id SERIAL PRIMARY KEY,
    cita_id INTEGER NOT NULL REFERENCES citas(cita_id) ON DELETE CASCADE,
    examen_id INTEGER NOT NULL REFERENCES examenes_catalogo(examen_id),
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'con_resultado')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (cita_id, examen_id)
);
CREATE INDEX idx_cita_examenes_cita ON cita_examenes(cita_id);

-- ==========================================
-- 6. FLUJO DE LABORATORIO
-- ==========================================

CREATE TABLE ordenes_laboratorio (
    orden_id SERIAL PRIMARY KEY,
    cuenta_id INTEGER NOT NULL REFERENCES cuentas(cuenta_id),
    estado_id INTEGER NOT NULL REFERENCES estados(estado_id),
    usuario_muestra_id INTEGER NOT NULL REFERENCES usuarios(usuario_id),
    fecha_muestra TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuario_resultado_id INTEGER REFERENCES usuarios(usuario_id),
    fecha_resultado TIMESTAMP,
    usuario_anulacion_id INTEGER REFERENCES usuarios(usuario_id),
    motivo_anulacion TEXT,
    fecha_anulacion TIMESTAMP,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_ordenes_cuenta ON ordenes_laboratorio(cuenta_id);
CREATE INDEX idx_ordenes_estado ON ordenes_laboratorio(estado_id);
CREATE INDEX idx_ordenes_fecha_muestra ON ordenes_laboratorio(fecha_muestra);

CREATE TABLE orden_examenes (
    orden_examen_id SERIAL PRIMARY KEY,
    orden_id INTEGER NOT NULL REFERENCES ordenes_laboratorio(orden_id) ON DELETE CASCADE,
    examen_id INTEGER NOT NULL REFERENCES examenes_catalogo(examen_id),
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'con_resultado')),
    UNIQUE (orden_id, examen_id)
);
CREATE INDEX idx_orden_examenes_orden ON orden_examenes(orden_id);

CREATE TABLE resultados_orden (
    resultado_id SERIAL PRIMARY KEY,
    orden_examen_id INTEGER NOT NULL UNIQUE REFERENCES orden_examenes(orden_examen_id) ON DELETE CASCADE,
    resultado_texto TEXT NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(usuario_id),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_resultados_orden_examen ON resultados_orden(orden_examen_id);

COMMIT;