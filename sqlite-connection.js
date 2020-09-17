const fs = require('fs');
const sqlite = require('sqlite3').verbose();

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

  insert(sql, params) {
    return new Promise((resolve, reject) => {
      this.conn.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  beginTransaction() {
    this.conn.run('BEGIN TRANSACTION;');
  }

  commitTransaction(callback = null) {
    this.conn.run('COMMIT;')
    if (callback !== null)
      callback();
  }
}

module.exports = SqliteConnection;