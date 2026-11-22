BEGIN;

CREATE TABLE IF NOT EXISTS paquetes_laboratorio (
    paquete_id VARCHAR(60) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0)
);

CREATE TABLE IF NOT EXISTS paquetes_laboratorio_examenes (
    paquete_id VARCHAR(60) NOT NULL REFERENCES paquetes_laboratorio(paquete_id) ON DELETE CASCADE,
    examen_id VARCHAR(20) NOT NULL REFERENCES examenes_catalogo(examen_id) ON DELETE CASCADE,
    PRIMARY KEY (paquete_id, examen_id)
);

INSERT INTO paquetes_laboratorio (paquete_id, nombre, precio) VALUES
    ('perfil-lipidico', 'Perfil Lipídico', 120.00),
    ('perfil-hepatico', 'Perfil Hepático', 160.00),
    ('paquete-obstetrico', 'Paquete Obstétrico', 100.00),
    ('paquete-nino', 'Paquete Niño', 100.00),
    ('paquete-gastrico', 'Paquete Gástrico', 130.00),
    ('paquete-preventivo', 'Paquete Preventivo', 140.00)
ON CONFLICT (paquete_id) DO NOTHING;

WITH examenes_paquete(paquete_id, nombre_examen) AS (
    VALUES
        ('perfil-lipidico', 'Colesterol Total'),
        ('perfil-lipidico', 'Colesterol HDL'),
        ('perfil-lipidico', 'Colesterol LDL'),
        ('perfil-lipidico', 'Colesterol VLDL'),
        ('perfil-lipidico', 'Triglicéridos'),
        ('perfil-hepatico', 'Transaminasa Oxalacética (TGO)'),
        ('perfil-hepatico', 'Transaminasa Pirúvica (TGP)'),
        ('perfil-hepatico', 'Fosfatasa Alcalina'),
        ('perfil-hepatico', 'Proteínas Totales y Fraccionadas'),
        ('perfil-hepatico', 'Bilirrubinas'),
        ('paquete-obstetrico', 'Creatinina'),
        ('paquete-obstetrico', 'Urea'),
        ('paquete-obstetrico', 'Examen Completo de Orina'),
        ('paquete-nino', 'Parasitológico Simple'),
        ('paquete-nino', 'Examen Completo de Orina'),
        ('paquete-nino', 'Hemoglobina / Hematocrito'),
        ('paquete-preventivo', 'Hemograma Automatizado'),
        ('paquete-preventivo', 'Glucosa'),
        ('paquete-preventivo', 'Colesterol Total'),
        ('paquete-preventivo', 'Triglicéridos'),
        ('paquete-preventivo', 'Examen Completo de Orina')
)
INSERT INTO paquetes_laboratorio_examenes (paquete_id, examen_id)
SELECT p.paquete_id, e.examen_id
FROM examenes_paquete ep
JOIN paquetes_laboratorio p ON p.paquete_id = ep.paquete_id
JOIN examenes_catalogo e ON e.nombre = ep.nombre_examen
ON CONFLICT DO NOTHING;

INSERT INTO paquetes_laboratorio_examenes (paquete_id, examen_id)
SELECT 'paquete-gastrico', examen_id
FROM examenes_catalogo
WHERE nombre ILIKE '%helicobacter%pylori%'
ORDER BY CASE WHEN nombre ILIKE '%heces%' THEN 0 ELSE 1 END, nombre
LIMIT 1
ON CONFLICT DO NOTHING;

COMMIT;
