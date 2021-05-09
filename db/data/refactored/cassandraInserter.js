const fs = require('fs');
const es = require('event-stream');
const path = require('path');
const cassandra = require('cassandra-driver');

let lineNumber = 0;

const stream = fs.createReadStream(path.resolve(__dirname, '../generated.csv'));

(async () => {
  console.time('read');
  await stream.pipe(es.split()).pipe(
    es.map(async (line) => {
      lineNumber += 1;
      if (lineNumber % 500000 === 0) {
        console.log(lineNumber);
      }
    }),
  );
  console.timeEnd('read');
})();
