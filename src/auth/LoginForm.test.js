import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import { ToastProvider } from 'react-toast-notifications';
import puppeteer from 'puppeteer-core'



// if a component renders a link or a route, etc, you'll get a warning about context unless you wrap the unit test in a router component like Memory Routeer
it("login succesfully", async () => {
  const browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  await page.type('#password', 'atlantic');
  await page.type('#username', 'atlantic');

  await Promise.all([
    page.click('#loginSubmit'),
    await page.waitForNavigation()
  ]);
  await expect(page.url()).toMatch('http://localhost:3000')

});

// if a component renders a link or a route, etc, you'll get a warning about context unless you wrap the unit test in a router component like Memory Routeer
it("login unsuccessfully", async () => {
  const browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  await page.type('#password', 'atlantic');
  await page.type('#username', 'atlantic1');

  await Promise.all([
    page.click('#loginSubmit'),
  ]);
  await expect(page.url()).toMatch('http://localhost:3000/login')

});