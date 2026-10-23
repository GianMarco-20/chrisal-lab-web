-- QuitarCategoriaPadre.sql
-- Elimina categorias_examen.categoria_padre_id: la jerarquía de categorías ya
-- no se usa (solo agrupaba las subcategorías de "Exámenes Ecográficos", que
-- no tienen exámenes). Las subcategorías quedan como categorías normales.
--
-- Ejecutar DESPUÉS de actualizar el código (git pull): el código nuevo funciona
-- con o sin la columna, pero el anterior falla si se borra antes.
-- Es idempotente: se puede ejecutar más de una vez.
--
-- Ejecutar (PowerShell):
--   psql -U postgres -d clinica -f database/NewDatabase/QuitarCategoriaPadre.sql

ALTER TABLE categorias_examen DROP COLUMN IF EXISTS categoria_padre_id;
