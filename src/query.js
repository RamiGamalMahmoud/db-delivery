class Query {
  constructor() {
    this.query = '';
    this.params = [];
  }

  select(columns) {
    this.query = `SELECT ${columns} `;
    return this;
  }

  delete() {
    this.query = 'DELETE ';
    return this;
  }

  from(table) {
    this.query += `FROM ${table} `;
    return this;
  }

  insertInto(table, columns) {
    this.query = `INSERT INTO ${table}(${columns.join(', ')}) `;
    return this;
  }

  values(vals) {
    if (!Array.isArray(vals)) throw new Error('Expected an Array object as a parameter not ' + typeof vals);
    this.query += `VALUES (`;
    vals.forEach(val => {
      this.query += '?, ';
      this.params.push(val);
    });
    this.query = this.query.substring(0, this.query.length - 2);
    this.query += ') '
    return this;
  }

  update(table) {
    this.query = `UPDATE ${table} `;
    return this;
  }

  set(columns, values) {
    if (!Array.isArray(columns) || !Array.isArray(values)) {
      throw new Error(`Type error Expected two parameters of arrays found ${typeof columns} and ${typeof values}`);
    }
    this.query += 'SET ';
    for (let i = 0; i < columns.length; i++) {
      this.query += `${columns[i]}=?`;
      this.params.push(values[i]);
      if (i < columns.length - 1) {
        this.query += ', ';
      }
      this.query += ' ';
    }
    return this;
  }

  where(column, operator, criteria) {
    this.query += `WHERE ${column} ${operator.toUpperCase()} ? `;
    this.params.push(criteria);
    return this;
  }

  andWhere(column, operator, criteria) {
    return this.addLogicalClause('AND', column, operator, criteria);
  }

  orWhere(column, operator, criteria) {
    return this.addLogicalClause('OR', column, operator, criteria);
  }

  join(table) {
    return this.makeJoin('JOIN', table);
  }

  rightJoin(table) {
    return this.makeJoin('RIGHT JOIN', table);
  }

  leftJoin(table) {
    return this.makeJoin('LEFT JOIN', table);
  }

  on(lefthand, righthand) {
    this.query += `ON ${lefthand} = ${righthand} `;
    return this;
  }

  makeJoin(joinType, table) {
    this.query += `${joinType} ${table}`;
    return this;
  }

  addLogicalClause(logic, column, operator, criteria) {
    this.query += `${logic} ${column} ${operator} ? `;
    this.params.push(criteria);
    return this;
  }

  limit(limit) {
    this.query += `LIMIT ${limit}`;
    return this;
  }

  orderBy(column, type = null) {
    this.query += `ORDER BY ${column}`;
    switch (type) {
      case 'a':
        this.query += ` ASC`;
        break;
      case 'd':
        this.query += ` DESC`;
        break;
    }
    return this;
  }

  getQueryString() {
    return this.query.trim() + ';';
  }

  getQueryParams() {
    return this.params;
  }
}


module.exports = Query;