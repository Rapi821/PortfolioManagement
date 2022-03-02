const supertest = require('supertest');
var session = require('supertest-session');
const db = require('./db/index'); // needed for db.close()
const app = require('./app'); // Link to your server file
// const PORT = process.env.PORT ?? 3000;
// console.log(`Server listens on port: ${PORT}`.blue.bold);
// app.listen(PORT);

describe.skip('test people REST Service', () => {
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
    expect(res.body).toContainEqual({
      email: 'alfred.reisenberger@htlwienwest.at',
      firstname: 'Alfred',
      lastname: 'Reisenberger',
      password: '1Rrj?xKZL',
      user_id: 3,
    });
  });

  it('Create,Get,Update,Delete User', async () => {
    const res = await request.post('/user/createNewOne').send({
      email: 'szwajda.v03@htlwienwest.at',
      firstname: 'Valentin',
      lastname: 'Szwajda',
      password: '1?Ä.*t<',
    });
    // const iduser = res.body.user_id;
    // console.log(res.body.user_id);
    expect(res.status).toBe(200);
    // const resget = await request.get(`/users/${iduser}`);
    // expect(resget.status).toBe(200);
  });
});
