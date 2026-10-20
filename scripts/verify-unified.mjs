setTimeout(() => { console.error("Overall browser check timed out"); process.exit(2); }, 180000).unref();
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.MIO_BASE_URL || 'http://127.0.0.1:5174';
const output = 'merge-review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.MIO_CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined) });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(15000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const open = async route => {
  console.log('Checking ' + route);
  await page.goto(base + route, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('#root')?.textContent.length > 50 && !document.querySelector('#root [aria-busy="true"]'));
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve,1500))]));
};
const frame = async (selector,name) => { await page.locator(selector).evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 95, behavior: 'instant' })); await page.waitForTimeout(850); await page.screenshot({ path: `${output}/${name}.png` }); };
try {
  await open('/');
  assert.equal(await page.locator('h1').count(),1);
  assert.match(await page.locator('h1').innerText(),/Just ask Mio/);
  assert.equal(await page.locator('.coverage-card').count(),10);
  assert.equal(await page.locator('.journey-card').count(),8);
  assert.equal(await page.locator('.engine-grid article').count(),6);
  assert.ok(await page.locator('.portrait-frame img').evaluate(img => img.complete && img.naturalWidth > 0));
  await page.screenshot({ path: `${output}/hero-preserved.png` });
  await frame('#all-services','all-services');
  await frame('#mobile-flows','mobile-journeys');
  await page.getByRole('button',{name:'Next mobile journeys'}).click();
  await page.waitForTimeout(500);
  assert.ok(await page.locator('.journey-grid').evaluate(el => el.scrollLeft > 0));
  await frame('#ecosystem','partner-ecosystem');
  await frame('#in-store','easytap');
  await page.getByRole('button',{name:/Review every detail/}).click();
  assert.match(await page.locator('.tap-mini-phone').innerText(),/Always your call/);
  await page.locator('.coverage-card[href*="module=hotels"]').click();
  assert.match(await page.locator('h3').first().innerText(),/Hotels/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open('/providers?q=Amazon');
  assert.equal(await page.locator('.integration-card').count(),1);
  await page.getByRole('button',{name:'Explore Amazon application',exact:true}).click();
  assert.ok(await page.getByRole('dialog').isVisible());
  assert.ok(await page.getByRole('button',{name:'Save application interest',exact:true}).isDisabled());
  await page.screenshot({ path: `${output}/partner-application.png` });
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(),0);
  for (const alias of ['/integrations','/partners']) { await open(alias); assert.equal(new URL(page.url()).pathname,'/providers'); }
  await open('/search?q=running%20shoes%20under%20%24150');
  await page.locator('.sample-result-grid article').first().waitFor();
  assert.match(await page.locator('.sample-result-grid').innerText(),/Nike Air Max/);
  const prices = await page.locator('.sample-result-grid footer > b').allTextContents();
  assert.ok(prices.every(text => Number(text.replace(/[^\d.]/g,'')) <= 150));
  await page.screenshot({ path: `${output}/sample-search.png` });
  await open('/voice');
  assert.match(await page.locator('h1').innerText(),/Say it your way/);
  await open('/dashboard');
  assert.equal(new URL(page.url()).pathname,'/signin');
  assert.ok(await page.locator('button[type=submit]').isDisabled());
  await open('/commissions');
  await page.getByRole('button',{name:'pending',exact:true}).click();
  assert.equal(await page.locator('tbody tr').count(),2);
  for (const route of ['/features','/onboarding','/easytap','/developers','/widget','/settings','/merchant','/admin','/about','/pricing','/privacy','/terms','/checkout']) {
    await open(route);
    assert.ok(await page.locator('h1,h2').count() > 0, `${route} should render`);
  }
  const responsive = [];
  for (const width of [390,820,1440]) {
    await page.setViewportSize({width,height:1000});
    await open('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    responsive.push({width,overflow});
    assert.equal(overflow,false,`Home overflow at ${width}px`);
    if(width===390) await page.screenshot({path:`${output}/mobile-hero.png`});
  }
  await page.emulateMedia({ reducedMotion:'reduce' });
  await open('/');
  assert.equal(await page.locator('.float-request').evaluate(el => getComputedStyle(el).animationName),'none');
  assert.deepEqual(errors,[]);
  const report = {passed:true, homeModules:10, mobileJourneys:8, engineFeatures:6, providerAliases:['/integrations','/partners'], samplePriceFilter:true, partnerDialog:true, accountGuard:true, responsive, browserErrors:errors};
  await writeFile(`${output}/verification.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
} finally { await browser.close(); }
