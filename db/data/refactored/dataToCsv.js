/* eslint-disable no-plusplus */
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const { generate } = require('./generatorNew');
const { insert, connect, disconnect, getCount } = require('./postgresInserter');
const numRecords = 100000;

const writer = csvWriter({ sendHeaders: false });
writer.pipe(fs.createWriteStream('./test.txt'));

const batchInsert = async (batchNumber) => {
  console.log(`Batch ${batchNumber}`);
  console.log(`Inserting rows ${((numRecords * batchNumber) + 1)} to ${(numRecords * (batchNumber + 1))}`);
  console.time('end');
  allRecords = '';
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
    // writer.write({ syllabus: `${record}\n` });
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setImmediate(resolve));
    } catch (err) {
      console.log(err);
    }
  }
  await insert(allRecords);
  console.timeEnd('end');
};

connect()
  .then(async () => {
    console.time('All Records Inserted in');
    for (let i = 0; i < 100; i++) {
      await batchInsert(i);
    }
    console.time('All Records Inserted in');
  });
