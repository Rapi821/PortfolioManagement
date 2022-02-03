const puppeteer = require('puppeteer');
const { query } = require('./db');
const CronJob = require('cron').CronJob;
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const axios = require('axios');
const cheerio = require('cheerio');

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

const aktienTest = [
  ['adidas', 'airbus', 'allianz', 'basf', 'bayer'],
  ['beiersdorf', 'bmw', 'brenntag', 'continental', 'covestro'],
  [
    'daimler',
    'delivery_hero',
    'deutsche_bank',
    'deutsche_boerse',
    'deutsche_post',
  ],
  [
    'deutsche_telekom',
    'eon',
    'fresenius',
    'fresenius_medical_care',
    'heidelbergcement',
  ],
  ['hellofresh', 'henkel_vz', 'infineon', 'linde', 'merck'],
  ['mtu', 'munich_re', 'porsche', 'puma', 'qiagen'],
  ['rwe', 'sap', 'sartorius_vz', 'siemens', 'siemens_energy'],
  ['siemens_healthineers', 'symrise', 'volkswagen_vz', 'vonovia', 'zalando'],
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

let akArr = [];

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
process.on('unhandledRejection', (err) => errorData(err));
// process.on('uncaughtException', (err) => errorData(err));

// Webcrawler

// Cron Jede Stunde crawlen
let job = new CronJob(
  '0 * * * *',
  function () {
    for (let elm of aktien) {
      (async () => {
        //  Seitenaufruf
        let res = await axios(`https://www.finanzen.net/aktien/${elm}-aktie`);
        const html = res.data;
        const $ = cheerio.load(html);

        // ISIN, WKN, Symbol holen

        const isin = $('.instrument-id', html).text();
        let info = isin.split(' / ');
        let wkn = info[0].split(': ');
        let is = info[1].split(': ');
        if (info.length < 3) {
          sym = ['', ''];
        } else {
          sym = info[2].split(': ');
        }

        akObj.isin = is[1];
        akObj.wkn = wkn[1];
        akObj.symbol = '';

        const kursData = $('.quotebox', html).text();
        let kurs = kursData.split('E');
        akObj.kurs = Number(kurs[0]);
        akObj.waehrung = 'EUR';

        let name = $('.line-height-fix', html).text();
        name = name.split(' Aktie');
        akObj.name = name[0];

        // Derzeitiges Datum & Zeit zum Objekt hinzufügen
        akObj.time = getTime();

        console.log(akObj);
        insertData(akObj);
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
  await query(`INSERT INTO "error" (err, time) VALUES ($1,$2)`, [
    String(err),
    time,
  ]);
  console.log('DONE');
}

//Crawling function
async function crawling() {
  console.log('crawling');
  for (let elm of aktien) {
    (async () => {
      //  Seitenaufruf
      let res = await axios(`https://www.finanzen.net/aktien/${elm}-aktie`);
      const html = res.data;
      const $ = cheerio.load(html);

      // ISIN, WKN, Symbol holen

      const isin = $('.instrument-id', html).text();
      let info = isin.split(' / ');
      let wkn = info[0].split(': ');
      let is = info[1].split(': ');
      if (info.length < 3) {
        sym = ['', ''];
      } else {
        sym = info[2].split(': ');
      }

      akObj.isin = is[1];
      akObj.wkn = wkn[1];
      akObj.symbol = '';

      const kursData = $('.quotebox', html).text();
      let kurs = kursData.split('E');
      akObj.kurs = parseFloat(kurs[0]).toFixed(2);
      akObj.waehrung = 'EUR';

      let name = $('.line-height-fix', html).text();
      name = name.split(' Aktie');
      akObj.name = name[0];

      // Derzeitiges Datum & Zeit zum Objekt hinzufügen
      akObj.time = getTime();
      // akArr.push(akObj);
      console.log(akObj);
      // console.log(akArr);
      // console.log(akArr.length);
      insertData(akObj);
    })();
    // insertDataArr(akArr);
  }
}

async function insertDataArr(Arr) {
  for (let el of Arr) {
    await query(
      `INSERT INTO "aktienKurs" (wert, waehrung, zeit, isin) VALUES ($1,$2,$3,$4)`,
      [el.kurs, el.waehrung, el.time, el.isin]
    );
  }
  akArr = [];
}
crawling();
