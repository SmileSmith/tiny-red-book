const puppeteer = require('puppeteer');

let page;

async function init() {
  const launchOption = { args: ['--no-sandbox'] };
  const browser = await puppeteer.launch(launchOption);
  console.log('[Puppteer] Launch Browser');
  page = await browser.newPage();
  console.log('[Puppteer] Open Tab');
}


async function getAntiId() {
  await page.goto('https://www.xiaohongshu.com/discovery/item/5b95fae5910cf61268fdea0c', {
    waitUntil: 'networkidle2',
  });
  console.log('[Puppteer] Go Page');
  const redirectLink = await page.evaluate(() => window.location.href);
  const reg = /(_at=([^&]*))/;
  if (reg.test(redirectLink)) {
    const at = redirectLink.match(reg)[2];
    console.log(`[Puppteer] Output ${at}`);
    return at;
  }
  return null;
}


module.exports = {
  init,
  getAntiId,
};
