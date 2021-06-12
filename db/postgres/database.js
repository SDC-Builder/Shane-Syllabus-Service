// const pg = require('pg');
const { Pool } = require('pg');
const pg = require('pg');
const dotenv = require('dotenv');

let client;

if (process.env.NODE_ENV === 'test') {
  client = new pg.Client('postgres://localhost/jest');
} else {
  dotenv.config();
  client = new Pool({
    user: 'postgres',
    host: '172.31.23.110',
    // host: '127.0.0.1',
    database: process.env.DB_NAME,
    port: 5432,
    password: process.env.DB_PASS,
    // 'postgres://localhost/syllabus_data'
  });
}

module.exports = {
  connect: () => (new Promise((resolve, reject) => {
    client.connect()
      .then(() => {
        console.log('Connected!');
        resolve();
      })
      .catch((err) => reject(err));
  })),
  disconnect: () => (new Promise((resolve, reject) => {
    client.end()
      .then(() => resolve())
      .catch((err) => reject(err));
  })),
  get: (id) => (new Promise((resolve, reject) => {
    const query = `SELECT syllabus FROM syllabus WHERE id=${id};`;
    client.query(query)
      .then((result) => {
        if (result.rows.length === 0) {
          reject(new Error('Record not found.'));
        }
        resolve(result.rows[0].syllabus);
      })
      .catch((err) => reject(err));
  })),
  post: (syllabus) => (new Promise((resolve, reject) => {
    const query = `INSERT INTO syllabus (id, syllabus) VALUES (${syllabus.id}, '${JSON.stringify(syllabus)}');`;
    client.query(query)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  })),
  update: (id, newRecord) => (new Promise((resolve, reject) => {
    const query = `UPDATE syllabus SET syllabus='${JSON.stringify(newRecord)}' WHERE id=${id};`;
    client.query(query)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log('Result........', err);
        reject(err);
      });
  })),
  deleteOne: (id) => (new Promise((resolve, reject) => {
    const query = `DELETE FROM syllabus WHERE id=${id};`;
    client.query(query)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  })),
  deleteAll: () => (new Promise((resolve, reject) => {
    client.query('TRUNCATE syllabus;')
      .then(() => resolve())
      .catch((err) => reject(err));
  })),
};

// (async () => {
//   await client.connect();
//   console.time('All Queries');
//   console.time('Test One');
//   let query = 'SELECT syllabus FROM syllabus WHERE id=9000000';
//   client.query(query)
//     .then(() => {
//       // console.log(result.rows[0].syllabus.weeks);
//       console.timeEnd('Test One');
//     })
//     .catch((err) => console.error(err));

//   console.time('Test Two');
//   query = 'SELECT syllabus FROM syllabus WHERE id=9999999';
//   client.query(query)
//     .then(() => {
//       console.timeEnd('Test Two');
//     })
//     .catch((err) => console.error(err));

//   console.time('Test Three');
//   query = 'SELECT syllabus FROM syllabus WHERE id=7777777';
//   client.query(query)
//     .then(() => {
//       console.timeEnd('Test Three');
//       console.timeEnd('All Queries');
//       client.end();
//     })
//     .catch((err) => console.error(err));
// })();
