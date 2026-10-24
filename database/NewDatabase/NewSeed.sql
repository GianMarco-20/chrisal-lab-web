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
    ('E0200', 'Inmunología',          'PROTEINA C REACTIVA (PCR) CUANTITATIVO', 30, 65, 'SUERO', 'ROJO Y/O AMARILLO', 'NO AYUNAS', '1 A 2 DIAS'),

    -- FORMATOS SIN EXAMEN PREVIO: código provisional P#### y sin precios (se cargan después)
    ('P0001', 'Inmunología', 'ANTI-CCP', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0002', 'Anatomía Patológica', 'BIOPSIA QUIRURGICA (CON PIEZA OPERATORIA)', NULL, NULL, NULL, NULL, NULL, NULL),
    ('P0003', 'Microbiología', 'BK DIRECTO', NULL, NULL, 'ESPUTO', NULL, NULL, NULL),
    ('P0004', 'Bioquímica', 'COLESTEROL Y TRIGLICERIDOS', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0005', 'Microbiología', 'COPROCULTIVO', NULL, NULL, 'HECES', NULL, NULL, NULL),
    ('P0006', 'Heces', 'COPROLOGICO FUNCIONAL', NULL, NULL, 'HECES', NULL, NULL, NULL),
    ('P0007', 'Endocrinología', 'CORTISOL A.M.', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0008', 'Endocrinología', 'CORTISOL P.M.', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0009', 'Microbiología', 'CULTIVO DE SECRECION FARINGEA', NULL, NULL, 'SECRECIÓN FARÍNGEA', NULL, NULL, NULL),
    ('P0010', 'Microbiología', 'CULTIVO DE SECRECION OTIDICA', NULL, NULL, 'SECRECIÓN OTÍDICA', NULL, NULL, NULL),
    ('P0011', 'Microbiología', 'CULTIVO DE SECRECION VAGINAL', NULL, NULL, 'SECRECIÓN VAGINAL', NULL, NULL, NULL),
    ('P0012', 'Bioquímica', 'ELECTROLITOS SERICOS', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0013', 'Inmunología', 'FACTOR REUMATOIDEO (FR)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0014', 'Hematología', 'FERRITINA', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0015', 'Bioquímica', 'GLUCOSA, COLESTEROL Y TRIGLICERIDOS', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0016', 'Inmunología', 'HCG CUALITATIVO', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0017', 'Inmunología', 'HCG CUANTITATIVO', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0018', 'Heces', 'HELICOBACTER PYLORI EN HECES (ANTIGENO)', NULL, NULL, 'HECES', NULL, NULL, NULL),
    ('P0019', 'Inmunología', 'HELICOBACTER PYLORI EN SANGRE (IGM)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0020', 'Bioquímica', 'HEMOGLOBINA GLICOSILADA (HBA1C)', NULL, NULL, 'SANGRE TOTAL', NULL, NULL, NULL),
    ('P0021', 'Inmunología', 'HEPATITIS B (HBSAG)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0022', 'Inmunología', 'HERPES 1 (IGM / IGG)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0023', 'Hematología', 'HIERRO SERICO', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0024', 'Inmunología', 'HIV ELISA', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0025', 'Endocrinología', 'HORMONAS FEMENINAS (ESTRADIOL, FSH, LH, PROGESTERONA, PROLACTINA)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0026', 'Inmunología', 'INMUNOGLOBULINA E', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0027', 'Endocrinología', 'INSULINA BASAL', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0028', 'Endocrinología', 'LH (HORMONA LUTEINIZANTE)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0029', 'Bioquímica', 'MAGNESIO', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0030', 'Marcadores Tumorales', 'MARCADORES TUMORALES (CEA, AFP)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0031', 'Orina', 'MICROALBUMINURIA', NULL, NULL, 'ORINA', NULL, NULL, NULL),
    ('P0032', 'Orina', 'MICROALBUMINURIA 24 HORAS', NULL, NULL, 'ORINA DE 24H', NULL, NULL, NULL),
    ('P0033', 'Anatomía Patológica', 'PAPANICOLAOU', NULL, NULL, NULL, NULL, NULL, NULL),
    ('P0034', 'Perfiles', 'PERFIL DE HEPATITIS (HBSAG, ANTI-HCV)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0035', 'Perfiles', 'PERFIL RENAL', NULL, NULL, 'SUERO Y ORINA DE 24H', NULL, NULL, NULL),
    ('P0036', 'Perfiles', 'PERFIL TIROIDEO (TSH, T3 LIBRE, T4 LIBRE)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0037', 'Perfiles', 'PERFIL DE ANEMIA (VITAMINA B12, ACIDO FOLICO, FERRITINA, TRANSFERRINA)', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0038', 'Bioquímica', 'PROTEINAS TOTALES', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0039', 'Orina', 'PROTEINURIA 24 HORAS', NULL, NULL, 'ORINA DE 24H', NULL, NULL, NULL),
    ('P0040', 'Marcadores Tumorales', 'PSA TOTAL Y LIBRE', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0041', 'Inmunología', 'RPR', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0042', 'Hematología', 'SATURACION DE TRANSFERRINA', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0043', 'Endocrinología', 'T4 LIBRE', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0044', 'Heces', 'TEST DE GRAHAM', NULL, NULL, 'LAMINA', NULL, NULL, NULL),
    ('P0045', 'Bioquímica', 'TGO / TGP', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0046', 'Heces', 'THEVENON', NULL, NULL, 'HECES', NULL, NULL, NULL),
    ('P0047', 'Hematología', 'TIEMPO DE COAGULACION Y SANGRIA', NULL, NULL, 'PLASMA CITRATADO', NULL, NULL, NULL),
    ('P0048', 'Hematología', 'TIEMPO DE PROTROMBINA E INR', NULL, NULL, 'PLASMA CITRATADO', NULL, NULL, NULL),
    ('P0049', 'Bioquímica', 'TRIGLICERIDOS', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0050', 'Endocrinología', 'TSH', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0051', 'Bioquímica', 'UREA Y CREATININA', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0052', 'Microbiología', 'UROCULTIVO', NULL, NULL, 'ORINA', NULL, NULL, NULL),
    ('P0053', 'Inmunología', 'VDRL', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0054', 'Inmunología', 'HIV PRUEBA RAPIDA', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0055', 'Bioquímica', 'VITAMINA B12', NULL, NULL, 'SUERO', NULL, NULL, NULL),
    ('P0056', 'Bioquímica', 'VITAMINA D', NULL, NULL, 'SUERO', NULL, NULL, NULL)
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
-- resultado (22 exámenes del catálogo). Los rangos son los de cada formato (frontend-sistema/app/
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
    ('E0202', 'brucellosis', 'BRUCELLOSIS', NULL, 'opcion', 'NEGATIVO,POSITIVO', 5, NULL, NULL, NULL, NULL),
    -- E0192 HEMOGRAMA COMPLETO y demás formatos nuevos (generado desde formatos/*.tsx)
    ('E0192', 'hematies', 'Hematíes', 'uL', 'numero', NULL, 1, NULL, '3,500,000 – 5,500,000', 3500000, 5500000),
    ('E0192', 'hemoglobina', 'Hemoglobina (Hb)', 'g/dL', 'numero', NULL, 2, NULL, '11.0 – 16.0', 11, 16),
    ('E0192', 'hematocrito', 'Hematocrito (Hto)', '%', 'numero', NULL, 3, NULL, '37.0 – 54.0', 37, 54),
    ('E0192', 'mcv', 'MCV', 'fL', 'numero', NULL, 4, NULL, '80.0 – 100.0', 80, 100),
    ('E0192', 'mch', 'MCH', 'pg', 'numero', NULL, 5, NULL, '27.0 – 34.0', 27, 34),
    ('E0192', 'mchc', 'MCHC', 'g/dL', 'numero', NULL, 6, NULL, '32.0 – 36.0', 32, 36),
    ('E0192', 'rdwCv', 'RDW-CV', '%', 'numero', NULL, 7, NULL, '11.0 – 16.0', 11, 16),
    ('E0192', 'rdwSd', 'RDW-SD', 'fL', 'numero', NULL, 8, NULL, '35.0 – 56.0', 35, 56),
    ('E0192', 'plaquetas', 'Plaquetas', 'uL', 'numero', NULL, 9, NULL, '150,000 – 450,000', 150000, 450000),
    ('E0192', 'mpv', 'MPV', 'fL', 'numero', NULL, 10, NULL, '6.5 – 12.0', 6.5, 12),
    ('E0192', 'pdw', 'PDW', 'fL', 'numero', NULL, 11, NULL, '9.0 – 17.0', 9, 17),
    ('E0192', 'pct', 'PCT', '%', 'numero', NULL, 12, NULL, '0.108 – 0.282', 0.108, 0.282),
    ('E0192', 'leucocitos', 'Leucocitos', 'uL', 'numero', NULL, 13, NULL, '4,000 – 10,000', 4000, 10000),
    ('E0192', 'neutrofilosAbs', 'Neutrófilos', 'uL', 'numero', NULL, 14, NULL, '2,000 – 7,000', 2000, 7000),
    ('E0192', 'linfocitosAbs', 'Linfocitos', 'uL', 'numero', NULL, 15, NULL, '800 – 4,000', 800, 4000),
    ('E0192', 'monocitosAbs', 'Monocitos', 'uL', 'numero', NULL, 16, NULL, '0 – 800', 0, 800),
    ('E0192', 'eosinofilosAbs', 'Eosinófilos', 'uL', 'numero', NULL, 17, NULL, '0 – 450', 0, 450),
    ('E0192', 'basofilosAbs', 'Basófilos', 'uL', 'numero', NULL, 18, NULL, '0 – 200', 0, 200),
    ('E0192', 'segmentados', 'Segmentados', '%', 'numero', NULL, 19, NULL, '40.0 – 70.0', 40, 70),
    ('E0192', 'abastonados', 'Abastonados', '%', 'numero', NULL, 20, NULL, '0.0', 0, 0),
    ('E0192', 'neutrofilosPct', 'Neutrófilos', '%', 'numero', NULL, 21, NULL, '40.0 – 75.0', 40, 75),
    ('E0192', 'linfocitosPct', 'Linfocitos', '%', 'numero', NULL, 22, NULL, '20.0 – 40.0', 20, 40),
    ('E0192', 'monocitosPct', 'Monocitos', '%', 'numero', NULL, 23, NULL, '2.0 – 11.0', 2, 11),
    ('E0192', 'eosinofilosPct', 'Eosinófilos', '%', 'numero', NULL, 24, NULL, '1.0 – 4.0', 1, 4),
    ('E0192', 'basofilosPct', 'Basófilos', '%', 'numero', NULL, 25, NULL, '0.0 – 2.0', 0, 2),
    ('E0204', 'tgo', 'TGO', 'U/L', 'numero', NULL, 1, NULL, '0.0 – 50.0', 0, 50),
    ('E0204', 'tgp', 'TGP', 'U/L', 'numero', NULL, 2, NULL, '0.0 – 45.0', 0, 45),
    ('E0204', 'bilirrubinaTotal', 'Bilirrubina Total', 'mg/dL', 'numero', NULL, 3, NULL, 'Hasta 1.20', NULL, 1.2),
    ('E0204', 'bilirrubinaDirecta', 'Bilirrubina Directa', 'mg/dL', 'numero', NULL, 4, NULL, 'Hasta 0.50', NULL, 0.5),
    ('E0204', 'bilirrubinaIndirecta', 'Bilirrubina Indirecta', 'mg/dL', 'numero', NULL, 5, NULL, 'Hasta 0.70', NULL, 0.7),
    ('E0204', 'fosfatasaAlcalina', 'Fosfatasa Alcalina', 'U/L', 'numero', NULL, 6, NULL, '53.0 – 128.0', 53, 128),
    ('E0204', 'proteinasTotales', 'Proteínas Totales', 'g/dL', 'numero', NULL, 7, NULL, '6.40 – 8.30', 6.4, 8.3),
    ('E0204', 'albumina', 'Albúmina', 'g/dL', 'numero', NULL, 8, NULL, '3.50 – 5.20', 3.5, 5.2),
    ('E0204', 'globulina', 'Globulina', 'g/dL', 'numero', NULL, 9, NULL, '2.20 – 3.50', 2.2, 3.5),
    ('E0492', 'tc', 'T. de Coagulación (TC)', 'min.', 'numero', NULL, 1, NULL, '5 – 8', 5, 8),
    ('E0492', 'ts', 'T. de Sangría (TS)', 'min.', 'numero', NULL, 2, NULL, '2 – 6', 2, 6),
    ('E0492', 'tp', 'T. de Protrombina (TP)', 'seg.', 'numero', NULL, 3, NULL, '12 – 14', 12, 14),
    ('E0492', 'ttpa', 'T. de Tromboplastina Activada (TTPA)', 'seg.', 'numero', NULL, 4, NULL, '25 – 45', 25, 45),
    ('E0492', 'fibrinogeno', 'Fibrinógeno', 'mg/dL', 'numero', NULL, 5, NULL, '180.0 – 350.0', 180, 350),
    ('E0492', 'inr', 'INR', NULL, 'numero', NULL, 6, NULL, '< 1.2', NULL, 1.2),
    ('E0180', 'glucosa', 'Glucosa', 'mg/dL', 'numero', NULL, 1, NULL, '70 – 110', 70, 110),
    ('E0183', 'urea', 'Urea', 'mg/dL', 'numero', NULL, 1, NULL, '10.0 – 50.0', 10, 50),
    ('E0200', 'pcr', 'Proteína C Reactiva', 'mg/L', 'numero', NULL, 1, NULL, '0.0 – 5.0', 0, 5),
    ('E0203', 'colesterol', 'Colesterol Total', 'mg/dL', 'numero', NULL, 1, NULL, 'Menor a 200.0', NULL, 200),
    ('E0203', 'trigliceridos', 'Triglicéridos', 'mg/dL', 'numero', NULL, 2, NULL, '70.0 – 150.0', 70, 150),
    ('E0203', 'hdl', 'Colesterol - HDL', 'mg/dL', 'numero', NULL, 3, NULL, '37.0 – 60.0', 37, 60),
    ('E0203', 'ldl', 'Colesterol - LDL', 'mg/dL', 'numero', NULL, 4, NULL, 'Menor a 120.0', NULL, 120),
    ('E0203', 'vldl', 'Colesterol - VLDL', 'mg/dL', 'numero', NULL, 5, NULL, NULL, NULL, NULL),
    ('E0220', 't4Libre', 'T4 Libre', 'ng/dL', 'numero', NULL, 1, NULL, '0.80 – 2.00', 0.8, 2),
    ('E0220', 'tsh', 'TSH', 'mlU/L', 'numero', NULL, 2, NULL, '0.27 – 4.20', 0.27, 4.2),
    ('E0199', 'hematocrito', 'Hematocrito (Hto)', '%', 'numero', NULL, 1, 'M', '36.0 – 48.0', 36, 48),
    ('E0199', 'hematocrito', 'Hematocrito (Hto)', '%', 'numero', NULL, 1, 'F', '36.0 – 45.0', 36, 45),
    ('E0199', 'hemoglobina', 'Hemoglobina (Hb)', 'g/dL', 'numero', NULL, 2, 'M', '12.0 – 16.0', 12, 16),
    ('E0199', 'hemoglobina', 'Hemoglobina (Hb)', 'g/dL', 'numero', NULL, 2, 'F', '12.0 – 15.0', 12, 15),
    ('E0233', 'grupo', 'Grupo Sanguíneo', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('E0233', 'factorRh', 'Factor RH', NULL, 'opcion', 'POSITIVO,NEGATIVO', 2, NULL, NULL, NULL, NULL),
    ('E0236', 'muestra1', '1° Muestra', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('E0235', 'muestra1', '1° Muestra', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('E0235', 'muestra2', '2° Muestra', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('E0235', 'muestra3', '3° Muestra', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('E0193', 'color', 'Color', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('E0193', 'aspecto', 'Aspecto', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('E0193', 'densidad', 'Densidad', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('E0193', 'ph', 'pH', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('E0193', 'glucosa', 'Glucosa', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('E0193', 'cetonas', 'Cetonas', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('E0193', 'urobilinas', 'Urobilinas', NULL, 'texto', NULL, 7, NULL, NULL, NULL, NULL),
    ('E0193', 'proteinas', 'Proteínas', NULL, 'texto', NULL, 8, NULL, NULL, NULL, NULL),
    ('E0193', 'bilirrubinas', 'Bilirrubinas', NULL, 'texto', NULL, 9, NULL, NULL, NULL, NULL),
    ('E0193', 'sangre', 'Sangre', NULL, 'texto', NULL, 10, NULL, NULL, NULL, NULL),
    ('E0193', 'nitritos', 'Nitritos', NULL, 'texto', NULL, 11, NULL, NULL, NULL, NULL),
    ('E0193', 'celulasEpiteliales', 'Células Epiteliales', NULL, 'texto', NULL, 12, NULL, NULL, NULL, NULL),
    ('E0193', 'leucocitos', 'Leucocitos', NULL, 'texto', NULL, 13, NULL, NULL, NULL, NULL),
    ('E0193', 'leucocitosAglutinados', 'Leucocitos Aglutinados', NULL, 'texto', NULL, 14, NULL, NULL, NULL, NULL),
    ('E0193', 'piocitos', 'Piocitos', NULL, 'texto', NULL, 15, NULL, NULL, NULL, NULL),
    ('E0193', 'cristales', 'Cristales', NULL, 'texto', NULL, 16, NULL, NULL, NULL, NULL),
    ('E0193', 'hematies', 'Hematíes', NULL, 'texto', NULL, 17, NULL, NULL, NULL, NULL),
    ('E0193', 'germenes', 'Gérmenes', NULL, 'texto', NULL, 18, NULL, NULL, NULL, NULL),
    ('E0193', 'levaduras', 'Levaduras', NULL, 'texto', NULL, 19, NULL, NULL, NULL, NULL),
    ('E0193', 'filamentosMucoides', 'Filamentos Mucoides', NULL, 'texto', NULL, 20, NULL, NULL, NULL, NULL),
    -- Formatos sin examen previo en el catálogo (códigos provisionales P####)
    ('P0001', 'antiCcp', 'ANTI-CCP (Péptido Cíclico Citrulinado)', 'UI/mL', 'numero', NULL, 1, NULL, 'Menos de 20: NEGATIVO
20 – 40: POSITIVO DÉBIL
40 – 60: POSITIVO MODERADO
Mayor de 60: POSITIVO FUERTE', NULL, NULL),
    ('P0003', 'muestra1', 'Examen B.K.', NULL, 'opcion', 'NO SE OBSERVAN B.A.A.R.,SE OBSERVA 1 A 9 B.A.A.R.,POSITIVO (+),POSITIVO (++),POSITIVO (+++)', 1, NULL, NULL, NULL, NULL),
    ('P0004', 'colesterol', 'Colesterol', 'mg/dL', 'numero', NULL, 1, NULL, 'Menor a 200', NULL, 200),
    ('P0004', 'trigliceridos', 'Triglicéridos', 'mg/dL', 'numero', NULL, 2, NULL, '70 – 150', 70, 150),
    ('P0005', 'gramPositivas', 'Bacterias Gram Positivas (+)', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0005', 'gramNegativas', 'Bacterias Gram Negativas (-)', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0006', 'consistencia', 'Consistencia', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0006', 'color', 'Color', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0006', 'sangre', 'Sangre', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0006', 'moco', 'Moco', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0006', 'restosAlimentos', 'Restos de Alimentos', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0006', 'ph', 'pH', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('P0006', 'almidon', 'Almidón', NULL, 'texto', NULL, 7, NULL, NULL, NULL, NULL),
    ('P0006', 'sudamIII', 'Sudam III', NULL, 'texto', NULL, 8, NULL, NULL, NULL, NULL),
    ('P0006', 'thevenon', 'Thevenon', NULL, 'texto', NULL, 9, NULL, NULL, NULL, NULL),
    ('P0006', 'sustanciasReductoras', 'Sustancias Reductoras', NULL, 'texto', NULL, 10, NULL, NULL, NULL, NULL),
    ('P0006', 'reaccionInflamatoria', 'Reacción Inflamatoria', NULL, 'texto', NULL, 11, NULL, NULL, NULL, NULL),
    ('P0006', 'parasitologico', 'Parasitológico', NULL, 'texto', NULL, 12, NULL, NULL, NULL, NULL),
    ('P0007', 'cortisol', 'Cortisol', 'μg/dL', 'numero', NULL, 1, NULL, '5.0 – 25.0', 5, 25),
    ('P0008', 'cortisol', 'Cortisol', 'μg/dL', 'numero', NULL, 1, NULL, '5.0 – 25.0', 5, 25),
    ('P0009', 'cultivoGramPositivo', 'Cultivo Gram +', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0009', 'cultivoGramNegativo', 'Cultivo Gram -', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0009', 'observacionGram', '°Gram / Observación', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0009', 'bacteriaAislada', 'Bacteria Aislada', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0009', 'sensible', 'Sensible', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0009', 'intermedio', 'Intermedio', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('P0009', 'resistente', 'Resistente', NULL, 'texto', NULL, 7, NULL, NULL, NULL, NULL),
    ('P0010', 'resultadoNegativo', 'Resultado Microbiológico', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0010', 'bacteriaAislada', 'Bacteria Aislada', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0010', 'recuentoColonias', 'Recuento de Colonias', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0010', 'sensible', 'Sensible', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0010', 'intermedio', 'Intermedio', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0010', 'resistente', 'Resistente', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('P0011', 'cultivoGramPositivo', 'Cultivo Gram +', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0011', 'cultivoGramNegativo', 'Cultivo Gram -', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0011', 'agar', 'Tipo de Agar', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0011', 'bacteriaAislada', 'Bacteria Aislada', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0011', 'recuentoColonias', 'Recuento de Colonias', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0011', 'sensible', 'Sensible', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('P0011', 'resistente', 'Resistente', NULL, 'texto', NULL, 7, NULL, NULL, NULL, NULL),
    ('P0012', 'sodio', 'Sodio (Na+)', 'mmol/L', 'numero', NULL, 1, NULL, '135.0 – 155.0', 135, 155),
    ('P0012', 'potasio', 'Potasio (K+)', 'mmol/L', 'numero', NULL, 2, NULL, '3.6 – 5.5', 3.6, 5.5),
    ('P0012', 'cloro', 'Cloro (Cl-)', 'mmol/L', 'numero', NULL, 3, NULL, '98.0 – 106.0', 98, 106),
    ('P0013', 'factorReumatoideo', 'Factor Reumatoideo', 'IU/ml', 'numero', NULL, 1, NULL, 'Menor a 15.0', NULL, 15),
    ('P0014', 'ferritina', 'Ferritina', 'ng/mL', 'numero', NULL, 1, NULL, '10 – 223.50', 10, 223.5),
    ('P0015', 'glucosa', 'Glucosa', 'mg/dL', 'numero', NULL, 1, NULL, '70 – 110', 70, 110),
    ('P0015', 'colesterol', 'Colesterol', 'mg/dL', 'numero', NULL, 2, NULL, 'Menor a 200', NULL, 200),
    ('P0015', 'trigliceridos', 'Triglicéridos', 'mg/dL', 'numero', NULL, 3, NULL, '70 – 150', 70, 150),
    ('P0016', 'hcg', 'HCG – Sub Unidad Beta', NULL, 'opcion', 'POSITIVO,NEGATIVO', 1, NULL, NULL, NULL, NULL),
    ('P0017', 'hcg', 'HCG – Sub Unidad Beta', 'mIU/ml', 'numero', NULL, 1, NULL, 'Hombres: 2.0
Mujeres no gestantes: ≤ 5.0
Mujeres post menopausia: ≤ 7.0', NULL, NULL),
    ('P0018', 'antigeno', 'Helicobacter Pylori Ag', NULL, 'opcion', 'POSITIVO,NEGATIVO', 1, NULL, NULL, NULL, NULL),
    ('P0019', 'igm', 'Anti – Helicobacter Pylori IgM', 'U/mL', 'numero', NULL, 1, NULL, 'Negativo: < 8.0
Indeterminado: 8.0 – 12.0
Positivo: > 12.0', NULL, NULL),
    ('P0020', 'hba1c', 'HbA1C', '%', 'numero', NULL, 1, NULL, 'No diabético: 4.7 – 6.5
Bien controlado: 7.5 – 8.9
Median. controlado: 9.0 – 10.0
Mal controlado: > 10.0', NULL, NULL),
    ('P0021', 'hbsag', 'Ag. Australiano HBSAg', NULL, 'opcion', 'POSITIVO,NEGATIVO', 1, NULL, NULL, NULL, NULL),
    ('P0022', 'igm', 'Anti – Herpes 1 IgM', NULL, 'opcion', 'POSITIVO,NEGATIVO', 1, NULL, NULL, NULL, NULL),
    ('P0022', 'igg', 'Anti – Herpes 1 IgG', NULL, 'opcion', 'POSITIVO,NEGATIVO', 2, NULL, NULL, NULL, NULL),
    ('P0023', 'hierro', 'Hierro Sérico', 'ug/mL', 'numero', NULL, 1, NULL, '37.0 – 145.0', 37, 145),
    ('P0024', 'hiv', 'Anti-HIV 1-2', 'DU', 'numero', NULL, 1, NULL, 'No reactivo: < 9
Indeterminado: 9 – 11
Reactivo: > 11', NULL, NULL),
    ('P0025', 'estradiol', 'Estradiol', 'pg/mL', 'numero', NULL, 1, NULL, 'Fase folicular: 12.5 – 166.0
Fase ovulatoria: 85.0 – 498.0
Fase luteal: 43.8 – 211.0
Menopausia: 5.0 – 54.7', NULL, NULL),
    ('P0025', 'fsh', 'FSH', 'mIU/mL', 'numero', NULL, 2, NULL, 'Fase folicular: 3.0 – 12.0
Mitad de ciclo: 8.0 – 22.0
Fase luteal: 2.0 – 12.0
Post menopaúsico: 35.0 – 150', NULL, NULL),
    ('P0025', 'lh', 'LH', 'mIU/mL', 'numero', NULL, 3, NULL, 'Fase folicular: 2.4 – 12.6
Fase ovulatoria: 14.0 – 96.0
Fase luteal: 1.0 – 11.4
Menopausia: 7.7 – 58.9', NULL, NULL),
    ('P0025', 'progesterona', 'Progesterona', 'ng/mL', 'numero', NULL, 4, NULL, 'Fase folicular: 0.2 – 1.5
Fase ovulatoria: 0.8 – 3.0
Fase luteal: 1.7 – 27.0
Menopausia: 0.1 – 0.8', NULL, NULL),
    ('P0025', 'prolactina', 'Prolactina', 'ng/mL', 'numero', NULL, 5, NULL, '1.2 – 22.0', 1.2, 22),
    ('P0026', 'ige', 'Inmunoglobulina E', 'U/mL', 'numero', NULL, 1, NULL, '< 100.0', NULL, 100),
    ('P0027', 'insulina', 'Insulina', 'uIU/mL', 'numero', NULL, 1, NULL, '5.0 – 25.0', 5, 25),
    ('P0028', 'lh', 'LH (Hormona Luteinizante)', 'mIU/mL', 'numero', NULL, 1, NULL, 'Fase folicular: 2.4 – 12.6
Fase ovulatoria: 14.0 – 96.0
Fase luteal: 1.0 – 11.4
Menopausia: 7.7 – 58.9', NULL, NULL),
    ('P0029', 'magnesio', 'Magnesio', 'mg/dL', 'numero', NULL, 1, NULL, '1.7 – 2.2', 1.7, 2.2),
    ('P0030', 'cea', 'Ag. Carcino Embrionaria (C.E.A)', 'ng/mL', 'numero', NULL, 1, NULL, '0.0 – 3.4', 0, 3.4),
    ('P0030', 'afp', 'Alfa Feto Proteína (A.F.P.)', 'ng/mL', 'numero', NULL, 2, NULL, '0.0 – 13.6', 0, 13.6),
    ('P0031', 'microalbuminuria', 'Microalbuminuria', 'Ug/min', 'numero', NULL, 1, NULL, '0.00 – 20.0', 0, 20),
    ('P0032', 'volumen', 'Volumen de Orina', 'mL', 'numero', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0032', 'microalbuminuria', 'Microalbuminuria de 24 Hrs.', 'mg/24hrs.', 'numero', NULL, 2, NULL, '30.0 – 300.0', 30, 300),
    ('P0033', 'macroscopica', 'Descripción Macroscópica', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0033', 'microscopica', 'Examen Microscópico', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0033', 'floraBacteriana', 'Flora bacteriana', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0033', 'metaplasia', 'Metaplasia escamosa', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0033', 'eritrocitos', 'Eritrocitos', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0034', 'hbsag', 'Ag. Australiano HBSAg', NULL, 'opcion', 'POSITIVO,NEGATIVO', 1, NULL, NULL, NULL, NULL),
    ('P0034', 'antiHcv', 'Anti – HCV', NULL, 'opcion', 'POSITIVO,NEGATIVO', 2, NULL, NULL, NULL, NULL),
    ('P0035', 'urea', 'Urea', 'mg/dL', 'numero', NULL, 1, NULL, '10.0 – 50.0', 10, 50),
    ('P0035', 'creatinina', 'Creatinina', 'mg/dL', 'numero', NULL, 2, NULL, '0.40 – 1.50', 0.4, 1.5),
    ('P0035', 'volumen24h', 'Volumen de Orina (24h)', 'mL', 'numero', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0035', 'proteinuria24h', 'Proteinuria de 24 Hrs.', 'mg/24hrs.', 'numero', NULL, 4, NULL, '0.0 – 150.0', 0, 150),
    ('P0035', 'depuracionCreatinina', 'Depuración de Creatinina', 'mL/min.', 'numero', NULL, 5, NULL, '71.0 – 151.0', 71, 151),
    ('P0036', 'tsh', 'TSH', 'ulU/mL', 'numero', NULL, 1, NULL, '0.27 – 4.20', 0.27, 4.2),
    ('P0036', 't3Libre', 'T3 LIBRE', 'pg/mL', 'numero', NULL, 2, NULL, '2.57 – 4.43', 2.57, 4.43),
    ('P0036', 't4Libre', 'T4 LIBRE', 'ng/dL', 'numero', NULL, 3, NULL, '0.80 – 2.00', 0.8, 2),
    ('P0037', 'vitaminaB12', 'Vitamina B12', 'pg/mL', 'numero', NULL, 1, NULL, '191.0 – 663.0', 191, 663),
    ('P0037', 'acidoFolico', 'Ácido Fólico', 'ng/mL', 'numero', NULL, 2, NULL, '3.10 – 17.50', 3.1, 17.5),
    ('P0037', 'ferritina', 'Ferritina', 'ng/mL', 'numero', NULL, 3, NULL, '10 – 223.50', 10, 223.5),
    ('P0037', 'transferrina', 'Transferrina', 'ng/mL', 'numero', NULL, 4, NULL, '150 – 400', 150, 400),
    ('P0038', 'proteinasTotales', 'Proteínas Totales', 'g/dL', 'numero', NULL, 1, NULL, '6.40 – 8.30', 6.4, 8.3),
    ('P0039', 'volumen', 'Volumen de Orina', 'mL', 'numero', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0039', 'proteinuria', 'Proteinuria de 24 Hrs.', 'mg/24hrs.', 'numero', NULL, 2, NULL, '0.0 – 150.0', 0, 150),
    ('P0040', 'psaTotal', 'PSA Total', 'ng/mL', 'numero', NULL, 1, NULL, '< 40 Años: 0.00 – 1.40
40 – 49 Años: 0.00 – 2.00
50 – 59 Años: 0.00 – 3.10
60 – 69 Años: 0.00 – 4.10
> 70 Años: 0.00 – 4.40', NULL, NULL),
    ('P0040', 'psaLibre', 'PSA Libre', 'ng/mL', 'numero', NULL, 2, NULL, '0.0 – 1.3', 0, 1.3),
    ('P0041', 'rpr', 'RPR (Reagina Plasmática Rápida)', NULL, 'opcion', 'NO REACTIVO,REACTIVO,REACTIVO 1/2 DIL,REACTIVO 1/4 DIL,REACTIVO 1/8 DIL,REACTIVO 1/16 DIL,REACTIVO 1/32 DIL', 1, NULL, NULL, NULL, NULL),
    ('P0042', 'transferrina', 'Transferrina', 'mg/dL', 'numero', NULL, 1, NULL, '200.0 – 360.0', 200, 360),
    ('P0042', 'saturacion', 'Saturación de Transferrina', '%', 'numero', NULL, 2, NULL, '15.0 – 100', 15, 100),
    ('P0043', 't4Libre', 'T4 LIBRE', 'ng/dL', 'numero', NULL, 1, NULL, '0.80 – 2.00', 0.8, 2),
    ('P0044', 'muestra1', '1° Muestra', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0045', 'tgo', 'TGO', 'U/L', 'numero', NULL, 1, NULL, '0.0 – 50.0', 0, 50),
    ('P0045', 'tgp', 'TGP', 'U/L', 'numero', NULL, 2, NULL, '0.0 – 45.0', 0, 45),
    ('P0046', 'muestra1', '1° Muestra', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, NULL, NULL, NULL),
    ('P0047', 'tc', 'T. de Coagulación (TC)', 'min.', 'numero', NULL, 1, NULL, '5 – 8', 5, 8),
    ('P0047', 'ts', 'T. de Sangría (TS)', 'min.', 'numero', NULL, 2, NULL, '2 – 9', 2, 9),
    ('P0048', 'tp', 'T. de Protrombina (TP)', 'seg.', 'numero', NULL, 1, NULL, '12 – 14', 12, 14),
    ('P0048', 'inr', 'INR', NULL, 'numero', NULL, 2, NULL, '0.95 – 1.35', 0.95, 1.35),
    ('P0049', 'trigliceridos', 'Triglicéridos', 'mg/dL', 'numero', NULL, 1, NULL, '70 – 150', 70, 150),
    ('P0050', 'tsh', 'TSH', 'ulU/mL', 'numero', NULL, 1, NULL, '0.27 – 4.20', 0.27, 4.2),
    ('P0051', 'urea', 'Urea', 'mg/dL', 'numero', NULL, 1, NULL, '10.0 – 50.0', 10, 50),
    ('P0051', 'creatinina', 'Creatinina', 'mg/dL', 'numero', NULL, 2, NULL, '0.40 – 1.50', 0.4, 1.5),
    ('P0052', 'gramPositivo', 'Cultivo Gram +', NULL, 'texto', NULL, 1, NULL, NULL, NULL, NULL),
    ('P0052', 'gramNegativo', 'Cultivo Gram -', NULL, 'texto', NULL, 2, NULL, NULL, NULL, NULL),
    ('P0052', 'bacteriaAislada', 'Bacteria Aislada', NULL, 'texto', NULL, 3, NULL, NULL, NULL, NULL),
    ('P0052', 'recuentoColonias', 'Recuento de Colonias', NULL, 'texto', NULL, 4, NULL, NULL, NULL, NULL),
    ('P0052', 'sensible', 'Sensible', NULL, 'texto', NULL, 5, NULL, NULL, NULL, NULL),
    ('P0052', 'intermedio', 'Intermedio', NULL, 'texto', NULL, 6, NULL, NULL, NULL, NULL),
    ('P0052', 'resistente', 'Resistente', NULL, 'texto', NULL, 7, NULL, NULL, NULL, NULL),
    ('P0053', 'vdrl', 'VDRL (Venereal Disease Research Laboratory)', NULL, 'opcion', 'NO REACTIVO,REACTIVO,REACTIVO 1/2 DIL,REACTIVO 1/4 DIL,REACTIVO 1/8 DIL,REACTIVO 1/16 DIL,REACTIVO 1/32 DIL', 1, NULL, NULL, NULL, NULL),
    ('P0054', 'hiv', 'HIV (Prueba Rápida)', NULL, 'opcion', 'NO REACTIVO,REACTIVO', 1, NULL, NULL, NULL, NULL),
    ('P0055', 'vitaminaB12', 'Vitamina B12', 'pg/mL', 'numero', NULL, 1, NULL, '191.0 – 663.0', 191, 663),
    ('P0056', 'vitaminaD', 'Vitamina D', 'ng/mL', 'numero', NULL, 1, NULL, 'Deficiencia: < 20
Insuficiencia: 20 – 29
Suficiencia: 30 – 100', NULL, NULL)
) AS v(codigo, clave, nombre, unidad, tipo, opciones, orden, sexo, ref_texto, ref_min, ref_max)
JOIN examenes_catalogo e ON e.examen_id = v.codigo
ON CONFLICT DO NOTHING;

COMMIT;