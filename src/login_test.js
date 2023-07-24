const loginTest = async ( browser) => {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  await page.type('#password', 'atlantic');
  await page.type('#username', 'atlantic');
  console.log('logging in')
  await page.click('#loginSubmit')
  await page.waitForNavigation()
  return page
}

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

const clickByText = async function(page, text, element) {
  element = element || 'a';
  const escapedText = escapeXpathString(text);
  const xpath = `//${element}[text()[contains(${escapedText})]]`;
  console.log(xpath)
  const elements = await page.$x(xpath);
  if(elements.length > 0) {
      for(i in elements) {
          e = elements[i];
          if(await e.isIntersectingViewport()) {
              await e.click();
              return;
          }
      }
  }
  else {
      console.log(xpath);
  }
  throw new Error(`Link not found: ${text}`);
};

export {loginTest, clickByText}