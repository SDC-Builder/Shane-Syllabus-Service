/* eslint-disable no-undef */
const request = require('supertest');
const express = require('../server/app');
// const { connect, disconnect } = require('./postgres.db.mocks.js');
const {
  connect, disconnect, get, post, update, deleteOne, deleteAll,
} = require('../db/postgres/database');
const fixtures = require('./fixtures');

const app = request(express);

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await deleteAll();
});

afterAll(() => {
  disconnect();
});

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    expect.assertions(1);
    await app.get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test('It should allow the insertion of a document', async () => {
    expect.assertions(3);
    await get(0)
      .catch((err) => expect(err.message).toBe('Record not found.'));

    const body = fixtures.sampleSyllabus;
    await request(express).post('/api/syllabus')
      .send({ ...body })
      .then((response) => expect(response.statusCode).toBe(201))
      .then(() => get(0))
      .then((records) => {
        expect(records).toBeTruthy();
      });
  });

  test('It should allow modifiction of a document', async () => {
    try {
      await get(1);
    } catch (e) {
      expect(e.message).toMatch('Record not found.');
    }
    await post(fixtures.sampleSyllabus);
    const sample = fixtures.sampleSyllabus;
    sample.weeks[0].weekNumber = 2;
    sample.weeks[0].hoursToCompleteCourse = 800;
    try {
      await request(app).put('/api/syllabus').send(sample);
    } catch (err) {
      console.log('Error--------->', err);
    }
    console.log('<---------marker---------->');
    expect(response.statusCode).toBe(202);
    const records = await get(0);
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
