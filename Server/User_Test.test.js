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
    // Authentication as User im beforeEach Method
  });
  afterAll(async () => {
    console.log('after all tests: close server');
    await db.close();
    // close Database
  });

  it.skip('should get a competition list', async () => {
    const res = await authenticatedSession.get('/user/competitions');
    console.log(res.body);
    // make sure that at least 1 competition is listed

    console.log(res.body);
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

  it.skip('should get competition 0 ', async () => {
    const res = await authenticatedSession.get('/competition/' + validCompetionId);
    // console.log(res.body);
    // make sure that at least 1 entry is listed
    console.log(res.body);
    expect(res.body.length).toBeGreaterThan(0);

    // array should contain isin 0000 => cash
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ isin: '0000' })]));
  });

  it.skip('create competition ', async () => {
    // creating competition:
    const respost = await authenticatedSession.post('/createNewCompetition').send({
      title: 'RouterTestComp',
      starting_money: 20000,
      end_date: '2022-12-1',
    });
    const resget = await authenticatedSession.get('/competition/' + 52);
    // make sure that at least 1 competition is listed
    console.log(respost.body);
    console.log(resget.body);
    expect(resget.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ isin: '0000' })]),
    );
    // make sure that competition RouterTestComp is listed
    expect(resget.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ buy_price: '20000' })]),
    );
    // Es wir jedes mal beim Aufruf des Tests eine neue Competition erstellt, weil keine Löschfunktion vorhanden ist, die diese wieder löscht
    // expect(res.body.length).toBeGreaterThan(0);
  });

  it.skip('should get user data ', async () => {
    const resget = await authenticatedSession.get('/user/data');
    // Check if User data equals with authenticated User
    expect(resget.body).toEqual(expect.objectContaining({ email: 'devall.s03@htlwienwest.at' }));
    expect(resget.body).toEqual(expect.objectContaining({ password: 'qHV3#ctbt' }));
  });

  it('should buy and sell stocks ', async () => {
    // buy Stock:
    const respostbuy = await authenticatedSession.post('/user/buyStocks').send({
      isin: 'US5949181045',
      buy_price: 298.76,
      count: 5,
      competition_id: 39,
      buy_date: '2022-01-12',
    });
    const resgett = await authenticatedSession.get('/competitions/' + 39 + '/getCompStocks');
    console.log(resgett.body);
    // Sell Stock:
    const respostsell = await authenticatedSession.post('/user/sellStocks').send({
      isin: 'US5949181045',
      sell_price: 298.76,
      count: 5,
      competition_id: 39,
      buy_date: '2022-01-12',
    });
    const resget = await authenticatedSession.get('/competitions/' + 39 + '/getCompStocks');
    console.log(resget.body);
    // Check if Stock is bought and sold:
    expect(resget.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ isin: 'US5949181045' })]),
    );
    expect(resget.body).toEqual(expect.arrayContaining([expect.objectContaining({ count: '5' })]));
  });
});
