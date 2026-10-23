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
