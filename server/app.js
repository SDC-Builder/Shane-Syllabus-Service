const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../db/index.js');
const svgs = require('./svgs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  // console.log('GET / courseNumber: ', courseNumber);
  res.sendFile(path.resolve('./public/index.html'));
});

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', req.params.courseNumber);
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

app.post('/api/syllabus', async (req, res) => {
  if (req.body) {
    await db.rest.post(req.body);
    res.sendStatus(201);
  } else {
    res.send(400);
  }
});

app.put('/api/syllabus', async (req, res) => {
  if (req.body) {
    await db.rest.update(req.body.id, req.body);
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/api/syllabus', async (req, res) => {
  if (req.body) {
    await db.rest.delete(req.body.id);
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.get('/api/svg/:svgName', (req, res) => {
  res.send(JSON.stringify(svgs[req.params.svgName]));
});

app.get('/api/svgs', (req, res) => {
  res.send(JSON.stringify(svgs));
});

module.exports = app;
