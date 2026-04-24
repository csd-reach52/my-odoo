export const config = {
  runner: "local",
  port: 4723,
  specs: ["./specs/**/*.js"],
  capabilities: [
    {
      "appium:platformName": "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": "Emulator",
      "appium:app": "./app-uat-debug-52.apk", // Update this path!
    },
  ],
  framework: "mocha",
  reporters: ["spec"],
  services: ["appium"],
};
