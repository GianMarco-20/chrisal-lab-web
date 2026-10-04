-- 004_categorias_y_examenes.sql
-- Catálogo de categorías y exámenes de laboratorio, según ficha física de
-- referencia del cliente (LABNOR). Es idempotente: se puede ejecutar más
-- de una vez sin duplicar nada.
--
-- categorias_examen.nombre no tiene restricción única (igual que
-- consultorios), así que el INSERT se protege con WHERE NOT EXISTS.
-- examenes_catalogo sí tiene UNIQUE (categoria_id, nombre), así que ahí se
-- usa ON CONFLICT DO NOTHING.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/seeds/004_categorias_y_examenes.sql

BEGIN;

-- =============================================================
-- Categorías principales
-- =============================================================

INSERT INTO categorias_examen (nombre)
SELECT v.nombre FROM (VALUES
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
    ('Otros')
) AS v(nombre)
WHERE NOT EXISTS (SELECT 1 FROM categorias_examen c WHERE c.nombre = v.nombre);

-- Subcategorías de "Exámenes Ecográficos"
INSERT INTO categorias_examen (nombre, categoria_padre_id)
SELECT v.nombre, (SELECT categoria_id FROM categorias_examen WHERE nombre = 'Exámenes Ecográficos')
FROM (VALUES
    ('Obstetricia'),
    ('Ginecológica o Pélvica'),
    ('Partes Blandas / MSK'),
    ('Abdominal Superior'),
    ('Vías Urinarias y Próstata')
) AS v(nombre)
WHERE NOT EXISTS (SELECT 1 FROM categorias_examen c WHERE c.nombre = v.nombre);

-- =============================================================
-- Catálogo de exámenes por categoría
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
WHERE nombre = 'Perfiles'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.2 Hematología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Ácido Fólico','Coagulación y Sangría','Constantes Corpusculares','Ferritina',
    'Fibrinógeno','Gota Gruesa','Hemoglobina / Hematocrito','Hemograma Automatizado',
    'Hierro Sérico y Transferrina','Plaquetas','Reticulocitos','Tiempo de Protrombina',
    'Tiempo de Tromboplastina','Velocidad de Sedimentación','Vitamina B12'
]) AS examen
WHERE nombre = 'Hematología'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

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
WHERE nombre = 'Bioquímica'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.4 Endocrinología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Cortisol A.M.','Cortisol P.M.','DHEA-S','Estradiol','Estriol','FSH',
    'Hormona de Crecimiento','Insulina','LH','Progesterona','Prolactina','Testosterona',
    'Tiroxina (T4)','Triyodotironina (T3)','TSH','TSH Ultrasensible','T3 Libre','T4 Libre'
]) AS examen
WHERE nombre = 'Endocrinología'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.5 Microbiología
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'BK Directo','Frotis Directo (gérmenes)','Frotis (hongos)','Coprocultivo',
    'Cultivo de Secreción Conjuntival','Cultivo de Secreción Vaginal','Hemocultivo',
    'Urocultivo','Secreción Faríngea','Otros'
]) AS examen
WHERE nombre = 'Microbiología'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.6 Heces
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Parasitológico Especial','Parasitológico Simple','Parasitológico Seriado (x3)',
    'Leucocitos en Heces (reacción inflamatoria)','Test de Graham (Oxiuros)',
    'Thevenon','Coprológico Funcional'
]) AS examen
WHERE nombre = 'Heces'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

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
WHERE nombre = 'Inmunología'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.8 Marcadores Tumorales
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Albuminuria / Proteinuria 24h','AFP (cáncer de hígado)','CEA (cáncer de pulmón y colon)',
    'Calcitonina','CA 19-9 (cáncer de páncreas)','CA 15-3 (cáncer de mama)',
    'CA 549 (cáncer de ovario)','CA 72-4 (cáncer de estómago)','Beta-2 Microglobulina',
    'PSA (antígeno prostático)','PSA Libre','PSA Índice'
]) AS examen
WHERE nombre = 'Marcadores Tumorales'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.9 Anatomía Patológica
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Papanicolaou','Biopsia','Biopsia Quirúrgica (con pieza operatoria)'
]) AS examen
WHERE nombre = 'Anatomía Patológica'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.10 Orina
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Ácido Úrico en orina 24h','Bence Jones','Calcio en orina 24h','Creatinina en orina',
    'Examen Completo de Orina','Electrolitos en orina','5-OH-Indolacético',
    'Osmolaridad Urinaria'
]) AS examen
WHERE nombre = 'Orina'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.11 Exámenes Ecográficos (por subcategoría)
INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Edad Gestacional','Actividad Cardiaca Fetal','Ubicación Placentaria',
    'Líquido Amniótico','Perfil Biofísico','Embarazo Ectópico','Embarazo Molar',
    'Sexo Fetal','Amenaza de Aborto','Placenta Previa'
]) AS examen
WHERE nombre = 'Obstetricia'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Útero','Ovario','Diagnóstico de Embarazo Precoz','Poliquistosis Ovárica',
    'Localizar DIU','Miomas','Quistes'
]) AS examen
WHERE nombre = 'Ginecológica o Pélvica'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Mamas','Tiroides','Lipomas','Hernias / Eventraciones','Hombro / Rodilla / Tobillo',
    'Testículos'
]) AS examen
WHERE nombre = 'Partes Blandas / MSK'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Hígado','Vesícula Biliar y Vías Biliares','Páncreas y Retroperitoneo','Bazo'
]) AS examen
WHERE nombre = 'Abdominal Superior'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

INSERT INTO examenes_catalogo (categoria_id, nombre)
SELECT categoria_id, examen FROM categorias_examen,
UNNEST(ARRAY[
    'Riñones y Vejiga','Próstata y Vejiga'
]) AS examen
WHERE nombre = 'Vías Urinarias y Próstata'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- A.12 Otros: categoría abierta, sin ítems predefinidos (pendiente de confirmar, ver documento de requerimientos)

COMMIT;
