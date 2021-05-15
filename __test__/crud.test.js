/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server/app');
const { methods, connect, disconnect } = require('./postgres.db.mocks.js');
const fixtures = require('./fixtures');

beforeAll(() => {
  connect();
});

afterEach(async () => {
  await methods.deleteAll();
});

afterAll(() => {
  disconnect();
});

describe('Test the root path', () => {
  test.only('It should respond to the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should allow the insertion of a document', async () => {
    let records = await SyllabusModel.find();
    expect(records.length).toBe(0);
    const response = await request(app).post('/api/syllabus', { body: fixtures.sampleSyllabusString });
    expect(response.statusCode).toBe(201);
    records = await SyllabusModel.find();
    expect(records.length).toBe(1);
  });

  test('It should allow modifiction of a document', async () => {
    let records = await SyllabusModel.find();
    expect(records.length).toBe(0);
    await SyllabusModel.create(fixtures.sampleSyllabus);
    const sample = fixtures.sampleSyllabus;
    sample.weeks[0].weekNumber = 2;
    sample.weeks[0].hoursToCompleteCourse = 800;
    const response = await request(app).put('/api/syllabus').send(sample);
    expect(response.statusCode).toBe(202);
    records = await SyllabusModel.find();
    expect(records[0].weeks[0].weekNumber).toBe(2);
    expect(records[0].weeks[0].hoursToCompleteCourse).toBe(800);
  });

  test('It should allow the deleting of a record', async () => {
    let records = await SyllabusModel.find();
    expect(records.length).toBe(0);
    await SyllabusModel.create(fixtures.sampleSyllabus);
    records = await SyllabusModel.find();
    expect(records.length).toBe(1);
    const response = await request(app).delete('/api/syllabus').send({ id: 1 });
    expect(response.statusCode).toBe(202);
    records = await SyllabusModel.find();
    expect(records.length).toBe(0);
  });

  test('It should responde with a specific record', async () => {
    await SyllabusModel.create(fixtures.sampleSyllabus);
    const response = await request(app).get('/api/syllabus/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body.id).toBe(1);
  });
});
