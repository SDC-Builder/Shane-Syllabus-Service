module.exports = {
  sampleSyllabus: {
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
  },

  sampleSyllabusString: '"{"id":0,"weeks":[{"weekNumber":1,"lessons":[{"hoursToCompleteLesson":300,"lessonTitle":"Lesson Title","lessonDescription":"Description","videos":[{"videoIndex":0,"videoTitle":"Video Title","videoLengthMinutes":60,"videoLengthSeconds":3600}],"videosLength":3,"readings":[{"readingIndex":0,"readingTitle":"Reading Title","readingLengthMinutes":60}],"readingsLength":3,"exercises":[{"exerciseIndex":0,"exerciseTitle":"Exercise Title","exerciseLengthMinutes":60}],"exercisesLength":3}],"hoursToCompleteCourse":300}]}"',
};
