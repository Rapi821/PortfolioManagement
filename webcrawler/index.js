const puppeteer = require('puppeteer');
const { query } = require('./db');
const CronJob = require('cron').CronJob;
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();
const routes = require('./routes');

const aktien = [
  'adidas',
  'airbus',
  'allianz',
  'basf',
  'bayer',
  'beiersdorf',
  'bmw',
  'brenntag',
  'continental',
  'covestro',
  'daimler',
  'delivery_hero',
  'deutsche_bank',
  'deutsche_boerse',
  'deutsche_post',
  'deutsche_telekom',
  'eon',
  'fresenius',
  'fresenius_medical_care',
  'heidelbergcement',
  'hellofresh',
  'henkel_vz',
  'infineon',
  'linde',
  'merck',
  'mtu',
  'munich_re',
  'porsche',
  'puma',
  'qiagen',
  'rwe',
  'sap',
  'sartorius_vz',
  'siemens',
  'siemens_energy',
  'siemens_healthineers',
  'symrise',
  'volkswagen_vz',
  'vonovia',
  'zalando',
];

require('dotenv').config();

let akObj = {
  name: '',
  isin: '',
  wkn: '',
  symbol: '',
  waehrung: '',
  kurs: 0,
  time: 0,
};

//Server API Setup
app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(process.env.PORT);

process.setMaxListeners(Infinity);

// ErrorListener
process.on('unhandledRejection', (err) => errorData(err)
);
// process.on('uncaughtException', (err) => errorData(err));

// Webcrawler

// Cron Jede Stunde crawlen
let job = new CronJob(
  '0 * * * *',
  function () {
    for (let elm of aktien) {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(`https://www.finanzen.net/aktien/${elm}-aktie`, {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0,
      });

      // ISIN, WKN, Symbol holen 
      let [el] = await page.$x(
        '//*[@class="instrument-id"]'
      );
      const isinData = await el.getProperty('textContent');
      const isin = await isinData.jsonValue();
      let info = isin.split(' / ');
      // console.log(info);
      let wkn = info[0].split(': ');
      let is = info[1].split(': ');
      let sym;
      if (info.length < 3) {
        sym = ['', ''];
      } else {
        sym = info[2].split(': ');
      }

      akObj.isin = is[1];
      akObj.wkn = wkn[1];
      akObj.symbol = sym[1];

      // Derzeitigen Kurs bekommen 
      let [ku] = await page.$x(
        '//*[@colspan="4"]'
      );
      
      const kursData = await ku.getProperty('textContent');
      let kurs = await kursData.jsonValue();
      kurs = kurs.split(' ');
      akObj.kurs = parseFloat(kurs[0]).toFixed(2);
      akObj.waehrung = kurs[1];

      // Aktien namen bekommen 
      let [n] = await page.$x(
        '//*[@class="line-height-fix"]'
      );
     
      const nameData = await n.getProperty('textContent');
      let name = await nameData.jsonValue();
      name = name.split(' Aktie');
      akObj.name = name[0];

      // Derzeitiges Datum & Zeit zum Objekt hinzufügen
      akObj.time = getTime();

      console.log(akObj);
      insertData(akObj);

      browser.close();
    })();
  }
},
  'Americas/Vancouver'
);
// job.start();

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
    `INSERT INTO "aktienKurs" (wert, waehrung, zeit, isin) VALUES ($1,$2,$3,$4)`,
    [obj.kurs, obj.waehrung, obj.time, obj.isin]
  );
}

// Error Logger in Datenbank
async function errorData(err) {
  console.log('ERROPR:');
  console.log(err);
  let time = getTime();
  await query(
    `INSERT INTO "error" (err, time) VALUES ($1,$2)`,
    [String(err), time]
  );
  console.log('DONE');
}

//Crawling function
async function crawling() {
  console.log('crawling');
  for (let elm of aktien) {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(`https://www.finanzen.net/aktien/${elm}-aktie`, {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0,
      });

      // ISIN, WKN, Symbol holen 
      let [el] = await page.$x(
        '//*[@class="instrument-id"]'
      );
      const isinData = await el.getProperty('textContent');
      const isin = await isinData.jsonValue();
      let info = isin.split(' / ');
      // console.log(info);
      let wkn = info[0].split(': ');
      let is = info[1].split(': ');
      let sym;
      if (info.length < 3) {
        sym = ['', ''];
      } else {
        sym = info[2].split(': ');
      }

      akObj.isin = is[1];
      akObj.wkn = wkn[1];
      akObj.symbol = sym[1];

      // Derzeitigen Kurs bekommen 
      let [ku] = await page.$x(
        '//*[@colspan="4"]'
      );
      
      const kursData = await ku.getProperty('textContent');
      let kurs = await kursData.jsonValue();
      kurs = kurs.split(' ');
      akObj.kurs = parseFloat(kurs[0]).toFixed(2);
      akObj.waehrung = kurs[1];

      // Aktien namen bekommen 
      let [n] = await page.$x(
        '//*[@class="line-height-fix"]'
      );
     
      const nameData = await n.getProperty('textContent');
      let name = await nameData.jsonValue();
      name = name.split(' Aktie');
      akObj.name = name[0];

      // Derzeitiges Datum & Zeit zum Objekt hinzufügen
      akObj.time = getTime();

      console.log(akObj);
      insertData(akObj);

      browser.close();
    })();
  }
}

crawling();
