const supertest = require('supertest');
const session = require('supertest-session');
const db = require('./db/index'); // needed for db.close()
const app = require('./app'); // Link to your server file
// const PORT = process.env.PORT ?? 3000;
// console.log(`Server listens on port: ${PORT}`.blue.bold);
// app.listen(PORT);

describe('after authenticating session', function () {
  let authenticatedSession;

  beforeEach(function (done) {
    testSession = session(app);
    testSession
      .post('/user/login')
      .send({
        email: 'szwajda.v03@htlwienwest.at',
        password: '1?Ä.*t<',
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

  it('should get a restricted page', async (done) => {
    authenticatedSession.get('/user/competitions').end(function (err, data) {
      if (err) return done(err);
      console.log(data);
      expect(data.status).toBe(200);

      return done();
    });
  });
});
