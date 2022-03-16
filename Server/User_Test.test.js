const supertest = require('supertest');
const session = require('supertest-session');
const db = require('./db/index'); // needed for db.close()
const app = require('./app'); // Link to your server file
// const PORT = process.env.PORT ?? 3000;
// console.log(`Server listens on port: ${PORT}`.blue.bold);
// app.listen(PORT);

describe('after authenticating session', function () {
  let authenticatedSession = null;
  let validCompetionId = -1;

  beforeEach(function (done) {
    testSession = session(app);
    testSession
      .post('/user/login')
      .send({
        email: 'devall.s03@htlwienwest.at',
        password: 'qHV3#ctbt',
      })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });
  afterAll(async () => {
    console.log('after all tests: close server');
    await db.close();
  });

  it('should get a competition list', async () => {
    const res = await authenticatedSession.get('/user/competitions');
    console.log(res.body);
    // make sure that at least 1 competition is listed
    expect(res.body.length).toBeGreaterThan(0);
    console.log(res.body[0]);
    const firstCompetion = res.body[0];
    expect(firstCompetion).toEqual(
      expect.objectContaining({
        // cash: expect.any(Number), // both are strings atm -> should be numbers!
        // total: expect.any(Number),  // both are strings atm -> should be numbers!
        cash: expect.any(String),
        total: expect.any(String),
      }),
    );
    expect(firstCompetion).toHaveProperty('active', true); // active should be true
    expect(firstCompetion).toHaveProperty('competition_id'); // prime key should be available

    validCompetionId = firstCompetion.competition_id;
  });

  it('should get competition 0 ', async () => {
    const res = await authenticatedSession.get('/competition/' + validCompetionId);
    // console.log(res.body);
    // make sure that at least 1 entry is listed
    console.log(res.body);
    expect(res.body.length).toBeGreaterThan(0);

    // array should contain isin 0000 => cash
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ isin: '0000' })]));
  });

  it('should create competition ', async () => {
    const res = await authenticatedSession.post('/createNewCompetition').send({
      title: 'RouterTestComp',
      starting_money: 20000,
      end_date: '2022-12-1',
      user_id: 2,
    });

    // console.log(res.body);
    // make sure that at least 1 entry is listed
    console.log(res.body.id);
    // expect(res.body.length).toBeGreaterThan(0);

    // // array should contain isin 0000 => cash
    // expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ isin: '0000' })]));
  });
});
