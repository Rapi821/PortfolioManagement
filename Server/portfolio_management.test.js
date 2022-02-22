const supertest = require('supertest');
const db = require('./db/index'); // needed for db.close()
const app = require('./app'); // Link to your server file
// const PORT = process.env.PORT ?? 3000;
// console.log(`Server listens on port: ${PORT}`.blue.bold);
// app.listen(PORT);

describe('test people REST Service', () => {
  let request = null;

  beforeAll(() => {
    console.log('before all tests: start server');
    request = supertest.agent(app);
  });

  afterAll(async () => {
    console.log('after all tests: close server');
    await db.close();
  });

  it('Gets Users', async () => {
    const res = await request.get('/users');
    console.log('UserTest');
    expect(res.status).toBe(200);
  });
});
