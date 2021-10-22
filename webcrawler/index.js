const puppeteer = require('puppeteer');
const fs = require('fs');

const aktien = ['amazon', 'apple', 'microsoft'];

let akObj = {
  name: '',
  isin: '',
  wkn: '',
  symbol: '',
  kurs: 0,
  time: 0,
};

for (let elm of aktien) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.finanzen.net/aktien/${elm}-aktie`);

    //getIsin
    const [el] = await page.$x(
      '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[4]/div/span'
    );
    const isinData = await el.getProperty('textContent');
    const isin = await isinData.jsonValue();
    let info = isin.split(' / ');
    let wkn = info[0].split(': ');
    let is = info[1].split(': ');
    let sym = info[2].split(': ');

    akObj.isin = is[1];
    akObj.wkn = wkn[1];
    akObj.symbol = sym[1];

    //get Kurs
    const [ku] = await page.$x(
      '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[1]/div[1]'
    );
    const kursData = await ku.getProperty('textContent');
    const kurs = await kursData.jsonValue();
    akObj.kurs = kurs;

    // get Name
    // const [n] = await page.$x(
    //   '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[1]/h1'
    // );
    const n = await page.$eval(() =>
      Array.from(
        document.querySelectorAll('.quotebox'),
        (element) => element.textContent
      )
    );
    console.log(n);
    // const nameData = await n.getProperty('textContent');
    // const name = await nameData.jsonValue();
    // akObj.name = name;

    akObj.time = getTime();

    console.log(akObj);

    // fs.appendFileSync('./aktien.json', JSON.stringify(akObj));

    browser.close();
  })();
}

function getTime() {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dateTime = date + ' ' + time;
  return dateTime;
}
