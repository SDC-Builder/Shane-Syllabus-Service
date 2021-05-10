const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { generate } = require('./generatorNew');
const { insert } = require('./cassandraInserter');

const writer = csvWriter({ sendHeaders: false });
writer.pipe(fs.createWriteStream('./test.txt'));

(async () => {
  console.time('Start');
  for (let id = 1; id <= 10000000; id++) {
    if (id % 500000 === 0) {
      console.log('ID', id);
    }
    const record = generate(id);
    // writer.write({ syllabus: `${record}\n` });
    insert(id, record);
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setImmediate(resolve));
    } catch (err) {
      console.log(err);
    }
  }
  // writer.end();
  console.timeEnd('Start');
})();
