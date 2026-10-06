-- =============================================================
-- SISTEMA WEB DE GESTION DE CITAS, LABORATORIO Y PROGRAMACION MEDICA
-- Script de creacion de base de datos - PostgreSQL
-- Version: 3.0
-- =============================================================

-- -------------------------------------------------------------
-- 0. CREACION DE LA BASE DE DATOS
-- -------------------------------------------------------------
-- Ejecutar esta parte conectado a la base "postgres" (o cualquier
-- otra), NO dentro de la base "clinica" que se va a crear.
-- Luego, conectarse a "clinica" antes de ejecutar el resto del script.

DROP DATABASE IF EXISTS clinica;
CREATE DATABASE clinica
    WITH ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE   = 'es_ES.UTF-8'
    TEMPLATE = template0;

-- \c clinica   -- (en psql, conectarse a la base recien creada)


-- =============================================================
-- 1. PACIENTES
-- =============================================================
CREATE TABLE pacientes (
    historia_clinica   VARCHAR(15) PRIMARY KEY,           -- igual al DNI
    dni                 VARCHAR(15) NOT NULL UNIQUE,
    nombres             VARCHAR(100) NOT NULL,
    apellidos           VARCHAR(100) NOT NULL,
    sexo                VARCHAR(1) CHECK (sexo IN ('M','F')),
    celular             VARCHAR(20),
    fecha_registro      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pacientes_nombres ON pacientes (apellidos, nombres);


-- =============================================================
-- 2. CUENTAS (una por cada atencion/cita del paciente)
-- =============================================================
CREATE TABLE cuentas (
    cuenta_id           SERIAL PRIMARY KEY,
    historia_clinica    VARCHAR(15) NOT NULL REFERENCES pacientes(historia_clinica),
    fecha_apertura       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cuentas_historia_clinica ON cuentas (historia_clinica);


-- =============================================================
-- 3. SERVICIOS (catalogo: 9 especialidades + Laboratorio)
-- =============================================================
CREATE TABLE servicios (
    servicio_id         SERIAL PRIMARY KEY,
    nombre               VARCHAR(50) NOT NULL UNIQUE,
    tipo                 VARCHAR(20) NOT NULL CHECK (tipo IN ('consultorio','laboratorio'))
);

INSERT INTO servicios (nombre, tipo) VALUES
    ('Medicina General', 'consultorio'),
    ('Flebología', 'consultorio'),
    ('Urología', 'consultorio'),
    ('Endocrinología', 'consultorio'),
    ('Obstetricia', 'consultorio'),
    ('Neurología', 'consultorio'),
    ('Fisioterapia', 'consultorio'),
    ('Podología', 'consultorio'),
    ('Psicología', 'consultorio'),
    ('Laboratorio', 'laboratorio');


-- =============================================================
-- 4. CONSULTORIOS (catalogo)
-- =============================================================
CREATE TABLE consultorios (
    consultorio_id       SERIAL PRIMARY KEY,
    nombre                 VARCHAR(50) NOT NULL,
    ubicacion              VARCHAR(100)
);


-- =============================================================
-- 5. MEDICOS (catalogo)
-- =============================================================
CREATE TABLE medicos (
    medico_id            SERIAL PRIMARY KEY,
    nombres                VARCHAR(100) NOT NULL,
    apellidos              VARCHAR(100) NOT NULL,
    especialidad           VARCHAR(100),     -- debe coincidir con un nombre de 'servicios' tipo consultorio
    dni                     VARCHAR(15)
);


-- =============================================================
-- 6. PROGRAMACION MEDICA (Modulo 3: almanaque, por turno)
-- =============================================================
CREATE TABLE programacion_medica (
    programacion_id      SERIAL PRIMARY KEY,
    medico_id              INTEGER NOT NULL REFERENCES medicos(medico_id),
    consultorio_id         INTEGER NOT NULL REFERENCES consultorios(consultorio_id),
    fecha                   DATE NOT NULL,
    turno                   VARCHAR(10) NOT NULL CHECK (turno IN ('mañana','tarde')),
    hora_inicio             TIME NOT NULL,     -- por defecto 08:00 (mañana) o 14:00 (tarde)
    hora_fin                TIME NOT NULL,     -- por defecto 12:00 (mañana) o 18:00 (tarde)
    CONSTRAINT chk_horario_programacion CHECK (hora_fin > hora_inicio)
);

CREATE INDEX idx_programacion_fecha ON programacion_medica (fecha);
CREATE INDEX idx_programacion_medico_fecha ON programacion_medica (medico_id, fecha);
CREATE INDEX idx_programacion_consultorio_fecha ON programacion_medica (consultorio_id, fecha);

-- Regla de negocio a validar en la aplicacion (o via trigger):
--   No debe existir cruce de horario para el mismo medico_id en la misma fecha,
--   ni para el mismo consultorio_id en la misma fecha.


-- =============================================================
-- 7. CATEGORIAS DE EXAMEN (con soporte de subcategoria)
-- =============================================================
CREATE TABLE categorias_examen (
    categoria_id          SERIAL PRIMARY KEY,
    nombre                  VARCHAR(100) NOT NULL,
    categoria_padre_id      INTEGER REFERENCES categorias_examen(categoria_id)
    -- categoria_padre_id se usa solo para las subcategorias de
    -- "Examenes Ecograficos" (Obstetricia, Ginecologica o Pelvica,
    -- Partes Blandas/MSK, Abdominal Superior, Vias Urinarias y Prostata).
    -- En el resto de categorias queda en NULL.
);


-- =============================================================
-- 8. EXAMENES (catalogo de laboratorio)
-- =============================================================
CREATE TABLE examenes_catalogo (
    examen_id            SERIAL PRIMARY KEY,
    categoria_id           INTEGER NOT NULL REFERENCES categorias_examen(categoria_id),
    nombre                  VARCHAR(150) NOT NULL,
    UNIQUE (categoria_id, nombre)
);

CREATE INDEX idx_examenes_categoria ON examenes_catalogo (categoria_id);


-- =============================================================
-- 9. ESTADOS (catalogo de estados de una cita)
-- =============================================================
-- Tabla solo de estructura. El seed con los 5 estados
-- (Pendiente, Confirmada, Atendida, Ausente, Eliminado) se corre
-- aparte, como script independiente.
CREATE TABLE estados (
    id_estado           SERIAL PRIMARY KEY,
    estado                 VARCHAR(20) NOT NULL UNIQUE
);


-- =============================================================
-- 10. CITAS
-- =============================================================
CREATE TABLE citas (
    cita_id               SERIAL PRIMARY KEY,
    cuenta_id               INTEGER NOT NULL REFERENCES cuentas(cuenta_id),
    servicio_id             INTEGER NOT NULL REFERENCES servicios(servicio_id),
    fecha_cita               DATE NOT NULL,
    hora_inicio              TIME NOT NULL,        -- inicio del bloque de 30 min
    hora_fin                 TIME NOT NULL,        -- hora_inicio + 30 min
    programacion_id          INTEGER REFERENCES programacion_medica(programacion_id), -- solo servicios tipo 'consultorio'
    id_estado                INTEGER NOT NULL REFERENCES estados(id_estado),
    fecha_registro           TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_citas_fecha ON citas (fecha_cita);
CREATE INDEX idx_citas_servicio_fecha ON citas (servicio_id, fecha_cita);
CREATE INDEX idx_citas_cuenta ON citas (cuenta_id);
CREATE INDEX idx_citas_id_estado ON citas (id_estado);

-- Regla de negocio a validar en la aplicacion (o via trigger):
--   No debe existir otra cita con el mismo servicio (o mismo consultorio/laboratorio)
--   que se cruce en fecha_cita + hora_inicio/hora_fin.


-- =============================================================
-- 11. CITA_EXAMENES (examenes solicitados en una cita de laboratorio)
-- =============================================================
CREATE TABLE cita_examenes (
    cita_examen_id        SERIAL PRIMARY KEY,
    cita_id                  INTEGER NOT NULL REFERENCES citas(cita_id),
    examen_id                INTEGER NOT NULL REFERENCES examenes_catalogo(examen_id),
    estado                   VARCHAR(20) NOT NULL DEFAULT 'pendiente'
                              CHECK (estado IN ('pendiente','con_resultado')),
    UNIQUE (cita_id, examen_id)
);

CREATE INDEX idx_cita_examenes_cita ON cita_examenes (cita_id);


-- =============================================================
-- 12. RESULTADOS DE EXAMEN (version beta / generica)
-- =============================================================
CREATE TABLE resultados_examen (
    resultado_id          SERIAL PRIMARY KEY,
    cita_examen_id           INTEGER NOT NULL UNIQUE REFERENCES cita_examenes(cita_examen_id),
    resultado_texto          TEXT NOT NULL,     -- campo generico beta: texto/observaciones del resultado
    fecha_registro           TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Nota: 'resultado_texto' es un campo generico mientras el cliente define
-- los formularios especificos por examen. Cuando se definan, se puede
-- migrar a una columna JSONB con los campos propios de cada examen,
-- sin romper el resto del modelo.


-- =============================================================
-- 13. DIAGNOSTICOS (una cita puede tener a lo mas uno, no todas lo tienen)
-- =============================================================
CREATE TABLE diagnosticos (
    id_diagnostico        SERIAL PRIMARY KEY,
    id_cita                  INTEGER NOT NULL UNIQUE REFERENCES citas(cita_id),
    diagnostico               TEXT NOT NULL,
    fecha_registro            TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_diagnosticos_id_cita ON diagnosticos (id_cita);


-- =============================================================
-- 14. TRIAJE (una cita puede tener a lo mas uno, no todas lo tienen)
-- =============================================================
CREATE TABLE triaje (
    id_triaje              SERIAL PRIMARY KEY,
    id_cita                   INTEGER NOT NULL UNIQUE REFERENCES citas(cita_id),
    peso                       NUMERIC(5,2),      -- kg
    talla                       NUMERIC(5,1),      -- cm
    presion_arterial              VARCHAR(15),       -- ej. "120/80"
    temperatura                    NUMERIC(4,1),      -- °C
    frecuencia_cardiaca               INTEGER,           -- lpm
    saturacion_o2                       INTEGER,           -- %
    motivo_consulta                       TEXT,
    fecha_registro                          TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_triaje_id_cita ON triaje (id_cita);


-- =============================================================
-- 15. DATOS SEMILLA: CATEGORIAS Y SUBCATEGORIAS DE EXAMEN
-- =============================================================

INSERT INTO categorias_examen (nombre) VALUES
    ('Perfiles'),
    ('Hematología'),
    ('Bioquímica'),
    ('Endocrinología'),
    ('Microbiología'),
    ('Heces'),
    ('Inmunología'),
    ('Marcadores Tumorales'),
    ('Anatomía Patológica'),
    ('Orina'),
    ('Exámenes Ecográficos'),
    ('Otros');

-- Subcategorias de "Examenes Ecograficos"
INSERT INTO categorias_examen (nombre, categoria_padre_id) VALUES
    ('Obstetricia',                (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos')),
    ('Ginecológica o Pélvica',     (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos')),
    ('Partes Blandas / MSK',       (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos')),
    ('Abdominal Superior',         (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos')),
    ('Vías Urinarias y Próstata',  (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos'));


-- =============================================================
-- 16. DATOS SEMILLA: CATALOGO DE EXAMENES POR CATEGORIA
-- (segun ficha fisica de referencia del cliente - LABNOR)
-- =============================================================

-- A.1 Perfiles
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Perfil Coagulación','Perfil Hepático','Perfil Pre-Operatorio','Perfil Lipídico',
    'Perfil Tiroideo (T3, T4, TSH)','TORCH','Hormonal Femenino (FSH, LH, Estradiol)',
    'Anemia (Hemograma, frotis, hierro sérico, ferritina, B12, ácido fólico)',
    'Drogas de Abuso en orina (panel de 5)'
]) AS examen
WHERE nombre = 'Perfiles';

-- A.2 Hematología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Ácido Fólico','Coagulación y Sangría','Constantes Corpusculares','Ferritina',
    'Fibrinógeno','Gota Gruesa','Hemoglobina / Hematocrito','Hemograma Automatizado',
    'Hierro Sérico y Transferrina','Plaquetas','Reticulocitos','Tiempo de Protrombina',
    'Tiempo de Tromboplastina','Velocidad de Sedimentación','Vitamina B12'
]) AS examen
WHERE nombre = 'Hematología';

-- A.3 Bioquímica
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Ácido Úrico','Amilasa','Bilirrubinas','Calcio / Calcio Iónico','Colesterol Total',
    'Colesterol HDL','Colesterol LDL','Colesterol VLDL','Creatinina','CPK','CPK-MB',
    'DHL (Deshidrogenasa Láctica)','Depuración de Creatinina','Electrolitos',
    'Fosfatasa Ácida Prostática','Fosfatasa Alcalina','Fósforo','GGTP','Glucosa',
    'Glucosa Post-Prandial','Hemoglobina Glicosilada','Lipasa','Lípidos Totales',
    'Magnesio','Potasio','Proteínas Totales y Fraccionadas','Riesgo Coronario','Sodio',
    'Tolerancia a la Glucosa','Transaminasa Oxalacética (TGO)','Transaminasa Pirúvica (TGP)',
    'Triglicéridos','Urea'
]) AS examen
WHERE nombre = 'Bioquímica';

-- A.4 Endocrinología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Cortisol A.M.','Cortisol P.M.','DHEA-S','Estradiol','Estriol','FSH',
    'Hormona de Crecimiento','Insulina','LH','Progesterona','Prolactina','Testosterona',
    'Tiroxina (T4)','Triyodotironina (T3)','TSH','TSH Ultrasensible','T3 Libre','T4 Libre'
]) AS examen
WHERE nombre = 'Endocrinología';

-- A.5 Microbiología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'BK Directo','Frotis Directo (gérmenes)','Frotis (hongos)','Coprocultivo',
    'Cultivo de Secreción Conjuntival','Cultivo de Secreción Vaginal','Hemocultivo',
    'Urocultivo','Secreción Faríngea','Otros'
]) AS examen
WHERE nombre = 'Microbiología';

-- A.6 Heces
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Parasitológico Especial','Parasitológico Simple','Parasitológico Seriado (x3)',
    'Leucocitos en Heces (reacción inflamatoria)','Test de Graham (Oxiuros)',
    'Thevenon','Coprológico Funcional'
]) AS examen
WHERE nombre = 'Heces';

-- A.7 Inmunología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Aglutinaciones','Aglutinaciones en Tubo','Aglutinaciones Febriles en Zona',
    'Aglutininas 2-Mercaptoetanol','Anticuerpos Bloqueadores','Anticuerpos Antinucleares',
    'Antiestreptolisinas','Anti-DNA','Anticuerpos Antimitocondriales',
    'Anticuerpos Antimúsculo Liso','Hepatitis A (HAV IgG)','Hepatitis A (HAV IgM)',
    'Hepatitis B (HBsAg - Antígeno de Australia)','Hepatitis B (Anti-HBs)',
    'Hepatitis B (HBc Anti-core IgM)','Hepatitis B (HBc Anti-core IgG)',
    'Hepatitis B (HBeAg)','Hepatitis B (Anti-HBe)','Hepatitis C (HVC)',
    'Hepatitis D (IgG)','Hepatitis D (IgM)','Anticuerpos Clamidia IgG',
    'Anticuerpos Clamidia IgM','Anticuerpos Cisticercosis','Anticuerpos Criptococosis',
    'Anticuerpos Herpes I IgM','Anticuerpos Herpes I IgG','Anticuerpos Herpes II IgM',
    'Anticuerpos Herpes II IgG','Anticuerpos Toxoplasma IgG','Anticuerpos Toxoplasma IgM',
    'Anticuerpos Rubéola IgM','Anticuerpos Rubéola IgG','Anticuerpos Citomegalovirus IgM',
    'Anticuerpos Citomegalovirus IgG','Anticuerpos VIH (ELISA)','Anticuerpos VIH (Western Blot)',
    'Hidatidosis (Arco V)','Coombs Directo','Coombs Indirecto','Complemento C3-C4',
    'Fenómeno LE','FTA-ABS','Factor Reumatoideo','Grupo Sanguíneo y Factor RH',
    'Inmunoglobulinas (IgA, IgG, IgM)','Inmunoglobulina E','Proteína C Reactiva',
    'HCG Cualitativo','HCG Cuantitativo','Test de Alergia','VDRL Cualitativo',
    'Proteína C Reactiva Ultrasensible','Troponina'
]) AS examen
WHERE nombre = 'Inmunología';

-- A.8 Marcadores Tumorales
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Albuminuria / Proteinuria 24h','AFP (cáncer de hígado)','CEA (cáncer de pulmón y colon)',
    'Calcitonina','CA 19-9 (cáncer de páncreas)','CA 15-3 (cáncer de mama)',
    'CA 549 (cáncer de ovario)','CA 72-4 (cáncer de estómago)','Beta-2 Microglobulina',
    'PSA (antígeno prostático)','PSA Libre','PSA Índice'
]) AS examen
WHERE nombre = 'Marcadores Tumorales';

