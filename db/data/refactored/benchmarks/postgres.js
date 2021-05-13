const pg = require('pg');

const client = new pg.Client('postgres://localhost/syllabus_data');

(async () => {
  await client.connect();
  console.time('All Queries');
  console.time('Test One');
  let query = 'SELECT (id, syllabus) FROM syllabus WHERE id=7000000';
  client.query(query)
    .then((result) => {
      console.timeEnd('Test One');
    })
    .catch((err) => console.error(err));

  console.time('Test Two');
  query = 'SELECT * FROM syllabus WHERE id=10000000';
  client.query(query)
    .then((result) => {
      console.timeEnd('Test Two');
    })
    .catch((err) => console.error(err));

  console.time('Test Three');
  query = 'SELECT * FROM syllabus WHERE id=8999999';
  client.query(query)
    .then((result) => {
      console.timeEnd('Test Three');
      console.timeEnd('All Queries');
      client.end();
    })
    .catch((err) => console.error(err));
})();
