// / @type {import('jest').Config} /
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
    // Jest configuration options...
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  preset: 'jest-puppeteer'
};

