const { SyllabusModel } = require('./data/syllabusesModel');

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

  post: async (courseInformation) => {
    const response = await SyllabusModel.create(courseInformation);
    return response;
  },

  update: async (id, newInformation) => {
    const response = await SyllabusModel.findOneAndUpdate({ id }, { ...newInformation });
    return response;
  },

  delete: async (id) => {
    const response = await SyllabusModel.deleteOne({ id });
    return response;
  },
};

module.exports = {
  // hoursToComplete,
  // syllabus,
  rest,
};
