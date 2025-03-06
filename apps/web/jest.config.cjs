/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@hooks$": "<rootDir>/src/hooks",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@types$": "<rootDir>/src/types",
    "^ui-library$": "<rootDir>/../../packages/ui-library/src",
  },
  transformIgnorePatterns: ["/node_modules/(?!ui-library).+\\.js$"],
};
