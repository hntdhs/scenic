import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../testUtils";

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close()
});

it("updates the profile page on submission", async () => {
  
    await page.goto('http://localhost:3000/profile');
  
    await page.type('#bio', 'integration testing');
// problem - when I add an id to the submit button in the JSX, it makes the snapshot test fail
  
    await Promise.all([
      page.click('#save'),
      await page.waitForNavigation()
    ]);
    await expect(page.url()).toMatch('http://localhost:3000/username');
    await expect(page.url()).toContain('integration testing');
// question - how do I determine username?
// what would be the way to test if what I added for bio is appearing on the profile page - expect(page.url).toContain('')
  
  });




// it("login succesfully", async () => {
  
//     await page.goto('http://localhost:3000/login');
  
//     await page.type('#password', 'atlantic');
//     await page.type('#username', 'atlantic');
  
//     await Promise.all([
//       page.click('#loginSubmit'),
//       await page.waitForNavigation()
//     ]);
//     await expect(page.url()).toMatch('http://localhost:3000')
  
//   });