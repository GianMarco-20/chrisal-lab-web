const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica',
  password: 'dorisgeminis',
  port: 5432,
});
client.connect()
  .then(() => client.query("ALTER TABLE citas DROP COLUMN IF EXISTS estado_id;"))
  .then(() => client.query("ALTER TABLE citas DROP COLUMN IF EXISTS id_estado;"))
  .then(() => client.query("ALTER TABLE citas ADD COLUMN IF NOT EXISTS estado VARCHAR(20) DEFAULT 'programada';"))
  .then(() => console.log('Fixed schema for citas.estado'))
  .catch(console.error)
  .finally(() => client.end());
