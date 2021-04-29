const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  // console.log('GET / courseNumber: ', courseNumber);
  res.sendFile(path.resolve('./public/index.html'));
});

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', courseNumber);
  db.hoursToComplete(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.get('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('GET /api/syllabus courseNumber: ', courseNumber);
  db.rest.get(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.post('/api/syllabus', (req, res) => {
  console.log('Post Received')
  res.sendStatus(201)
})

app.put('/api/syllabus', (req, res) => {
  console.log('Put')
  res.sendStatus(200)
})

app.delete('/api/syllabus', (req, res) => {
  console.log('Delete')
  res.sendStatus(200)
})

app.get('/api/svg/:svgName', (req, res) => {
  res.send(JSON.stringify(svgs[req.params.svgName]));
});

app.get('/api/svgs', (req, res) => {
  res.send(JSON.stringify(svgs));
});

app.listen(port, () => {
  console.log(`Syllabus service listening at http://localhost:${port}`);
});
