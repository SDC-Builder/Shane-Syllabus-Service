const pg = require('pg');

const client = new pg.Client('postgres://localhost/syllabus_data');

const connect = () => new Promise((resolve, reject) => {
  client.connect()
    .then(() => resolve('Connected!'))
    .catch((err) => reject(err));
});

const disconnect = () => new Promise((resolve, reject) => {
  client.end()
    .then(() => resolve('Disconnected!'))
    .catch((err) => reject(err));
});

const insert = (records) => new Promise((resolve, reject) => {
  const queryStatement = `INSERT INTO syllabus (id, syllabus) values ${records}`;
  client.query(queryStatement)
    .then((done) => resolve(done))
    .catch((err) => reject(err));
});

const getCount = () => {
  client.query('SELECT COUNT(*) FROM syllabus;')
    .then((response) => console.log(`${response.rows[0].count} rows`));
};

module.exports = {
  connect,
  disconnect,
  insert,
  getCount,
};
