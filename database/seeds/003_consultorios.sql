-- 003_consultorios.sql
-- Las dos sedes del policlínico, para usarlas como consultorio en
-- Programación Médica. consultorios.nombre no tiene restricción única
-- (a diferencia de roles/servicios), así que cada INSERT se protege con
-- WHERE NOT EXISTS en vez de ON CONFLICT, para que sea seguro repetirlo.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/seeds/003_consultorios.sql

INSERT INTO public.consultorios (nombre, ubicacion)
SELECT 'Laboratorio Clínico', 'Jirón Real 424, Mala 15608'
WHERE NOT EXISTS (
    SELECT 1 FROM public.consultorios WHERE nombre = 'Laboratorio Clínico'
);

INSERT INTO public.consultorios (nombre, ubicacion)
SELECT 'Policlínico Chrisal', 'Pje. Pl. de Armas 00051, Mala 00051'
WHERE NOT EXISTS (
    SELECT 1 FROM public.consultorios WHERE nombre = 'Policlínico Chrisal'
);
