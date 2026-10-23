-- 002_seeds_db.sql
BEGIN;

SET client_encoding = 'UTF8';

-- 1. ROLES DEL SISTEMA
INSERT INTO roles (nombre, es_admin) VALUES
    ('admin', true),
    ('recepcion', false),
    ('medico', false),
    ('laboratorio', false)
ON CONFLICT (nombre) DO NOTHING;

-- 2. USUARIO ADMINISTRADOR POR DEFECTO
INSERT INTO usuarios (rol_id, nombre_usuario, password_hash, nombres, apellidos, activo)
VALUES (
    (SELECT rol_id FROM roles WHERE nombre = 'admin'),
    'admin_chrisal',
    '$2b$10$bCeZnXM5G63dS20DBSexeukT8NgbH0hPTuCUILfraXfv./96t0E/y', 
    'Administrador',
    'Sistema',
    true
)
ON CONFLICT (nombre_usuario) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- 3. ESTADOS CENTRALIZADOS (Citas y Laboratorio)
INSERT INTO estados (codigo, nombre, ambito, descripcion, color, orden) VALUES
    ('pendiente_triaje',      'Pendiente de Triaje',      'cita',        'Recepción registra los signos vitales',      'amber',   1),
    ('pendiente_diagnostico', 'Pendiente de Diagnóstico', 'cita',        'El médico registra síntomas y diagnóstico',  'violet',  2),
    ('atendida',              'Atendida',                 'cita',        'La cita ya fue atendida',                    'blue',    3),
    ('ausente',               'Ausente',                  'cita',        'El paciente no llegó a la cita',             'red',     4),
    ('cancelada',             'Cancelada',                'cita',        'La cita fue cancelada antes de la atención', 'gray',    5),
    ('en_analisis',           'En análisis',              'laboratorio', 'Muestra tomada, en procesamiento',           'blue',    1),
    ('resultado_parcial',     'Resultado parcial',        'laboratorio', 'Algunos exámenes completados',               'amber',   2),
    ('resultado_listo',       'Resultado listo',          'laboratorio', 'Todos los resultados ingresados',            'emerald', 3),
    ('anulada',               'Anulada',                  'laboratorio', 'Orden cancelada',                            'rose',    4)
ON CONFLICT (codigo) DO NOTHING;

-- 4. CONSULTORIOS (Sedes físicas)
INSERT INTO consultorios (nombre, ubicacion) VALUES
    ('Laboratorio Clínico', 'Jirón Real 424, Mala 15608'),
    ('Policlínico Chrisal', 'Pje. Pl. de Armas 00051, Mala 00051')
ON CONFLICT DO NOTHING;

-- 5. SERVICIOS
INSERT INTO servicios (nombre, tipo) VALUES
    ('Medicina General', 'consultorio'),
    ('Flebología',        'consultorio'),
    ('Urología',          'consultorio'),
    ('Endocrinología',    'consultorio'),
    ('Obstetricia',       'consultorio'),
    ('Neurología',        'consultorio'),
    ('Fisioterapia',      'consultorio'),
    ('Podología',         'consultorio'),
    ('Psicología',        'consultorio'),
    ('Laboratorio',       'laboratorio')
ON CONFLICT (nombre) DO NOTHING;

-- 6. CATEGORÍAS DE EXAMEN
INSERT INTO categorias_examen (nombre)
SELECT v.nombre FROM (VALUES
    ('Perfiles'), ('Hematología'), ('Bioquímica'), ('Endocrinología'),
    ('Microbiología'), ('Heces'), ('Inmunología'), ('Marcadores Tumorales'),
    ('Anatomía Patológica'), ('Orina'), ('Exámenes Ecográficos'), ('Otros'),
    -- Antes eran subcategorías de 'Exámenes Ecográficos'; ahora son categorías normales.
    ('Obstetricia'), ('Ginecológica o Pélvica'), ('Partes Blandas / MSK'),
    ('Abdominal Superior'), ('Vías Urinarias y Próstata')
) AS v(nombre)
WHERE NOT EXISTS (SELECT 1 FROM categorias_examen c WHERE c.nombre = v.nombre);

