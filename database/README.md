# database

Scripts SQL de la base de datos PostgreSQL `clinica` del Policlínico Chrisal-Lab.

```
database/
├── schema/       foto del esquema base (pg_dump --schema-only)
├── migrations/   cambios de estructura, numerados y en orden
└── seeds/        datos iniciales necesarios para que el sistema funcione
```

## Reglas

- Cada cambio de estructura es un archivo nuevo en `migrations/`, con el siguiente número
  (`002_...`, `003_...`). Una migración ya aplicada no se edita: si hay un error, se corrige con otra.
- Las migraciones se ejecutan en orden numérico.
- Los seeds no contienen contraseñas ni hashes reales.
- Antes de una migración que borra datos o columnas, haz un respaldo:
  `pg_dump -U postgres -d clinica -F c -f clinica_respaldo.dump`

## Cómo dejar la base al día en una PC nueva

1. Crea la base vacía `clinica` en tu Postgres (con pgAdmin o `createdb`).
2. Carga el esquema base (las tablas tal como estaban al iniciar el proyecto):
   ```
   psql -U postgres -d clinica -f database/schema/00_clinica_base.sql
   ```
3. Aplica las migraciones, **en orden**:
   ```
   psql -U postgres -d clinica -f database/migrations/001_crear_tabla_roles.sql
   psql -U postgres -d clinica -f database/migrations/002_historia_clinica_secuencia.sql
   psql -U postgres -d clinica -f database/migrations/003_normalizar_mayusculas_pacientes.sql
   psql -U postgres -d clinica -f database/migrations/004_normalizar_estados_cita.sql
   psql -U postgres -d clinica -f database/migrations/005_crear_diagnosticos_triajes.sql
   ```
4. Carga los datos iniciales:
   ```
   psql -U postgres -d clinica -f database/seeds/001_roles.sql
   psql -U postgres -d clinica -f database/seeds/002_servicios.sql
   psql -U postgres -d clinica -f database/seeds/003_consultorios.sql
   psql -U postgres -d clinica -f database/seeds/004_categorias_y_examenes.sql
   ```
5. Crea tu usuario de acceso al sistema (necesita el paso 4 ya aplicado):
   ```
   cd backend
   npm run crear-usuario -- <usuario> "<nombres>" "<apellidos>" [rol]
   ```
   `rol` es opcional (por defecto `admin`); también acepta `recepcion`, `medico` o `laboratorio`.
   La contraseña se pide por teclado, no se guarda en ningún archivo.

También puedes pegar el contenido de cada archivo en el Query Tool de pgAdmin, en vez de `psql`.

## Migraciones

| Nº  | Archivo                    | Descripción                                                   |
|-----|----------------------------|---------------------------------------------------------------|
| 001 | `001_crear_tabla_roles.sql` | Crea `roles` (`rol_id`, `nombre`, `es_admin`) y cambia `usuarios.rol` (texto) por `usuarios.rol_id` |
| 002 | `002_historia_clinica_secuencia.sql` | Crea la secuencia que genera `historia_clinica` (`HC-000001`, ...) al registrar pacientes |
| 003 | `003_normalizar_mayusculas_pacientes.sql` | Pone en mayúsculas nombres/apellidos de pacientes cargados antes de que el backend lo hiciera automático |
| 004 | `004_normalizar_estados_cita.sql` | Crea `estados_cita` (con color y descripción) y cambia `citas.estado` (texto) por `citas.estado_id` |
| 005 | `005_crear_diagnosticos_triajes.sql` | Crea `diagnosticos` y `triajes`, una fila como máximo por cita (`cita_id` es `UNIQUE`) |

## Seeds

| Nº  | Archivo | Descripción |
|-----|---------|-------------|
| 001 | `001_roles.sql` | Roles `admin`, `recepcion`, `medico` y `laboratorio` |
| 002 | `002_servicios.sql` | Las especialidades y el laboratorio. El formulario de citas rechaza cualquier servicio que no esté aquí |
| 003 | `003_consultorios.sql` | Las dos sedes del policlínico, como consultorios para Programación Médica |
| 004 | `004_categorias_y_examenes.sql` | Catálogo de categorías y exámenes de laboratorio (ficha física de LABNOR) |

## Convenciones

- Tablas en plural y en minúsculas (`usuarios`, `citas`, `roles`).
- Clave primaria `<singular>_id` (`usuario_id`, `rol_id`).
- Llaves foráneas `<tabla>_<columna>_fkey` y índices `idx_<tabla>_<columna>`.
