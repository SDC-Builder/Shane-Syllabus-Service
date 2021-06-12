/* eslint-disable no-plusplus */
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { generate } = require('./generatorNew');
const {
  insert, connect,
} = require('./postgresInserter');

const numRecords = 1000;

require('dotenv').config();

const writer = csvWriter({ sendHeaders: false });
writer.pipe(fs.createWriteStream('./public/test.json'));

const batchInsert = async (batchNumber) => {
  console.log(`Batch ${batchNumber}`);
  console.log(`Inserting rows ${((numRecords * batchNumber) + 1)} to ${(numRecords * (batchNumber + 1))}`);
  console.time('end');
  let allRecords = '';
  for (let id = ((numRecords * batchNumber) + 1); id <= (numRecords * (batchNumber + 1)); id++) {
    if (id % 100000 === 0) {
      console.log('ID', id);
    }
    const record = generate(id);
    if (id === (numRecords * (batchNumber + 1))) {
      allRecords += `(${id}, '${JSON.stringify(record)}')`;
    } else {
      allRecords += `(${id}, '${JSON.stringify(record)}'),`;
    }
    // writer.write({ syllabus: `${JSON.stringify(record, null, 4)}` });
    fs.appendFile('./public/test.json', `${JSON.stringify(record, null, 4)}\n`, 'utf8', (err) => {
      if (err) {
        console.log('Error writing files', err);
      } else {
        console.log('Done!');
      }
    });
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setImmediate(resolve));
    } catch (err) {
      console.log(err);
    }
  }
  // await insert(allRecords);
  console.timeEnd('end');
};

(async () => {
  console.time('All Records Inserted in');
  for (let i = 1000; i < 1001; i++) {
    // eslint-disable-next-line no-await-in-loop
    await batchInsert(i);
  }
  console.time('All Records Inserted in');
})();
