const fs = require('fs');
const { resolve } = require('path');
const sqlite = require('sqlite3').verbose();
let conn = Symbol();


class SqliteConnection {
  constructor(dbPath) {
    this.conn = this.createConnection(dbPath);
  }

  createConnection(dbPath) {
    if (fs.existsSync(dbPath)) {
      return new sqlite.Database(dbPath);
    } else {
      throw new Error('DATABASE FILE NOT EXISTS !')
    }
  }

  getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.all(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      })
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = SqliteConnection;