const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica',
  password: 'dorisgeminis',
  port: 5432,
});

async function run() {
  await client.connect();
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, '../database/migrations/005_flujo_laboratorio.sql'),
      'utf8'
    );
    await client.query(sql);
    console.log('✅ Migration 005_flujo_laboratorio.sql aplicada correctamente');

    // Verify
    const states = await client.query("SELECT ambito, estado FROM estados ORDER BY ambito, estado");
    console.log('\nEstados en la BD:');
    states.rows.forEach(r => console.log(`  [${r.ambito}] ${r.estado}`));

    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('ordenes_laboratorio','orden_examenes','resultados_orden') ORDER BY table_name"
    );
    console.log('\nNuevas tablas creadas:');
    tables.rows.forEach(r => console.log(`  ✓ ${r.table_name}`));

  } catch (err) {
    console.error('❌ Error al aplicar la migración:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

run().catch(process.exit);
