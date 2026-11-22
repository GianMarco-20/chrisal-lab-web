-- 009_parametros_nuevos_formatos.sql
-- Campos (unidad y valor de referencia) de los exámenes que ahora tienen formato
-- de resultado. Sin estas filas el informe impreso muestra una sola línea con el
-- nombre del examen; con ellas muestra cada campo con su unidad y referencia.
-- Los valores de referencia son los que muestra cada formato en pantalla.
-- Idempotente: se puede ejecutar más de una vez.
--
--   psql -U postgres -d clinica -f database/migrations/009_parametros_nuevos_formatos.sql

BEGIN;

SET client_encoding = 'UTF8';

WITH p (examen, clave, nombre, unidad, tipo, opciones, orden, sexo, ref_texto) AS (
  VALUES
  ('ACIDO FOLICO SERICO', 'acidoFolico', 'Ácido fólico sérico', 'ng/mL', 'numero', NULL, 1, NULL, '3.1 – 17.5'),
  ('ACIDO URICO EN ORINA 24hr', 'volumen24h', 'Volumen de orina 24 h', 'mL/24 h', 'numero', NULL, 1, NULL, '800 – 2000'),
  ('ACIDO URICO EN ORINA 24hr', 'acidoUricoMgDl', 'Ácido úrico', 'mg/dL', 'numero', NULL, 2, NULL, NULL),
  ('ACIDO URICO EN ORINA 24hr', 'acidoUrico24h', 'Ácido úrico en 24 h', 'mg/24 h', 'numero', NULL, 3, NULL, '250 – 750'),
  ('ALBUMINA', 'albumina', 'Albúmina', 'g/dL', 'numero', NULL, 1, NULL, '3.5 – 5.2'),
  ('ALFAFETOPROTEINA (AFP)', 'afp', 'Alfafetoproteína (AFP)', 'ng/mL', 'numero', NULL, 1, NULL, 'Menor a 10'),
  ('AMILASA EN ORINA 24hr', 'volumen24h', 'Volumen de orina 24 h', 'mL/24 h', 'numero', NULL, 1, NULL, '800 – 2000'),
  ('AMILASA EN ORINA 24hr', 'amilasaOrinaUl', 'Amilasa en orina', 'U/L', 'numero', NULL, 2, NULL, NULL),
  ('AMILASA EN ORINA 24hr', 'amilasa24h', 'Amilasa en 24 h', 'U/24 h', 'numero', NULL, 3, NULL, '16 – 491'),
  ('ANTI NUCLEARES (ANA METODO IFI)', 'ana', 'ANA (IFI)', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo'),
  ('ANTI NUCLEARES (ANA METODO IFI)', 'titulo', 'Título', NULL, 'texto', NULL, 2, NULL, NULL),
  ('ANTI NUCLEARES (ANA METODO IFI)', 'patron', 'Patrón', NULL, 'texto', NULL, 3, NULL, NULL),
  ('ANTIGENO CARCINOEMBRIONARIO (CEA)', 'cea', 'CEA', 'ng/mL', 'numero', NULL, 1, NULL, 'No fumadores: menor a 3.0' || chr(10) || 'Fumadores: menor a 5.0'),
  ('ANTIESTREPTOLISINA (ASO) LATEX', 'cualitativo', 'ASO látex (cualitativo)', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo'),
  ('ANTIESTREPTOLISINA (ASO) LATEX', 'semicuantitativo', 'ASO látex (semicuantitativo)', 'UI/mL', 'numero', NULL, 2, NULL, 'Menor a 200'),
  ('BENZODIACEPINA', 'benzodiacepinas', 'Benzodiacepinas', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo (punto de corte: 300 ng/mL)'),
  ('Ca-125 (ovarios)', 'ca125', 'CA 125', 'U/mL', 'numero', NULL, 1, NULL, 'Menor a 35'),
  ('Ca-15.3 (mama)', 'ca153', 'CA 15.3', 'U/mL', 'numero', NULL, 1, NULL, 'Menor a 30'),
  ('Ca-19.9 (colon, pancreas)', 'ca199', 'CA 19.9', 'U/mL', 'numero', NULL, 1, NULL, 'Menor a 37'),
  ('Ca-72.4 (estomago)', 'ca724', 'CA 72.4', 'U/mL', 'numero', NULL, 1, NULL, 'Menor a 6.9'),
  ('COLESTEROL HDL', 'colesterolHdl', 'Colesterol HDL', 'mg/dL', 'numero', NULL, 1, 'M', 'Mayor a 40'),
  ('COLESTEROL HDL', 'colesterolHdl', 'Colesterol HDL', 'mg/dL', 'numero', NULL, 1, 'F', 'Mayor a 50'),
  ('COLESTEROL VLDL', 'colesterolVldl', 'Colesterol VLDL', 'mg/dL', 'numero', NULL, 1, NULL, '2 – 30'),
  ('DOSAJE DE COCAINA', 'cocaina', 'Cocaína', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo (punto de corte: 300 ng/mL)'),
  ('DOSAJE DE MARIHUANA', 'marihuana', 'Marihuana (THC)', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo (punto de corte: 50 ng/mL)'),
  ('17-OH PROGESTERONA', 'ohProgesterona17', '17-OH Progesterona', 'ng/mL', 'numero', NULL, 1, 'M', 'Adultos: 0.5 – 2.1'),
  ('17-OH PROGESTERONA', 'ohProgesterona17', '17-OH Progesterona', 'ng/mL', 'numero', NULL, 1, 'F', 'Fase folicular: 0.2 – 1.0' || chr(10) || 'Fase lútea: 0.5 – 2.8'),
  ('VELOCIDAD DE SEDIMENTACIÓN GLOBULAR (VSG)', 'vsg', 'VSG – 1.ª hora (Westergren)', 'mm/h', 'numero', NULL, 1, 'M', '0 – 15'),
  ('VELOCIDAD DE SEDIMENTACIÓN GLOBULAR (VSG)', 'vsg', 'VSG – 1.ª hora (Westergren)', 'mm/h', 'numero', NULL, 1, 'F', '0 – 20'),
  ('PERFIL DE DROGAS DE ABUSO', 'cocaina', 'Cocaína', NULL, 'opcion', 'NEGATIVO,POSITIVO', 1, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'marihuana', 'Marihuana (THC)', NULL, 'opcion', 'NEGATIVO,POSITIVO', 2, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'benzodiacepinas', 'Benzodiacepinas', NULL, 'opcion', 'NEGATIVO,POSITIVO', 3, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'anfetaminas', 'Anfetaminas', NULL, 'opcion', 'NEGATIVO,POSITIVO', 4, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'metanfetamina', 'Metanfetamina', NULL, 'opcion', 'NEGATIVO,POSITIVO', 5, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'extasis', 'Éxtasis (MDMA)', NULL, 'opcion', 'NEGATIVO,POSITIVO', 6, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'opiaceos', 'Opiáceos', NULL, 'opcion', 'NEGATIVO,POSITIVO', 7, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'barbituricos', 'Barbitúricos', NULL, 'opcion', 'NEGATIVO,POSITIVO', 8, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'metadona', 'Metadona', NULL, 'opcion', 'NEGATIVO,POSITIVO', 9, NULL, 'Negativo'),
  ('PERFIL DE DROGAS DE ABUSO', 'antidepresivosTriciclicos', 'Antidepresivos tricíclicos', NULL, 'opcion', 'NEGATIVO,POSITIVO', 10, NULL, 'Negativo')
)
INSERT INTO examen_parametros (examen_id, clave, nombre, unidad, tipo, opciones, orden, sexo, ref_texto)
SELECT c.examen_id, p.clave, p.nombre, p.unidad, p.tipo, p.opciones, p.orden::smallint, p.sexo, p.ref_texto
FROM p
JOIN examenes_catalogo c ON c.nombre = p.examen
ON CONFLICT (examen_id, clave, COALESCE(sexo, ''), COALESCE(edad_min, -1)) DO NOTHING;

COMMIT;
