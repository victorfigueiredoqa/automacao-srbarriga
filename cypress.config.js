const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  video: true,
  videoCompression: 32,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    setupNodeEvents(on, config) {
      // Registra o plugin do Allure
      allureWriter(on, config);
      return config;
    },
    baseUrl: "https://seubarriga.wcaquino.me/login",
  },
  env: {
    allure: true,
    allureResultsPath: "allure-results",
  },
});
