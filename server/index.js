const app = require('./app');
// const { connect } = require('../db/data/syllabusesModel');
const { connect } = require('../db/postgres/database');
require('newrelic');

const port = 3005;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log('Node Env:', process.env.NODE_ENV);
      console.log(__dirname);
      console.log(`Syllabus service listening at http://localhost:${port}`);
    });
  });
