const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const cors = require('cors');
// const compression = require('compression');
// const helmet = require('helmet');
// const cluster = require('cluster');
// const totalCPUs = require('os').cpus().length;
const db = require('../db/index.js');
const svgs = require('./svgs');

// if (cluster.isMaster) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < totalCPUs; i += 1) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//   });
// } else {
const app = express();
// console.log(`Worker ${process.pid} started`);

// app.use(compression());
// app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(cors());

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/public/bundle.js'));
});

app.get('/:courseNumber', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/public/index.html'));
});

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', req.params.courseNumber);
  db.hoursToComplete(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.get('/api/syllabus/:courseNumber', (req, res) => {
  db.rest.get(req.params.courseNumber, (err, responseData) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(responseData);
    }
  });
});

app.post('/api/syllabus', async (req, res) => {
  if (Object.entries(req.body).length > 0) {
    await db.rest.post(req.body);
    res.sendStatus(201);
  } else {
    res.send(400);
  }
});

app.put('/api/syllabus', async (req, res) => {
  if (Object.entries(req.body).length > 0) {
    await db.rest.update(req.body.id, req.body);
    res.sendStatus(202);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/api/syllabus', async (req, res) => {
  if (Object.entries(req.body).length > 0) {
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
// }
