const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://seubarriga.wcaquino.me/login",
    
    setupNodeEvents(on, config) {
      // Registra o plugin do Allure
      allureWriter(on, config);
      return config;
    }
  },

  env: {
    allure: true,
    allureResultsPath: "allure-results",
  },
});
