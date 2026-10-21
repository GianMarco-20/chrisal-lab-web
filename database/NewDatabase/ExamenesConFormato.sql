-- ExamenesConFormato.sql
-- Agrega al catálogo los exámenes que ya tienen formato de resultado en el
-- frontend (frontend-sistema/app/laboratorio/formatos) y no estaban en el
-- catálogo. Es idempotente: se puede ejecutar más de una vez.
--
-- Amilasa y Lipasa, y Colesterol y Triglicéridos son UN solo examen: el
-- formato (masculino o femenino) se elige según el sexo del paciente.
--
-- Solo hace falta en una base ya creada; NewSeed.sql ya incluye estos cambios.
--
-- Ejecutar (PowerShell):
--   $env:PGCLIENTENCODING = "UTF8"
--   psql -U postgres -d clinica -f database/NewDatabase/ExamenesConFormato.sql

BEGIN;

SET client_encoding = 'UTF8';

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT c.categoria_id, v.examen
FROM (VALUES
    ('Bioquímica',  'Ácidos Biliares'),
    ('Bioquímica',  'Amilasa y Lipasa'),
    ('Bioquímica',  'Calcio Sérico'),
    ('Bioquímica',  'Colesterol y Triglicéridos'),
    ('Inmunología', 'Anti-CCP')
) AS v(categoria, examen)
JOIN categorias_examen c ON c.nombre = v.categoria
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Retira el examen "Hígado" (ya no se ofrece). Solo si ninguna orden ni cita lo
-- ha usado: si alguien lo tiene registrado, no se toca y hay que revisarlo a mano.
DELETE FROM examenes_catalogo e
WHERE e.nombre = 'Hígado'
  AND NOT EXISTS (SELECT 1 FROM orden_examenes oe WHERE oe.examen_id = e.examen_id)
  AND NOT EXISTS (SELECT 1 FROM cita_examenes ce WHERE ce.examen_id = e.examen_id);

COMMIT;
