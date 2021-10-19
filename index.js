const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.finanzen.net/aktien/apple-aktie');
  const [el] = await page.$x('//*[@id="header_pricebox_frame"]');
  const inData = await el.getProperty('textContent');
  const isin = await inData.jsonValue();
  console.log(isin);
  await browser.close();
})();

