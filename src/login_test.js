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

function getText(linkText) {
  linkText = linkText.replace(/\r\n|\r/g, "\n");
  linkText = linkText.replace(/\ +/g, " ");

  // Replace &nbsp; with a space 
  var nbspPattern = new RegExp(String.fromCharCode(160), "g");
  return linkText.replace(nbspPattern, " ");
}

async function findByLink(page, linkString) {
  const links = await page.$$('a')
  for (var i=0; i < links.length; i++) {
    let valueHandle = await links[i].getProperty('innerText');
    let linkText = await valueHandle.jsonValue();
    const text = getText(linkText);
    if (linkString.includes(text)) {
      console.log(linkString);
      console.log(text);
      console.log("Found");
      return links[i];
    }
    return null;
  }
}

const clickByText = async function(page, text, element) {
  const link = await findByLink(page, text)
  console.log('found', link)
  if (link) {
    await link.click()
  }
}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}

export {loginTest, clickByText, delay} 