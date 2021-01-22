import mysql from 'mysql';
import makeMinesweeperDb from './minesweeper-db';
import dotenv from 'dotenv';
import util from 'util';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export function makeDb () {
  return Object.freeze({
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args)
    },
    escapeId(identifier) {
      return connection.escapeId(identifier);
    }
  });
}

const minesweeperDb = makeMinesweeperDb({ makeDb });
export default minesweeperDb;
