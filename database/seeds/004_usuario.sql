INSERT INTO usuarios (nombre_usuario, password_hash, nombres, apellidos, rol_id)
SELECT 'admin', crypt('admin', gen_salt('bf', 10)), 'Administrador', 'Sistema', rol_id
FROM roles WHERE nombre = 'admin'
UNION ALL
SELECT 'recepcion', crypt('recepcion', gen_salt('bf', 10)), 'Recepción', 'Sistema', rol_id
FROM roles WHERE nombre = 'recepcion'
UNION ALL
SELECT 'medico', crypt('medico', gen_salt('bf', 10)), 'Médico', 'Sistema', rol_id
FROM roles WHERE nombre = 'medico'
UNION ALL
SELECT 'laboratorio', crypt('laboratorio', gen_salt('bf', 10)), 'Laboratorio', 'Sistema', rol_id
FROM roles WHERE nombre = 'laboratorio'
ON CONFLICT (nombre_usuario) DO NOTHING;