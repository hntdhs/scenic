import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import puppeteer from 'puppeteer-core'
import { loginTest } from "../login_test.js";


  let browser;
  let page;

  beforeEach(async () => {
  browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  page = await loginTest(browser);
});

afterEach(async () => {
  await browser.close()
});

  // it("shows up on a user's profile page when they favorite a byway", async () => {
  //   await page.goto('http://localhost:3000/byways/Wichita%20Mountains%20Byway');
  //   await page.waitForNavigation()

  //   await page.type('#comment_form', 'integration testing');

  //   await Promise.all([
  //     page.click('comment_submit'),
  //     await page.waitForNavigation()
  //   ]);
  //   await expect(page.url()).toContain('integration testing')
  // })