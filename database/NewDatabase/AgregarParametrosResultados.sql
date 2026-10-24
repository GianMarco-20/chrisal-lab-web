-- AgregarParametrosResultados.sql
-- Crea las tablas examen_parametros y resultado_valores y carga los campos y
-- valores de referencia de los exámenes con formato. Solo hace falta en una
-- base ya creada; New.sql y NewSeed.sql ya lo incluyen.
-- Es idempotente: se puede ejecutar más de una vez.
--
-- Ejecutar (PowerShell):
--   $env:PGCLIENTENCODING = "UTF8"
--   psql -U postgres -d clinica -f database/NewDatabase/AgregarParametrosResultados.sql

BEGIN;

SET client_encoding = 'UTF8';

-- Campos (parámetros) de cada examen: nombre, unidad, tipo y valores de
-- referencia. Una fila por campo; si el rango cambia por sexo o por edad se
-- repite la fila con ese sexo / rango de edad. La 'clave' es la que usa el
-- formato de resultado del frontend (ej. 'bilirrubinaDirecta').
CREATE TABLE IF NOT EXISTS examen_parametros (
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
CREATE UNIQUE INDEX IF NOT EXISTS ux_examen_parametros
    ON examen_parametros (examen_id, clave, COALESCE(sexo, ''), COALESCE(edad_min, -1));
CREATE INDEX IF NOT EXISTS idx_examen_parametros_examen ON examen_parametros(examen_id);

-- Valores registrados en cada resultado, uno por campo. resultados_orden sigue
-- siendo el contenedor (quién y cuándo); resultado_texto conserva el JSON del
-- formato y esta tabla lo guarda desglosado para poder consultarlo.
CREATE TABLE IF NOT EXISTS resultado_valores (
    valor_id SERIAL PRIMARY KEY,
    resultado_id INTEGER NOT NULL REFERENCES resultados_orden(resultado_id) ON DELETE CASCADE,
    clave VARCHAR(50) NOT NULL,
    valor_texto VARCHAR(200) NOT NULL,
    valor_numero NUMERIC(14, 4),                 -- NULL si el valor no es un número
    UNIQUE (resultado_id, clave)
);

-- Los valores de referencia largos (por fase, edad o condición) usan varias líneas.
ALTER TABLE examen_parametros ALTER COLUMN ref_texto TYPE VARCHAR(400);

-- Permite cambiar el código de un examen (p. ej. de P0001 al oficial E####) y que
-- se actualice solo en precios, campos, órdenes y citas.
DO $$
DECLARE r record;
BEGIN
    FOR r IN
        SELECT c.conrelid::regclass AS tabla, c.conname, pg_get_constraintdef(c.oid) AS def
        FROM pg_constraint c
        WHERE c.contype = 'f' AND c.confrelid = 'examenes_catalogo'::regclass AND c.confupdtype <> 'c'
    LOOP
        EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %I', r.tabla, r.conname);
        EXECUTE format('ALTER TABLE %s ADD CONSTRAINT %I %s ON UPDATE CASCADE', r.tabla, r.conname, r.def);
    END LOOP;
END $$;

-- Exámenes de los formatos que no estaban en el catálogo. Código provisional P####
-- y sin precios. Para poner el código oficial:
--   UPDATE examenes_catalogo SET examen_id = 'E0500' WHERE examen_id = 'P0001';
INSERT INTO examenes_catalogo (examen_id, categoria_id, nombre)
SELECT v.codigo, c.categoria_id, v.nombre
FROM (VALUES
    ('P0001', 'Inmunología', 'ANTI-CCP'),
    ('P0002', 'Anatomía Patológica', 'BIOPSIA QUIRURGICA (CON PIEZA OPERATORIA)'),
    ('P0003', 'Microbiología', 'BK DIRECTO'),
    ('P0004', 'Bioquímica', 'COLESTEROL Y TRIGLICERIDOS'),
    ('P0005', 'Microbiología', 'COPROCULTIVO'),
    ('P0006', 'Heces', 'COPROLOGICO FUNCIONAL'),
    ('P0007', 'Endocrinología', 'CORTISOL A.M.'),
    ('P0008', 'Endocrinología', 'CORTISOL P.M.'),
    ('P0009', 'Microbiología', 'CULTIVO DE SECRECION FARINGEA'),
    ('P0010', 'Microbiología', 'CULTIVO DE SECRECION OTIDICA'),
    ('P0011', 'Microbiología', 'CULTIVO DE SECRECION VAGINAL'),
    ('P0012', 'Bioquímica', 'ELECTROLITOS SERICOS'),
    ('P0013', 'Inmunología', 'FACTOR REUMATOIDEO (FR)'),
    ('P0014', 'Hematología', 'FERRITINA'),
    ('P0015', 'Bioquímica', 'GLUCOSA, COLESTEROL Y TRIGLICERIDOS'),
    ('P0016', 'Inmunología', 'HCG CUALITATIVO'),
    ('P0017', 'Inmunología', 'HCG CUANTITATIVO'),
    ('P0018', 'Heces', 'HELICOBACTER PYLORI EN HECES (ANTIGENO)'),
    ('P0019', 'Inmunología', 'HELICOBACTER PYLORI EN SANGRE (IGM)'),
    ('P0020', 'Bioquímica', 'HEMOGLOBINA GLICOSILADA (HBA1C)'),
    ('P0021', 'Inmunología', 'HEPATITIS B (HBSAG)'),
    ('P0022', 'Inmunología', 'HERPES 1 (IGM / IGG)'),
    ('P0023', 'Hematología', 'HIERRO SERICO'),
    ('P0024', 'Inmunología', 'HIV ELISA'),
    ('P0025', 'Endocrinología', 'HORMONAS FEMENINAS (ESTRADIOL, FSH, LH, PROGESTERONA, PROLACTINA)'),
    ('P0026', 'Inmunología', 'INMUNOGLOBULINA E'),
    ('P0027', 'Endocrinología', 'INSULINA BASAL'),
    ('P0028', 'Endocrinología', 'LH (HORMONA LUTEINIZANTE)'),
    ('P0029', 'Bioquímica', 'MAGNESIO'),
    ('P0030', 'Marcadores Tumorales', 'MARCADORES TUMORALES (CEA, AFP)'),
    ('P0031', 'Orina', 'MICROALBUMINURIA'),
    ('P0032', 'Orina', 'MICROALBUMINURIA 24 HORAS'),
    ('P0033', 'Anatomía Patológica', 'PAPANICOLAOU'),
    ('P0034', 'Perfiles', 'PERFIL DE HEPATITIS (HBSAG, ANTI-HCV)'),
    ('P0035', 'Perfiles', 'PERFIL RENAL'),
    ('P0036', 'Perfiles', 'PERFIL TIROIDEO (TSH, T3 LIBRE, T4 LIBRE)'),
    ('P0037', 'Perfiles', 'PERFIL DE ANEMIA (VITAMINA B12, ACIDO FOLICO, FERRITINA, TRANSFERRINA)'),
    ('P0038', 'Bioquímica', 'PROTEINAS TOTALES'),
    ('P0039', 'Orina', 'PROTEINURIA 24 HORAS'),
    ('P0040', 'Marcadores Tumorales', 'PSA TOTAL Y LIBRE'),
    ('P0041', 'Inmunología', 'RPR'),
    ('P0042', 'Hematología', 'SATURACION DE TRANSFERRINA'),
    ('P0043', 'Endocrinología', 'T4 LIBRE'),
    ('P0044', 'Heces', 'TEST DE GRAHAM'),
    ('P0045', 'Bioquímica', 'TGO / TGP'),
    ('P0046', 'Heces', 'THEVENON'),
    ('P0047', 'Hematología', 'TIEMPO DE COAGULACION Y SANGRIA'),
    ('P0048', 'Hematología', 'TIEMPO DE PROTROMBINA E INR'),
    ('P0049', 'Bioquímica', 'TRIGLICERIDOS'),
    ('P0050', 'Endocrinología', 'TSH'),
    ('P0051', 'Bioquímica', 'UREA Y CREATININA'),
    ('P0052', 'Microbiología', 'UROCULTIVO'),
    ('P0053', 'Inmunología', 'VDRL'),
    ('P0054', 'Inmunología', 'HIV PRUEBA RAPIDA'),
    ('P0055', 'Bioquímica', 'VITAMINA B12'),
    ('P0056', 'Bioquímica', 'VITAMINA D')
) AS v(codigo, categoria, nombre)
JOIN categorias_examen c ON c.nombre = v.categoria
ON CONFLICT DO NOTHING;

INSERT INTO examen_detalles (examen_id, muestra)
SELECT v.codigo, v.muestra
FROM (VALUES
    ('P0001', 'SUERO'),
    ('P0002', NULL),
    ('P0003', 'ESPUTO'),
    ('P0004', 'SUERO'),
    ('P0005', 'HECES'),
    ('P0006', 'HECES'),
    ('P0007', 'SUERO'),
    ('P0008', 'SUERO'),
    ('P0009', 'SECRECIÓN FARÍNGEA'),
    ('P0010', 'SECRECIÓN OTÍDICA'),
    ('P0011', 'SECRECIÓN VAGINAL'),
    ('P0012', 'SUERO'),
    ('P0013', 'SUERO'),
    ('P0014', 'SUERO'),
    ('P0015', 'SUERO'),
    ('P0016', 'SUERO'),
    ('P0017', 'SUERO'),
    ('P0018', 'HECES'),
    ('P0019', 'SUERO'),
    ('P0020', 'SANGRE TOTAL'),
    ('P0021', 'SUERO'),
    ('P0022', 'SUERO'),
    ('P0023', 'SUERO'),
    ('P0024', 'SUERO'),
    ('P0025', 'SUERO'),
    ('P0026', 'SUERO'),
    ('P0027', 'SUERO'),
    ('P0028', 'SUERO'),
    ('P0029', 'SUERO'),
    ('P0030', 'SUERO'),
    ('P0031', 'ORINA'),
    ('P0032', 'ORINA DE 24H'),
    ('P0033', NULL),
    ('P0034', 'SUERO'),
    ('P0035', 'SUERO Y ORINA DE 24H'),
    ('P0036', 'SUERO'),
    ('P0037', 'SUERO'),
    ('P0038', 'SUERO'),
    ('P0039', 'ORINA DE 24H'),
    ('P0040', 'SUERO'),
    ('P0041', 'SUERO'),
    ('P0042', 'SUERO'),
    ('P0043', 'SUERO'),
    ('P0044', 'LAMINA'),
    ('P0045', 'SUERO'),
    ('P0046', 'HECES'),
    ('P0047', 'PLASMA CITRATADO'),
    ('P0048', 'PLASMA CITRATADO'),
    ('P0049', 'SUERO'),
    ('P0050', 'SUERO'),
    ('P0051', 'SUERO'),
    ('P0052', 'ORINA'),
    ('P0053', 'SUERO'),
    ('P0054', 'SUERO'),
    ('P0055', 'SUERO'),
    ('P0056', 'SUERO')
) AS v(codigo, muestra)
JOIN examenes_catalogo e ON e.examen_id = v.codigo
ON CONFLICT (examen_id) DO NOTHING;

-- Campos y valores de referencia de los exámenes que ya tienen formato de
-- resultado (todos los formatos del frontend). Los rangos son los de cada formato (frontend-sistema/app/
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

-- Convierte los resultados que ya estaban guardados (solo como JSON en
-- resultados_orden.resultado_texto) a filas de resultado_valores, para los
-- campos definidos arriba. No toca los resultados que ya tienen valores ni los
-- de texto libre. Requiere PostgreSQL 16 o superior (pg_input_is_valid).
INSERT INTO resultado_valores (resultado_id, clave, valor_texto, valor_numero)
SELECT r.resultado_id,
       j.key,
       btrim(j.value),
       CASE WHEN btrim(replace(j.value, ',', '.')) ~ '^-?[0-9]+(\.[0-9]+)?$'
            THEN btrim(replace(j.value, ',', '.'))::numeric END
FROM resultados_orden r
JOIN orden_examenes oe ON oe.orden_examen_id = r.orden_examen_id
CROSS JOIN LATERAL jsonb_each_text(
    CASE WHEN pg_input_is_valid(r.resultado_texto, 'jsonb') THEN
        CASE WHEN jsonb_typeof(r.resultado_texto::jsonb) = 'object' THEN r.resultado_texto::jsonb END
    END
) AS j(key, value)
WHERE btrim(j.value) <> ''
  AND EXISTS (SELECT 1 FROM examen_parametros p WHERE p.examen_id = oe.examen_id AND p.clave = j.key)
  AND NOT EXISTS (SELECT 1 FROM resultado_valores v WHERE v.resultado_id = r.resultado_id)
ON CONFLICT (resultado_id, clave) DO NOTHING;

COMMIT;
