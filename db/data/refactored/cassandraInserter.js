const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  keyspace: 'syllabus_data',
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

let lineNumber = 1;

const insert = async (id, record) => {
  const query = `INSERT INTO syllabus_data.syllabus (id, syllabus) VALUES (${id}, '${record}');`;
  try {
    await client.execute(query);
  } catch (err) {
    console.log('Error:', err);
  }
  lineNumber += 1;
  if (lineNumber % 500000 === 0) {
    console.log(lineNumber);
  }
};

module.exports = {
  insert,
};
