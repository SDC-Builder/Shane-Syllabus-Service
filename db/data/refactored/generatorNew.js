/* eslint-disable no-plusplus */
const faker = require('faker');

const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

const getRandomWeeks = (number) => {
  const weeks = [];
  for (let i = 1; i <= number; i++) {
    const week = {
      weekNumber: i,
      lessons: [{
        hoursToCompleteLesson: randomNumber(10),
        lessonTitle: faker.lorem.words(4),
        lessonDescription: faker.lorem.paragraph(1),
        videos: [{
          videoIndex: 0,
          videoTitle: faker.lorem.words(4),
          videoLengthMinutes: randomNumber(360),
          videoLengthSeconds: randomNumber(58),
        }],
        videosLength: randomNumber(360),
        readings: [{
          readingIndex: 0,
          readingTitle: faker.lorem.words(4),
          readingLengthMinutes: randomNumber(360),
        }],
        readingsLength: randomNumber(360),
        exercises: [{
          exerciseIndex: 0,
          exerciseTitle: faker.lorem.words(4),
          exerciseLengthMinutes: randomNumber(360),
        }],
        exercisesLength: randomNumber(360),
      }],
      hoursToCompleteCourse: randomNumber(360),
    };
    weeks.push(week);
  }
  return weeks;
};

const generate = (id) => (JSON.stringify({
  id,
  weeks: getRandomWeeks(randomNumber(3)),
}));

// (async () => {
//   console.time('Start');
//   for (let id = 1; id <= 10000000; id++) {
//     if (id % 500000 === 0) {
//       console.log('ID', id);
//     }
//     writer.write({ record: generate(id) });

//     try {
//       // eslint-disable-next-line no-await-in-loop
//       await new Promise((resolve) => setImmediate(resolve));
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   writer.end();
//   console.timeEnd('Start');
// })();

module.exports = {
  generate,
  randomNumber,
  getRandomWeeks,
};
