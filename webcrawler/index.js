const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.finanzen.net/aktien/amazon-aktie');
  //getIsin
  const [el] = await page.$x(
    '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[4]/div/span'
  );
  const isinData = await el.getProperty('textContent');
  const isin = await isinData.jsonValue();
  console.log(isin);

  //get Kurs
  const [ku] = await page.$x(
    '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[1]/div[1]'
  );
  const kursData = await ku.getProperty('textContent');
  const kurs = await kursData.jsonValue();
  console.log(kurs);

  // get Name
  const [n] = await page.$x(
    '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[1]/h1'
  );
  const nameData = await n.getProperty('textContent');
  const name = await nameData.jsonValue();
  console.log(name);

  getTime();

  browser.close();
})();

function getTime() {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dateTime = date + ' ' + time;
  console.log(dateTime);
}
