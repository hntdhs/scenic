import React from "react";
import { render } from "@testing-library/react";
import FavoriteAByway from "./FavoriteAByway.js"
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import puppeteer from 'puppeteer-core'
import { loginTest } from "../login_test.js";

jest.setTimeout(20000)



  let browser;
  let page;

  beforeEach(async () => {
  browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  page = await loginTest(browser);
  
});

afterEach(async () => {
  await browser.close()
});


  it("shows up on a user's profile page when they favorite a byway", async () => {
    
    await page.goto('http://localhost:3000/byways/Wichita%20Mountains%20Byway');
    await page.waitForNavigation()
    
    page.click('#submit_favorite'),
    await page.waitForNavigation()
    
    await expect(page.url()).toContain('added to favorites')
  })
// is this in the right spot or should it be in byway detail?
// don't know if I need that page.waitForNavigation if I'm staying on the same page, and not sure if that expect page url is right for this either






//   let browser;
// let page;

// beforeEach(async () => {
//   browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
//   page = await browser.newPage();
// });

// afterEach(async () => {
//   await browser.close()
// });

// // if a component renders a link or a route, etc, you'll get a warning about context unless you wrap the unit test in a router component like Memory Routeer
// it("login succesfully", async () => {
  
//   await page.goto('http://localhost:3000/login');

//   await page.type('#password', 'atlantic');
//   await page.type('#username', 'atlantic');

//   await Promise.all([
//     page.click('#loginSubmit'),
//     await page.waitForNavigation()
//   ]);
//   await expect(page.url()).toMatch('http://localhost:3000')

// });