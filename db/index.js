const mongoose = require('mongoose');
const SyllabusModel = require('./data/syllabusesModel');

const hoursToComplete = (courseNumber, cb) => {
  SyllabusModel.findOne({ id: courseNumber })
    .then((syllabusData) => {
      let hoursToCompleteCourse = syllabusData.toObject().hoursToCompleteCourse;
      cb({ hoursToCompleteCourse });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};

const syllabus = (courseNumber, cb) => {
  const options = { id: courseNumber };
  SyllabusModel.findOne(options)
    .then((syllabusData) => {
      cb(syllabusData);
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};

const rest = {
  get: (courseNumber, cb) => {
    const options = { id: courseNumber };
    SyllabusModel.findOne(options)
      .then((syllabusData) => {
        cb(syllabusData);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

module.exports = {
  hoursToComplete,
  syllabus,
  rest,
};
