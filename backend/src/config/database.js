import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'dsw_crud_livros',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;