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
    edad SMALLINT CHECK (edad BETWEEN 0 AND 120),
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
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE examenes_catalogo (
    examen_id VARCHAR(20) PRIMARY KEY, -- EL ID AHORA ES EL CÓDIGO (Ej. E0454)
    categoria_id INTEGER NOT NULL REFERENCES categorias_examen(categoria_id),
    nombre VARCHAR(150) NOT NULL,
    UNIQUE (categoria_id, nombre)
);

CREATE TABLE examen_detalles (
    examen_id VARCHAR(20) PRIMARY KEY REFERENCES examenes_catalogo(examen_id) ON DELETE CASCADE,
    precio_corporativo NUMERIC(10, 2),
    precio_publico NUMERIC(10, 2),
    muestra VARCHAR(100),
    tubo VARCHAR(100),
    condicion VARCHAR(100),
    tiempo VARCHAR(100)
);

-- Campos (parámetros) de cada examen: nombre, unidad, tipo y valores de
-- referencia. Una fila por campo; si el rango cambia por sexo o por edad se
-- repite la fila con ese sexo / rango de edad. La 'clave' es la que usa el
-- formato de resultado del frontend (ej. 'bilirrubinaDirecta').
CREATE TABLE examen_parametros (
    parametro_id SERIAL PRIMARY KEY,
    examen_id VARCHAR(20) NOT NULL REFERENCES examenes_catalogo(examen_id) ON DELETE CASCADE,
    clave VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    unidad VARCHAR(20),
    tipo VARCHAR(10) NOT NULL DEFAULT 'numero' CHECK (tipo IN ('numero', 'texto', 'opcion')),
    opciones VARCHAR(200),                       -- 'NEGATIVO,POSITIVO' si tipo = 'opcion'
    orden SMALLINT NOT NULL DEFAULT 1,
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')),     -- NULL = vale para ambos
    edad_min SMALLINT,                           -- años; NULL = sin límite
    edad_max SMALLINT,
    ref_min NUMERIC(12, 3),                      -- para marcar alto / bajo
    ref_max NUMERIC(12, 3),
    ref_texto VARCHAR(100)                       -- tal como se imprime: '2.4 – 5.7', 'Menor a 200'
);
CREATE UNIQUE INDEX ux_examen_parametros
    ON examen_parametros (examen_id, clave, COALESCE(sexo, ''), COALESCE(edad_min, -1));
CREATE INDEX idx_examen_parametros_examen ON examen_parametros(examen_id);

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
    examen_id VARCHAR(20) NOT NULL REFERENCES examenes_catalogo(examen_id), -- Cambiado a VARCHAR
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
    examen_id VARCHAR(20) NOT NULL REFERENCES examenes_catalogo(examen_id), -- Cambiado a VARCHAR
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

-- Valores registrados en cada resultado, uno por campo. resultados_orden sigue
-- siendo el contenedor (quién y cuándo); resultado_texto conserva el JSON del
-- formato y esta tabla lo guarda desglosado para poder consultarlo.
CREATE TABLE resultado_valores (
    valor_id SERIAL PRIMARY KEY,
    resultado_id INTEGER NOT NULL REFERENCES resultados_orden(resultado_id) ON DELETE CASCADE,
    clave VARCHAR(50) NOT NULL,
    valor_texto VARCHAR(200) NOT NULL,
    valor_numero NUMERIC(14, 4),                 -- NULL si el valor no es un número
    UNIQUE (resultado_id, clave)
);

COMMIT;