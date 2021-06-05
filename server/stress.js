/* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-unresolved */
// import http from 'k6/http';
// import { check } from 'k6';

// export const options = {
//   vus: 200,
//   duration: '1s',
// };

// export default () => {
//   const url = http.get('http://localhost:3005');
//   check(url, {
//     success: (res) => res.status === 200,
//   });
// };

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '10s',
};
// export default function () {
//   // const res = http.get('http://127.0.0.1:3005/api/syllabus/9999999');
//   const res = http.get('http://127.0.0.1:3000/9999999');
//   check(res, { 'status was 200': (r) => r.status === 200 });
//   sleep(1);
// }

// export default function () {
//   for (let i = 9999989; i < 10000001; i++) {
//     const res = http.get(`http://localhost:3000/${i}`, {
//       tags: {
//         name: 'Service',
//       },
//     });
//     check(res, {
//       'status was 200': (r) => r.status === 200,
//     });
//     sleep(1);
//   }
// }

export default function () {
  const syllabus = {
    id: 1,
    weeks: [{
      weekNumber: 1,
      lessons: [{
        hoursToCompleteLesson: 300,
        lessonTitle: 'Lesson Title',
        lessonDescription: 'Description',
        videos: [{
          videoIndex: 0,
          videoTitle: 'Video Title',
          videoLengthMinutes: 60,
          videoLengthSeconds: 3600,
        }],
        videosLength: 3,
        readings: [{
          readingIndex: 0,
          readingTitle: 'Reading Title',
          readingLengthMinutes: 60,
        }],
        readingsLength: 3,
        exercises: [{
          exerciseIndex: 0,
          exerciseTitle: 'Exercise Title',
          exerciseLengthMinutes: 60,
        }],
        exercisesLength: 3,
      }],
      hoursToCompleteCourse: 300,
    }],
  };
  const url = 'http://localhost:3005/api/syllabus';
  const payload = JSON.stringify(syllabus);
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(url, payload, params);
  check(res, {
    'status was 201': (r) => r.status === 201,
  });
  sleep(1);
}
