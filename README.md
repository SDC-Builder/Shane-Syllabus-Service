# Syllabus
[![Coverage Status](https://coveralls.io/repos/github/SDC-Builder/Shane-Syllabus-Service/badge.svg?branch=cleanup)](https://coveralls.io/github/SDC-Builder/Shane-Syllabus-Service?branch=cleanup)
[![Build Status](https://travis-ci.com/SDC-Builder/Shane-Syllabus-Service.svg?branch=master)](https://travis-ci.com/SDC-Builder/Shane-Syllabus-Service)

## Related Projects

  - https://github.com/Ingenuity-rpt26/shane-service-about
  - https://github.com/Ingenuity-rpt26/vinayService1
  - https://github.com/Ingenuity-rpt26/jsmithSyllabusesService
  - https://github.com/Ingenuity-rpt26/Grant--Service_1
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/shane-service-summary
  - https://github.com/Ingenuity-rpt26/vinayService2
  - https://github.com/Ingenuity-rpt26/jsmithImages
  - https://github.com/Ingenuity-rpt26/jsmithInstructorsService

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [API](#api)

## Usage
>npm install

Ensure database is running and URL and proxy are correct in ./.env



> npm run seed


## Requirements

Syllabuses relies on Images and Reviews services for data.

Ensure URL's and ports are correct in ./client/components/initial/state.js

> npm run build (as necessary)

## Development

Each course has a syllabus.  Each syllabus has one or more weeks.  Each week has one or more lessons.  Each lesson has one or more videos, readings, and exercises.

<h3>Component Flow:</h3>

-> Syllabus
* -> Header -> Rating

* -> Weeks =>  Week

* * -> WeekTitle

* * => Lesson

* * * -> LessonHeader

* * * -> LessonTitle

* * * -> LessonOverview;

* * * -> Videos => Video

* * * -> Readings => Reading

* * * -> Exercises => Exercise


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API
### All Routes

#### Read
>GET /api/syllabus/:courseNumber

Returns JSON object. Example response:
```json
{
  "id": 0,
  "weeks": [{
    "weekNumber": 1,
    "lessons": [{
      "hoursToCompleteLesson": 300,
      "lessonTitle": "Lesson Title",
      "lessonDescription": "Description",
      "videos": [{
        "videoIndex": 0,
        "videoTitle": "Video Title",
        "videoLengthMinutes": 60,
        "videoLengthSeconds": 3600
      }],
      "videosLength": 3,
      "readings": [{
        "readingIndex": 0,
        "readingTitle": "Reading Title",
        "readingLengthMinutes": 60
      }],
      "readingsLength": 3,
      "exercises": [{
        "exerciseIndex": 0,
        "exerciseTitle": "Exercise Title",
        "exerciseLengthMinutes": 60
      }],
      "exercisesLength": 3
    }],
    "hoursToCompleteCourse": 300
  }]
}
```
---
#### Create
>POST /api/syllabus/

Request body required JSON schema:

```javascript
{
  id: Number,
  weeks: [{
    weekNumber: Number,
    lessons: [{
      hoursToCompleteLesson: Number,
      lessonTitle: String,
      lessonDescription: String,
      videos: [{
        videoIndex: Number,
        videoTitle: String,
        videoLengthMinutes: Number,
        videoLengthSeconds: Number
      }],
      videosLength: Number,
      readings: [{
        readingIndex: Number,
        readingTitle: String,
        readingLengthMinutes: Number
      }],
      readingsLength: Number,
      exercises: [{
        exerciseIndex: Number,
        exerciseTitle: String,
        exerciseLengthMinutes: Number
      }],
      exercisesLength: Number
    }],
    hoursToCompleteCourse: Number
  }]
}
```
---
#### Update
>PUT /api/syllabus/

Request body's `id` should match the id to be updated.
All other fields are optional. When updating a sub-document, ensure all child fields are present.
Request body field options:

```javascript
{
  id: Number,
  weeks: [{
    weekNumber: Number,
    lessons: [{
      hoursToCompleteLesson: Number,
      lessonTitle: String,
      lessonDescription: String,
      videos: [{
        videoIndex: Number,
        videoTitle: String,
        videoLengthMinutes: Number,
        videoLengthSeconds: Number
      }],
      videosLength: Number,
      readings: [{
        readingIndex: Number,
        readingTitle: String,
        readingLengthMinutes: Number
      }],
      readingsLength: Number,
      exercises: [{
        exerciseIndex: Number,
        exerciseTitle: String,
        exerciseLengthMinutes: Number
      }],
      exercisesLength: Number
    }],
    hoursToCompleteCourse: Number
  }]
}
```
---
#### Delete
>DELETE /api/syllabus/

Request body's `id` should match the id to be deleted.
Request body:
```javascript
{
  id: Number,
}
```
