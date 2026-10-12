const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica',
  password: 'dorisgeminis',
  port: 5432,
});
client.connect()
  .then(() => client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'citas'"))
  .then(res => console.log(res.rows))
  .catch(console.error)
  .finally(() => client.end());
