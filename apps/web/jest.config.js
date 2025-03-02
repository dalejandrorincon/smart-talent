export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};
