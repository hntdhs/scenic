// / @type {import('jest').Config} /
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
    // Jest configuration options...
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "esbuild-jest",
    // "^.+\\.css$": "jest-css-modules-transform",
  },
};

