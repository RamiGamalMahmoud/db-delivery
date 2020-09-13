class Query {
  constructor() {
    this.query = '';
    this.params = [];
  }

  select(columns) {
    this.query = `SELECT ${columns} FROM `;
    return this;
  }

  from(table) {
    this.query += `${table} `;
    return this;
  }

  where(column, operator, criteria) {
    if (operator === 'like') {
      operator = 'LIKE';
    }
    this.query += `WHERE ${column} ${operator} ? `;
    let col = '$' + column;
    let val = '%' + criteria + '%';
    this.params.push(val);
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

  orderBy(column) {
    this.query += `ORDER BY ${column}`;
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