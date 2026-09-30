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
   ```
4. Carga los datos iniciales:
   ```
   psql -U postgres -d clinica -f database/seeds/001_roles.sql
   ```
5. Crea tu usuario de acceso al sistema (necesita el paso 3 ya aplicado):
   ```
   cd backend
   npm run crear-admin -- <usuario> "<nombres>" "<apellidos>"
   ```

También puedes pegar el contenido de cada archivo en el Query Tool de pgAdmin, en vez de `psql`.

## Migraciones

| Nº  | Archivo                    | Descripción                                                   |
|-----|----------------------------|---------------------------------------------------------------|
| 001 | `001_crear_tabla_roles.sql` | Crea `roles` (`rol_id`, `nombre`, `es_admin`) y cambia `usuarios.rol` (texto) por `usuarios.rol_id` |
| 002 | `002_historia_clinica_secuencia.sql` | Crea la secuencia que genera `historia_clinica` (`HC-000001`, ...) al registrar pacientes |

## Convenciones

- Tablas en plural y en minúsculas (`usuarios`, `citas`, `roles`).
- Clave primaria `<singular>_id` (`usuario_id`, `rol_id`).
- Llaves foráneas `<tabla>_<columna>_fkey` y índices `idx_<tabla>_<columna>`.
