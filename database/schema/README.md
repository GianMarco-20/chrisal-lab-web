# schema

Aquí va la foto del esquema actual de la base `clinica`, para poder recrearla en otra PC.

Genera el archivo una sola vez, antes de aplicar nuevas migraciones:

```
pg_dump -U postgres -d clinica --schema-only --no-owner -f database/schema/000_baseline_clinica.sql
```

Si `pg_dump` no está en el PATH de Windows, usa la ruta completa, por ejemplo
`"C:\Program Files\PostgreSQL\18\bin\pg_dump.exe"`.

Una vez creado, no se edita: los cambios posteriores van como migraciones en `../migrations/`.
