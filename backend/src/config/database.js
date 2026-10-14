import mysql from 'mysql2/promise';

// As credenciais vêm de variáveis de ambiente (arquivo backend/.env).
// Use backend/.env.example como modelo. O bun lê o .env automaticamente.
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_USER || DB_PASSWORD === undefined) {
  throw new Error(
    'Configure DB_USER e DB_PASSWORD no arquivo backend/.env (veja .env.example).'
  );
}

const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME || 'dsw_crud_livros',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
