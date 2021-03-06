const puppeteer = require('puppeteer');
async function grabData(page, url){
  await page.goto(url, {waitUntil: 'networkidle2'});

  const data = await page.evaluate(async () => {
    var cali = Array.from(document.querySelectorAll("td")).find(x => x.innerText == "California");
    var button = cali
    .parentNode
    .parentNode
    .parentNode
    .parentNode
    .querySelector('button');

    await button.click();

    var states = cali
    .parentNode
    .parentNode
    .querySelectorAll("td");

    var data = Array.from(states).map(x => x.innerText);

    var hashMap = {}

    for(i=0; i<data.length; i=i+3){
      hashMap[data[i]] = {'confirmed':data[i+1], 'deaths':data[i+2]}
    }

    return hashMap;
  });

  return data;
}


(async () => {
  const browser = await puppeteer.launch({headless: process.env.HEADLESS});
  const page = await browser.newPage();
  const url = 'https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html';
  const cases = await grabData(page, url);
  console.log(JSON.stringify(cases));
  await browser.close();
})();
