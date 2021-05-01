const faker = require('faker');
const fs = require('fs');

const generateSyllabuses = () => {
  let syllabuses = [];

  //creates syllabuses for each of the 100 courses
  for (let id = 1; id <= 100; id++) {
    var numberOfWeeks = Math.ceil(Math.random() * 4);
    let hoursToCompleteCourse = 0;
    let weeks = [];
    let starters = [
      'Basics of',
      'Steps to',
      'Ethics of',
      'Skills for',
      'What is',
      'Building',
      'Types of'
    ];

    //creates 1 to 4 weeks per course
    for (let weekNumber = 1; weekNumber <= numberOfWeeks; weekNumber++) {
      let hoursToCompleteWeek = 0;
      let lessons = [];
      let lessonsThisWeek = Math.ceil(Math.random() * 2);



      //creates 1 to 3 lessons per week
      for (let lesson = 0; lesson <= lessonsThisWeek; lesson++) {
        let starter = starters[Math.floor(Math.random() * starters.length)];
        let lessonTitle = starter;
        let lessonDescription = faker.lorem.paragraph();
        let numberOfFakeWords = Math.ceil(Math.random() * 4);
        let numberOfVideos = Math.ceil(Math.random() * 2);
        let videos = [];
        let videosSeconds = 0;
        let videosLength = 0; //in minutes
        let numberOfReadings = Math.ceil(Math.random() * 3);
        let readings = [];
        let readingsLength = 0; //in minutes
        let numberOfExercises = Math.ceil(Math.random() * 4);
        let exercises = [];
        let exercisesLength = 0; //in minutes
        let minutesToComplete = 0;
        let hoursToCompleteLesson;

        //create lessonTitle
        for (let i = 0; i <= numberOfFakeWords; i++) {
          lessonTitle = lessonTitle.concat(' ', faker.random.word());
        }

        //creates 1 to 3 videos per week
        for (let videoIndex = 0; videoIndex <= numberOfVideos; videoIndex++) {
          let videoTitle = faker.company.catchPhraseAdjective();
          videoTitle = videoTitle.charAt(0).toUpperCase() + videoTitle.slice(1).concat(' ', faker.hacker.verb(), ' ', faker.hacker.noun());

          let video = {
            videoIndex,
            videoTitle,
            videoLengthMinutes: Math.ceil(Math.random() * 90),
            videoLengthSeconds: Math.ceil(Math.random() * 58)
          };
          videos.push(video);
          videosSeconds += video.videoLengthSeconds;
          videosLength += video.videoLengthMinutes;
        }
        videosLength += (videosSeconds -= videosSeconds % 60) / 60;

        //creates 1 to 4 readings per week
        for (let readingIndex = 0; readingIndex <= numberOfReadings; readingIndex++) {
          let readingLengthMinutes = Math.ceil(Math.random() * 75);
          let readingTitle = '';
          for (let i = 0; i <= numberOfFakeWords; i++) {
            readingTitle = readingTitle.concat(faker.random.word(), ' ');
          }
          readingTitle = readingTitle.trimEnd();
          let reading = {
            readingIndex,
            readingTitle,
            readingLengthMinutes
          };
          readings.push(reading);
          readingsLength += readingLengthMinutes;
        }

        //creates 1 to 5 exercises per week
        for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
          let starterIndex = Math.floor(Math.random() * starters.length);
          let exerciseTitle = starters[starterIndex].concat(' ', faker.hacker.verb(), ' ', faker.hacker.adjective(), ' ', faker.hacker.noun());
          let exerciseLengthMinutes = Math.ceil(Math.random() * 75);
          let exercise = {
            exerciseIndex,
            exerciseTitle,
            exerciseLengthMinutes
          };
          exercises.push(exercise);
          exercisesLength += exerciseLengthMinutes;
        }

        //calculate times
        minutesToComplete += videosLength;
        minutesToComplete += readingsLength;
        minutesToComplete += exercisesLength;
        if (minutesToComplete % 60 < 30) {
          minutesToComplete -= minutesToComplete % 60;
        } else {
          minutesToComplete += minutesToComplete % 60;
        }
        hoursToCompleteLesson = Math.floor(minutesToComplete / 60);
        hoursToCompleteWeek += hoursToCompleteLesson;

        //bring together elements of a lesson and push to lessons.
        let lessonSyllabus = {
          hoursToCompleteLesson,
          lessonTitle,
          lessonDescription,
          videos,
          videosLength,
          readings,
          readingsLength,
          exercises,
          exercisesLength
        };
        lessons.push(lessonSyllabus);
      }

      //bring together all elements of a weekly syllabus and push
      let weekSyllabus = {
        weekNumber,
        lessons
      };
      weeks.push(weekSyllabus);
      hoursToCompleteCourse += hoursToCompleteWeek;
    }

    //combines syllabus elements for each course and pushes to syllabuses
    let syllabus = {
      id,
      weeks,
      hoursToCompleteCourse
    };
    syllabuses.push(syllabus);
  }

  fs.writeFileSync('./db/data/syllabuses.json', JSON.stringify(syllabuses, null, '\t'));
  const syllabusesInserter = require('./syllabusesInserter.js');
  syllabusesInserter();
  return;
};

generateSyllabuses();
