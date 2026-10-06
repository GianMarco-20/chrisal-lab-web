-- =============================================================
-- SEED: Estados de una cita
-- Correr DESPUES del schema.sql (requiere que la tabla 'estados' exista)
-- =============================================================

INSERT INTO estados (estado) VALUES
    ('Pendiente'),
    ('Confirmada'),
    ('Atendida'),
    ('Ausente'),
    ('Eliminado');