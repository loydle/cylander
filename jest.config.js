module.exports = {
  projects: [
    {
      testEnvironment: 'node',
      testMatch: ['**/tests/node/**/*.test.js'],
    },
    {
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/browser/**/*.test.js'],
    },
  ],
};
