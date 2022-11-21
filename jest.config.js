/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/setup/setupTests.ts"],
  verbose: true,
  clearMocks: true,
  testMatch: ["**/**/*.test.ts"],
};
