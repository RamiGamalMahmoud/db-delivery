# DB Delivery


db-delivery is a node.js library for dealing with sqlite and mysql .

---------------------------------------------------------------------------------------------

## The package repo on github is [here](https://github.com/RamiGamalMahmoud/db-delivery.git)

---------------------------------------------------------------------------------------------

## The package on npm is [here](https://www.npmjs.com/package/db-delivery)

---------------------------------------------------------------------------------------------

## It's consists of :
---------------------

- DB, a class the create the connection object.
- Query, a query builder the build the query and have two properities 
  * queryString, that holds the sql statements.
  * queryParams, that hodes the parameters.

## Installation
---------------

Use the package manager [npm]

```bash
npm i db-delivery
```

## Usage
---------

```node
const { db, Query } = require('db-delivery');

const conn = db.Connect('sqlite', 'path/to/sqlite/file');

let query = new Query();
qeruy.select('some, tables, in, database, tab.e')
.from('table name')
.where('column-name', '=', 'value');

let data = conn.get(query.getQueryString(), query.getQueryParams());

```


## License
----------

[MIT](https://choosealicense.com/licenses/mit/)