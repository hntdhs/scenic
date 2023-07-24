import React from "react";
import { render } from "@testing-library/react";
import StateMenu from "./StateMenu";
import puppeteer from 'puppeteer-core'
import { loginTest, clickByText } from "../login_test.js";


let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  page = await loginTest(browser);
});

afterEach(async () => {
  await browser.close()
});

it("goes to state page when state is clicked on", async () => {
    await page.goto('http://localhost:3000/states');
    await page.waitForNavigation()
    await clickByText(page, 'Alabama');

    await expect(page.url()).toMatch('http://localhost:3000/states/Alabama')
})
