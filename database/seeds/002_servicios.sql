-- 002_servicios.sql
-- Servicios que ofrece el policlínico. El formulario de "Registrar Nueva Cita"
-- (frontend-sistema) busca el servicio por este nombre exacto; si no existe,
-- el backend rechaza la cita. Es idempotente: se puede ejecutar más de una vez.
--
-- Ejecutar:
--   psql -U postgres -d clinica -f database/seeds/002_servicios.sql

INSERT INTO public.servicios (nombre, tipo) VALUES
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
