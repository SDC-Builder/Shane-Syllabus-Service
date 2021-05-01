const app = require('./app');

const port = 3005;

app.listen(port, () => {
  console.log(`Syllabus service listening at http://localhost:${port}`);
});
