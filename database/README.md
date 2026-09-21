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

## Cómo aplicar

```
psql -U postgres -d clinica -f database/migrations/001_crear_tabla_roles.sql
psql -U postgres -d clinica -f database/seeds/001_roles.sql
```

También puedes pegar el contenido del archivo en el Query Tool de pgAdmin.

## Migraciones

| Nº  | Archivo                    | Descripción                                                   |
|-----|----------------------------|---------------------------------------------------------------|
| 001 | `001_crear_tabla_roles.sql` | Crea `roles` (`rol_id`, `nombre`, `es_admin`) y cambia `usuarios.rol` (texto) por `usuarios.rol_id` |

## Convenciones

- Tablas en plural y en minúsculas (`usuarios`, `citas`, `roles`).
- Clave primaria `<singular>_id` (`usuario_id`, `rol_id`).
- Llaves foráneas `<tabla>_<columna>_fkey` y índices `idx_<tabla>_<columna>`.
