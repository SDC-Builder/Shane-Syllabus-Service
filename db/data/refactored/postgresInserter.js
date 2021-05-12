const pg = require('pg');

const client = new pg.Client('postgres://localhost/syllabus_data');

const connect = () => new Promise((resolve, reject) => {
  client.connect()
    .then(() => resolve('Connected!'))
    .catch((err) => reject(err));
});

const disconnect = () => new Promise((resolve, reject) => {
  client.disconnect()
    .then(() => resolve('Disconnected!'))
    .catch((err) => reject(err));
});

const insert = (id, record) => {
  const queryStatement = `INSERT INTO syllabus (id, record) values (${id}, ${JSON.stringify(record)})`;
  console.log(queryStatement)
  let query = client.query(queryStatement)
    .then(result => console.log(result));
  // const queryResult = query.on('row', (row, result) => {
  //   result.add(row);
  //   return result;
  // });
  // console.log(query);
};

connect()
  .then((message) => console.log(message))
  .then(() => insert(1, { test: 'test' }));
