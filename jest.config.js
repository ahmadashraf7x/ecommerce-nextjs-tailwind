/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^store-redux/(.*)$": "<rootDir>/store-redux/$1",
    "^@/(.*)$": "<rootDir>/app/$1",
  },
};
