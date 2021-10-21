const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.finanzen.net/aktien/amazon-aktie');
  const [el] = await page.$x('/html/body/div[2]/div[1]/div[2]/div[9]/div[1]/div[1]/div[2]/div[4]/div/span');
  const inData = await el.getProperty('textContent');
  const isin = await inData.jsonValue();
  console.log(isin);
  await browser.close();
})();

