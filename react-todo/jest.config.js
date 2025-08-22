export default {
  testEnvironment: "jsdom", // allows document/window in tests
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest" // use Babel for JSX/ESM
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"] // adds custom matchers like toBeInTheDocument
};
