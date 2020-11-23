class DB {

  Connect(driver, params) {
    if (driver === 'sqlite') {
      return this.createSqliteConnection(params);
    } else if (driver === 'mysql') {
      return this.createMysqlConnection(params);
    }
    throw new Error('DRIVER ERROR!');
  }

  createSqliteConnection(path) {
    let SqliteConnection = require('./sqlite-connection');
    return new SqliteConnection(path);
  }

  // ToDo implement the mysql connection method
  createMysqlConnection(options) {
    // console.log(options);
    let MysqlConnection = require('./mysql-conection');
    return new MysqlConnection(options);

  }
}

const db = new DB();
module.exports = db;