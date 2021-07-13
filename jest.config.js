const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  setupFiles: ['<rootDir>/src/jest.setupBeforeEnv.js'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setupAfterEnv.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testMatch: ["**/src/test/**/*test*.[jt]s?(x)"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testEnvironment: 'jsdom',
};
