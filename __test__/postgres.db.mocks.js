const pg = require('pg');

const client = new pg.Client('postgres://localhost/jest');

module.exports = {
  connect: () => (new Promise((resolve, reject) => {
    client.connect()
      .then(() => resolve())
      .catch((err) => reject(err));
  })),
  disconnect: () => (new Promise((resolve, reject) => {
    client.end()
      .then(() => resolve())
      .catch((err) => reject(err));
  })),
  methods: {
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
      console.log(id, newRecord);
      const query = `UPDATE syllabus SET syllabus='${JSON.stringify(newRecord)}' WHERE id=${id};`;
      client.query(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    })),
    delete: (id) => (new Promise((resolve, reject) => {
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
  },
};
