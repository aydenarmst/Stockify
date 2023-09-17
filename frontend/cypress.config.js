const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'etbx4a',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
