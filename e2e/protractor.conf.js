// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { browser } = require('protractor');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 10000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  SELENIUM_PROMISE_MANAGER: false,
  restartBrowserBetweenTests: false,
  capabilities: {
    browserName: 'chrome',
    maxInstances: 1,
    chromeOptions: {
      args: [
          //"--headless",
          "--disable-gpu",
          "--remote-debugging-port=9227",
          "--window-size=1920,1080"
      ]
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
