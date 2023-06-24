// /* @type {import('jest').Config} /
const config = {
  verbose: true,
};

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'esbuild-jest',
  },
}

module.exports = config;