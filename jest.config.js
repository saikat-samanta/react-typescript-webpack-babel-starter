/**
 * Jest configuration for running tests in the project.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  // A list of paths to modules that run some code to configure or
  // set up the testing framework before each test file in the suite is
  // run. Since we are using React Testing Library, we need to import
  // the 'jest-dom' module to add custom matchers for
  // assertions.
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"],

  // The test environment that will be used for testing.
  testEnvironment: "jest-environment-jsdom",

  // Whether to collect coverage information while running the test.
  collectCoverage: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: "coverage",

  // The coverage provider that should be used to calculate coverage.
  coverageProvider: "v8",

  // An array of glob patterns indicating a set of files for
  // which coverage information should be collected.
  // collectCoverageFrom: ["./src/app/**/components/**/*.{ts,tsx}"],

  // An array of regexp pattern strings used to ignore coverage
  // information from any files.
  coveragePathIgnorePatterns: [
    ".stories.(ts|tsx)$",
    ".test.(ts|tsx)$",
    "index.(ts|tsx)$",
    "./src/app/modules/auth/components",
    "/node_modules/",
    "_metronic/",
  ],

  // A list of reporter names that Jest uses when writing coverage
  // reports.
  coverageReporters: ["html"],

  // An object that configures how modules are transformed.
  transform: {
    // Use ts-jest to transform TypeScript or Javascript test files.
    "^.+\\.(ts|tsx|js|jsx|mjs)$": [
      "ts-jest",
      {
        tsconfig: true,
        babelConfig: true, // If you're also using Babel
      },
    ],
  },

  // An array of regexp pattern strings that are matched against all
  // test paths before transforming them. If the test path matches
  // any of the patterns, it will be skipped by the transformer.
  transformIgnorePatterns: ["/node_modules/"],

  // A map from regular expressions to module names or to arrays
  // of module names that allow to stub out resources with a single
  // module.
  moduleNameMapper: {
    // To prevent the test runner from trying to transpile CSS modules,
    // we need to map them to the identity function.
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
};
