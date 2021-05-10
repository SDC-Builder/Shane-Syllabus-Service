const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  keyspace: 'syllabus_data',
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

(async () => {
  await client.connect();
  console.time('All Queries');
  console.time('Test One');
  let query = 'SELECT * FROM syllabus WHERE id=9999999';
  let result = await client.execute(query);
  let text = JSON.parse(result.rows[0].syllabus);
  console.timeEnd('Test One');

  console.time('Test Two');
  query = 'SELECT * FROM syllabus WHERE id=10000000';
  result = await client.execute(query);
  text = JSON.parse(result.rows[0].syllabus);
  console.timeEnd('Test Two');

  console.time('Test Three');
  query = 'SELECT * FROM syllabus WHERE id=8999999';
  result = await client.execute(query);
  text = JSON.parse(result.rows[0].syllabus);
  console.timeEnd('Test Three');
  console.timeEnd('All Queries');
  await client.shutdown();
})();