-- =========================================================================
-- 7. CATÁLOGO MAESTRO DE EXÁMENES (CARGA AUTOMATIZADA CON DETALLES Y CÓDIGOS)
-- =========================================================================

WITH datos_examenes(codigo, categoria, nombre, p_corp, p_pub, muestra, tubo, condicion, tiempo) AS (
    VALUES
    -- INMUNOLOGÍA / PRUEBAS ESPECIALES
    ('E0454', 'Endocrinología',       '17-OH PROGESTERONA', 48, 90, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0262', 'Bioquímica',           'ACIDO FOLICO SERICO', 47, 90, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', '1 A 2 DÍAS'),
    ('E0211', 'Bioquímica',           'ACIDO URICO', 10, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DIA'),
    ('E0322', 'Orina',                'ACIDO URICO EN ORINA 24hr', 30, 60, 'ORINA DE 24H', 'GALONERA', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0187', 'Bioquímica',           'ACIDOS BILIARES', 64, 130, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', '1 A 2 DÍAS'),
    ('E0202', 'Inmunología',          'AGLUTINACIONES FEBRILES', 12, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', 'MISMO DIA'),
    ('E0208', 'Bioquímica',           'ALBUMINA', 10, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DIA'),
    ('E0426', 'Marcadores Tumorales', 'ALFAFETOPROTEINA (AFP)', 50, 100, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0188', 'Bioquímica',           'AMILASA', 25, 50, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', '1 A 2 DÍAS'),
    ('E0323', 'Orina',                'AMILASA EN ORINA 24hr', 37, 80, 'ORINA DE 24H', 'GALONERA', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0356', 'Inmunología',          'ANTI NUCLEARES (ANA METODO IFI)', 76, 160, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '5 A 6 DÍAS'),
    ('E0201', 'Inmunología',          'ANTIESTREPTOLISINA (ASO) LATEX', 12, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', 'MISMO DÍA'),
    ('E0427', 'Marcadores Tumorales', 'ANTIGENO CARCINOEMBRIONARIO (CEA)', 47, 100, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0205', 'Bioquímica',           'BILIRRUBINA TOTAL Y FRACCIONADA', 22, 50, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    
    -- MARCADORES TUMORALES
    ('E0429', 'Marcadores Tumorales', 'Ca-125 (ovarios)', 49, 100, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0430', 'Marcadores Tumorales', 'Ca-15.3 (mama)', 49, 100, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0431', 'Marcadores Tumorales', 'Ca-19.9 (colon, pancreas)', 49, 100, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0432', 'Marcadores Tumorales', 'Ca-72.4 (estomago)', 51, 110, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DÍAS'),
    
    -- BIOQUÍMICA VARIOS
    ('E0280', 'Bioquímica',           'CALCIO SERICO', 32, 70, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', '1 A 2 DÍAS'),
    ('E0181', 'Bioquímica',           'COLESTEROL TOTAL', 10, 20, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0189', 'Bioquímica',           'COLESTEROL HDL', 10, 20, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0190', 'Bioquímica',           'COLESTEROL LDL', 10, 20, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0191', 'Bioquímica',           'COLESTEROL VLDL', 10, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0184', 'Bioquímica',           'CREATININA', 10, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0180', 'Bioquímica',           'GLUCOSA BASAL', 7, 15, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0183', 'Bioquímica',           'UREA', 10, 30, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    
    -- HEMATOLOGÍA
    ('E0199', 'Hematología',          'HEMOGLOBINA', 7, 15, 'SANGRE CON EDTA', 'LILA', 'NO AYUNAS', 'MISMO DÍA'),
    ('E0192', 'Hematología',          'HEMOGRAMA COMPLETO', 23, 55, 'SANGRE CON EDTA', 'LILA', 'NO AYUNAS', 'MISMO DÍA'),
    ('E0233', 'Hematología',          'GRUPO SANGUINEO Y FACTOR RH', 9, 20, 'SANGRE CON EDTA', 'LILA', 'NO AYUNAS', 'MISMO DÍA'),
    ('E0234', 'Hematología',          'VELOCIDAD DE SEDIMENTACIÓN GLOBULAR (VSG)', 7, 15, 'SANGRE CON EDTA', 'LILA', 'NO AYUNAS', 'MISMO DÍA'),
    
    -- HECES Y ORINA
    ('E0193', 'Orina',                'EXAMEN DE ORINA COMPLETO', 7, 20, 'ORINA', 'FRASCO', 'AYUNAS', 'MISMO DÍA'),
    ('E0236', 'Heces',                'PARASITOLOGICO SIMPLE', 7, 15, 'HECES', 'FRASCO DE HECES', 'NO AYUNAS', 'MISMO DÍA'),
    ('E0235', 'Heces',                'PARASITOLOGICO SERIADO', 12, 45, 'HECES', 'FRASCO DE HECES', 'NO AYUNAS', '1 A 2 DÍAS'),
    
    -- DROGAS DE ABUSO
    ('E0324', 'Perfiles',             'BENZODIACEPINA', 39, 80, 'ORINA', 'FRASCO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0326', 'Perfiles',             'DOSAJE DE COCAINA', 39, 80, 'ORINA', 'FRASCO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0327', 'Perfiles',             'DOSAJE DE MARIHUANA', 39, 80, 'ORINA', 'FRASCO', 'NO AYUNAS', '1 A 2 DÍAS'),
    ('E0474', 'Perfiles',             'PERFIL DE DROGAS DE ABUSO', 90, 180, 'ORINA', 'FRASCO', 'NO AYUNAS', '1 A 2 DÍAS'),
    
    -- PERFILES VARIOS
    ('E0204', 'Perfiles',             'PERFIL HEPATICO', 47, 160, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0203', 'Perfiles',             'PERFIL LIPIDICO', 46, 60, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', 'MISMO DÍA'),
    ('E0220', 'Perfiles',             'PERFIL TIROIDEO I (TSH, T4)', 80, 160, 'SUERO', 'ROJO Y/O AMARILLO', 'AYUNAS', '1 A 2 DÍAS'),
    ('E0492', 'Perfiles',             'PERFIL DE COAGULACIÓN', 90, 180, 'PLASMA CITRATADO', 'CELESTE', 'AYUNAS', '1 A 2 DÍAS'),
    
    -- PRECISIÓN DE USUARIO (Extraído del ej. de PCR)
    ('E0200', 'Inmunología',          'PROTEINA C REACTIVA (PCR) CUANTITATIVO', 30, 65, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DIAS')
),
-- 1. Insertamos en el catálogo principal asegurándonos que existe la categoría
insert_catalogo AS (
    INSERT INTO examenes_catalogo (examen_id, categoria_id, nombre)
    SELECT d.codigo, c.categoria_id, d.nombre
    FROM datos_examenes d
    JOIN categorias_examen c ON c.nombre = d.categoria
    ON CONFLICT (examen_id) DO NOTHING
    RETURNING examen_id
)
-- 2. Insertamos sus precios e instrucciones en la tabla detalles
INSERT INTO examen_detalles (examen_id, precio_corporativo, precio_publico, muestra, tubo, condicion, tiempo)
SELECT d.codigo, d.p_corp, d.p_pub, d.muestra, d.tubo, d.condicion, d.tiempo
FROM datos_examenes d
WHERE d.codigo IN (SELECT examen_id FROM insert_catalogo)
ON CONFLICT (examen_id) DO UPDATE SET
    precio_corporativo = EXCLUDED.precio_corporativo,
    precio_publico = EXCLUDED.precio_publico,
    muestra = EXCLUDED.muestra,
    tubo = EXCLUDED.tubo,
    condicion = EXCLUDED.condicion,
    tiempo = EXCLUDED.tiempo;

-- 8. CAMPOS Y VALORES DE REFERENCIA DE LOS EXÁMENES CON FORMATO
-- Campos y valores de referencia de los exámenes que ya tienen formato de
-- resultado. Los rangos son los de cada formato (frontend-sistema/app/
-- laboratorio/formatos) y deben ser confirmados por el laboratorio.
INSERT INTO examen_parametros (examen_id, clave, nombre, unidad, tipo, opciones, orden, sexo, ref_texto, ref_min, ref_max)
SELECT e.examen_id, v.clave, v.nombre, v.unidad, v.tipo, v.opciones, v.orden, v.sexo, v.ref_texto, v.ref_min, v.ref_max
FROM (VALUES
    -- E0211 ACIDO URICO
    ('E0211', 'acidoUrico', 'Ácido Úrico', 'mg/dL', 'numero', NULL, 1, 'F', '2.4 – 5.7', 2.4, 5.7),
    ('E0211', 'acidoUrico', 'Ácido Úrico', 'mg/dL', 'numero', NULL, 1, 'M', '3.4 – 7.0', 3.4, 7.0),
    -- E0187 ACIDOS BILIARES
    ('E0187', 'acidosBiliares', 'Ácidos Biliares', 'umol/L', 'numero', NULL, 1, NULL, '0.0 – 10.0', 0.0, 10.0),
    -- E0205 BILIRRUBINA TOTAL Y FRACCIONADA
    ('E0205', 'bilirrubinaTotal', 'Bilirrubina Total', 'mg/dL', 'numero', NULL, 1, NULL, 'Hasta 1.20', NULL, 1.20),
    ('E0205', 'bilirrubinaDirecta', 'Bilirrubina Directa', 'mg/dL', 'numero', NULL, 2, NULL, 'Hasta 0.50', NULL, 0.50),
    ('E0205', 'bilirrubinaIndirecta', 'Bilirrubina Indirecta', 'mg/dL', 'numero', NULL, 3, NULL, 'Hasta 0.70', NULL, 0.70),
    -- E0280 CALCIO SERICO
    ('E0280', 'calcio', 'Calcio', 'mg/dL', 'numero', NULL, 1, NULL, '8.1 – 10.5', 8.1, 10.5),
    -- E0181 COLESTEROL TOTAL
    ('E0181', 'colesterol', 'Colesterol Total', 'mg/dL', 'numero', NULL, 1, NULL, 'Menor a 200', NULL, 200),
    -- E0190 COLESTEROL LDL
    ('E0190', 'colesterolLdl', 'Colesterol LDL', 'mg/dL', 'numero', NULL, 1, NULL, 'Menor a 120.0', NULL, 120),
    -- E0184 CREATININA
    ('E0184', 'creatinina', 'Creatinina', 'mg/dL', 'numero', NULL, 1, NULL, '0.40 – 1.50', 0.40, 1.50),
    -- E0188 AMILASA (el formato registra lipasa y amilasa)
    ('E0188', 'lipasa', 'Lipasa', 'UI/L', 'numero', NULL, 1, NULL, 'Menor 58.0', NULL, 58.0),
    ('E0188', 'amilasa', 'Amilasa', 'UI/L', 'numero', NULL, 2, NULL, '21.0 – 100.0', 21.0, 100.0),
    -- E0202 AGLUTINACIONES FEBRILES (negativo / positivo)
    ('E0202', 'tificoH', 'TÍFICO "H"', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, NULL, NULL, NULL),
    ('E0202', 'tificoO', 'TÍFICO "O"', NULL, 'opcion', 'NEGATIVO,POSITIVO', 2, NULL, NULL, NULL, NULL),
    ('E0202', 'paratificoA', 'PARATÍFICO "A"', NULL, 'opcion', 'NEGATIVO,POSITIVO', 3, NULL, NULL, NULL, NULL),
    ('E0202', 'paratificoB', 'PARATÍFICO "B"', NULL, 'opcion', 'NEGATIVO,POSITIVO', 4, NULL, NULL, NULL, NULL),
    ('E0202', 'brucellosis', 'BRUCELLOSIS', NULL, 'opcion', 'NEGATIVO,POSITIVO', 5, NULL, NULL, NULL, NULL)
) AS v(codigo, clave, nombre, unidad, tipo, opciones, orden, sexo, ref_texto, ref_min, ref_max)
JOIN examenes_catalogo e ON e.examen_id = v.codigo
ON CONFLICT DO NOTHING;

COMMIT;