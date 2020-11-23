const mysql = require('mysql');

class MysqlConnection {
  constructor(options) {
    console.log(options);
    this.conn = mysql.createConnection(options);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.conn.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('connected')
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.conn.end(err => {
        if (err) {
          reject(err);
        } else {
          resolve('connection closed')
        }
      });
    });
  }

  getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.conn.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve({ results, fields });
        }
      });
    });
  }
}

module.exports = MysqlConnection;