-- A.9 Anatomía Patológica
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Papanicolaou','Biopsia','Biopsia Quirúrgica (con pieza operatoria)'
]) AS examen
WHERE nombre = 'Anatomía Patológica';

-- A.10 Orina
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Ácido Úrico en orina 24h','Bence Jones','Calcio en orina 24h','Creatinina en orina',
    'Examen Completo de Orina','Electrolitos en orina','5-OH-Indolacético',
    'Osmolaridad Urinaria'
]) AS examen
WHERE nombre = 'Orina';

-- A.11 Exámenes Ecográficos (por subcategoría)
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Edad Gestacional','Actividad Cardiaca Fetal','Ubicación Placentaria',
    'Líquido Amniótico','Perfil Biofísico','Embarazo Ectópico','Embarazo Molar',
    'Sexo Fetal','Amenaza de Aborto','Placenta Previa'
]) AS examen
WHERE nombre = 'Obstetricia';

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Útero','Ovario','Diagnóstico de Embarazo Precoz','Poliquistosis Ovárica',
    'Localizar DIU','Miomas','Quistes'
]) AS examen
WHERE nombre = 'Ginecológica o Pélvica';

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Mamas','Tiroides','Lipomas','Hernias / Eventraciones','Hombro / Rodilla / Tobillo',
    'Testículos'
]) AS examen
WHERE nombre = 'Partes Blandas / MSK';

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Hígado','Vesícula Biliar y Vías Biliares','Páncreas y Retroperitoneo','Bazo'
]) AS examen
WHERE nombre = 'Abdominal Superior';

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Riñones y Vejiga','Próstata y Vejiga'
]) AS examen
WHERE nombre = 'Vías Urinarias y Próstata';

-- A.12 Otros: categoría abierta, sin ítems predefinidos (pendiente de confirmar, ver documento de requerimientos)

-- =============================================================
-- 17. USUARIOS DEL SISTEMA (login por roles: admin, recepcion, medico, laboratorio)
-- =============================================================
CREATE TABLE usuarios (
    usuario_id           SERIAL PRIMARY KEY,
    nombre_usuario         VARCHAR(50) NOT NULL UNIQUE,
    password_hash           VARCHAR(255) NOT NULL,          -- nunca texto plano, siempre hash (bcrypt)
    nombres                  VARCHAR(100) NOT NULL,
    apellidos                VARCHAR(100) NOT NULL,
    rol                      VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'recepcion', 'medico', 'laboratorio')),
    medico_id                INTEGER REFERENCES medicos(medico_id),  -- solo aplica si rol = 'medico'
    activo                   BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion            TIMESTAMP NOT NULL DEFAULT NOW(),
    ultimo_login              TIMESTAMP
);

CREATE INDEX idx_usuarios_nombre_usuario ON usuarios (nombre_usuario);
CREATE INDEX idx_usuarios_rol ON usuarios (rol);