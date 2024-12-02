import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "json", "ts", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
