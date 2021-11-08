const puppeteer = require('puppeteer');
const { query } = require('./db');
const fs = require('fs');
const CronJob = require('cron').CronJob;

const aktien = ['amazon', 'apple', 'microsoft'];

require('dotenv').config();

const paths = [
  (path1 = {
    isin: '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[2]/div[4]/div/span',
    kurs: '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[2]/div[1]/div[1]',
    name: '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[1]/h1',
  }),
  (path2 = {
    isin: '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[4]/div/span',
    kurs: '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[1]/div[1]',
    name: '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[1]/h1',
  }),
];

let curPath = {
  isin: '',
  kurs: '',
  name: '',
};

let akObj = {
  name: '',
  isin: '',
  wkn: '',
  symbol: '',
  waehrung: '',
  kurs: 0,
  time: 0,
};

// Cron Jede Minute crawlen
let job = new CronJob(
  '* * * * *',
  function () {
    curPath.isin = paths[0].isin;
    curPath.kurs = paths[0].kurs;
    curPath.name = paths[0].name;
    for (let elm of aktien) {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.finanzen.net/aktien/${elm}-aktie`);

        // ISIN, WKN, Symbol holen
        let [el] = await page.$x(
          '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[4]/div/span'
        );
        if (el == undefined) {
          [el] = await page.$x(
            '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[2]/div[4]/div/span'
          );
        }
        const isinData = await el.getProperty('textContent');
        const isin = await isinData.jsonValue();
        let info = isin.split(' / ');
        let wkn = info[0].split(': ');
        let is = info[1].split(': ');
        let sym = info[2].split(': ');

        akObj.isin = is[1];
        akObj.wkn = wkn[1];
        akObj.symbol = sym[1];

        // Derzeitigen Kurs bekommen
        let [ku] = await page.$x(
          '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[1]/div[1]'
        );
        if (ku == undefined) {
          [ku] = await page.$x(
            '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[2]/div[1]/div[1]'
          );
        }
        const kursData = await ku.getProperty('textContent');
        let kurs = await kursData.jsonValue();
        kurs = kurs.split('E');
        akObj.kurs = parseFloat(kurs[0]).toFixed(2);
        akObj.waehrung = 'E' + kurs[1];

        // Aktien namen bekommen
        let [n] = await page.$x(
          '/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[1]/h1'
        );
        if (n == undefined) {
          [n] = await page.$x(
            '/html/body/div[2]/div[1]/div[2]/div[11]/div[1]/div[1]/div[1]/h1'
          );
        }
        const nameData = await n.getProperty('textContent');
        let name = await nameData.jsonValue();
        name = name.split(' ');
        akObj.name = name[0];

        // Derzeitiges Datum & Zeit zum Objekt hinzufügen
        akObj.time = getTime();

        console.log(akObj);
        insertData(akObj);
        // fs.appendFileSync('./aktien.json', JSON.stringify(akObj));

        browser.close();
      })();
    }
  },
  'Americas/Vancouver'
);

job.start();

// Function um Datum & Zeit zu bekommen
function getTime() {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dateTime = date + ' ' + time;
  return dateTime;
}

// Daten in Datenbank einfügen
async function insertData(obj) {
  await query(
    `INSERT INTO aktien (aktien_name, isin, wkn, symbol, kurs, waehrung, zeit) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [obj.name, obj.isin, obj.wkn, obj.symbol, obj.kurs, obj.waehrung, obj.time]
  );
}
