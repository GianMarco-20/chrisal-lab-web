-- =============================================================
-- MIGRACIÓN 005: Flujo completo de Laboratorio
-- Clínica Chrisal · v2.0
--
-- Nota: La tabla 'estados' fue eliminada en la migración 004.
-- Este script la crea desde cero con el diseño definitivo.
-- =============================================================

BEGIN;

-- 1. CREAR TABLA ESTADOS con ámbito desde el inicio
CREATE TABLE IF NOT EXISTS estados (
    id_estado   SERIAL PRIMARY KEY,
    estado      VARCHAR(50) NOT NULL,
    ambito      VARCHAR(15) NOT NULL CHECK (ambito IN ('consultorio', 'laboratorio')),
    CONSTRAINT estados_ambito_estado_key UNIQUE (ambito, estado)
);

-- 2. SEED DE ESTADOS
INSERT INTO estados (estado, ambito) VALUES
    ('Pendiente',          'consultorio'),
    ('Confirmada',         'consultorio'),
    ('Atendida',           'consultorio'),
    ('Ausente',            'consultorio'),
    ('Cancelada',          'consultorio'),
    ('En análisis',        'laboratorio'),
    ('Resultado parcial',  'laboratorio'),
    ('Resultado listo',    'laboratorio'),
    ('Anulada',            'laboratorio')
ON CONFLICT (ambito, estado) DO NOTHING;


-- 3. TABLA ORDENES_LABORATORIO
CREATE TABLE IF NOT EXISTS ordenes_laboratorio (
    orden_id                SERIAL PRIMARY KEY,
    historia_clinica        VARCHAR(15) NOT NULL REFERENCES pacientes(historia_clinica),
    id_estado               INTEGER NOT NULL REFERENCES estados(id_estado),
    fecha_muestra           TIMESTAMP NOT NULL DEFAULT NOW(),
    usuario_muestra_id      INTEGER NOT NULL REFERENCES usuarios(usuario_id),
    usuario_resultado_id    INTEGER REFERENCES usuarios(usuario_id),
    fecha_resultado         TIMESTAMP,
    motivo_anulacion        TEXT,
    usuario_anulacion_id    INTEGER REFERENCES usuarios(usuario_id),
    fecha_anulacion         TIMESTAMP,
    fecha_registro          TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_resultado_completo
        CHECK ((usuario_resultado_id IS NULL) = (fecha_resultado IS NULL)),
    CONSTRAINT chk_anulacion_completa
        CHECK (
            (usuario_anulacion_id IS NULL AND fecha_anulacion IS NULL AND motivo_anulacion IS NULL)
            OR
            (usuario_anulacion_id IS NOT NULL AND fecha_anulacion IS NOT NULL AND motivo_anulacion IS NOT NULL)
        )
);

CREATE INDEX IF NOT EXISTS idx_ordenes_historia_clinica ON ordenes_laboratorio (historia_clinica);
CREATE INDEX IF NOT EXISTS idx_ordenes_id_estado ON ordenes_laboratorio (id_estado);
CREATE INDEX IF NOT EXISTS idx_ordenes_fecha_muestra ON ordenes_laboratorio (fecha_muestra);


-- 4. TABLA ORDEN_EXAMENES
CREATE TABLE IF NOT EXISTS orden_examenes (
    orden_examen_id         SERIAL PRIMARY KEY,
    orden_id                INTEGER NOT NULL REFERENCES ordenes_laboratorio(orden_id) ON DELETE CASCADE,
    examen_id               INTEGER NOT NULL REFERENCES examenes_catalogo(examen_id),
    estado                  VARCHAR(20) NOT NULL DEFAULT 'pendiente'
                                CHECK (estado IN ('pendiente', 'con_resultado')),
    UNIQUE (orden_id, examen_id)
);

CREATE INDEX IF NOT EXISTS idx_orden_examenes_orden ON orden_examenes (orden_id);


-- 5. TABLA RESULTADOS_ORDEN
CREATE TABLE IF NOT EXISTS resultados_orden (
    resultado_id            SERIAL PRIMARY KEY,
    orden_examen_id         INTEGER NOT NULL UNIQUE REFERENCES orden_examenes(orden_examen_id),
    resultado_texto         TEXT NOT NULL,
    usuario_id              INTEGER NOT NULL REFERENCES usuarios(usuario_id),
    fecha_registro          TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resultados_orden_examen ON resultados_orden (orden_examen_id);

COMMIT;
