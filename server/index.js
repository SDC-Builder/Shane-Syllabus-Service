const app = require('./app');
// const { connect } = require('../db/data/syllabusesModel');
const { connect } = require('../db/postgres/database');

const port = 3005;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Syllabus service listening at http://localhost:${port}`);
    });
  });
