// const { SyllabusModel } = require('./data/syllabusesModel');
const Postgres = require('./postgres/database');

// const hoursToComplete = (courseNumber, cb) => {
//   SyllabusModel.findOne({ id: courseNumber })
//     .then((syllabusData) => {
//       const { hoursToCompleteCourse } = syllabusData.toObject();
//       cb({ hoursToCompleteCourse });
//     })
//     .catch((err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
// };

// const syllabus = (courseNumber, cb) => {
//   const options = { id: courseNumber };
//   SyllabusModel.findOne(options)
//     .then((syllabusData) => {
//       cb(syllabusData);
//     })
//     .catch((err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
// };

const rest = {
  // get: (courseNumber, cb) => {
  //   const options = { id: courseNumber };
  //   SyllabusModel.findOne(options)
  //     .then((syllabusData) => {
  //       cb(syllabusData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // },

  get: async (courseNumber, cb) => {
    const result = await Postgres.get(courseNumber)
      .catch((err) => cb(err));
    cb(null, result);
  },

  post: async (courseInformation) => {
    const response = await Postgres.post(courseInformation);
    return response;
  },

  update: async (id, newInformation) => {
    const response = await Postgres.update(id, { ...newInformation });
    return response;
  },

  delete: async (id) => {
    const response = await Postgres.delete(id);
    return response;
  },
};

module.exports = {
  // hoursToComplete,
  // syllabus,
  rest,
};
