const puppeteer = require('puppeteer');
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('requestfailed', request => {
      console.log('REQUEST FAILED:', request.url(), request.failure() ? request.failure().errorText : 'Unknown');
    });
    page.on('response', response => {
      if(!response.ok()) {
        console.log('BAD RESPONSE:', response.url(), response.status());
      }
    });

    console.log('Navigating...');
    await page.goto('https://krishnascale.in/admin', {waitUntil: 'networkidle2'});
    console.log('Loaded page.');
    
    await wait(2000);
    await page.type('input[placeholder="Username"]', 'madhav');
    await page.type('input[placeholder="Password"]', 'MADmak@21');
    await page.click('button[type="submit"]');
    
    console.log('Clicked login.');
    await wait(2000);
    
    const emailInput = await page.$('input[type="email"]');
    if(emailInput) {
      await emailInput.type('test@test.com');
      console.log('Typed email.');
    } else {
      console.log('Could not find email input.');
    }
    
    await wait(4000);
    await browser.close();
    console.log('Done.');
  } catch(e) {
    console.error('SCRIPT ERROR:', e);
  }
})();
