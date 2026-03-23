import { until } from "selenium-webdriver";
async function waitUntilVisible(
  driver,
  elementLocator,
  { locatedTimeout = 10000, visibleTimeout = 10000 } = {},
) {
  const element = await driver.wait(
    until.elementLocated(elementLocator),
    locatedTimeout,
  );
  return driver.wait(until.elementIsVisible(element), visibleTimeout);
}

function expectCheck(condition, successMessage, failureMessage) {
  if (condition) {
    console.log(`✅ ${successMessage}`);
  } else {
    throw new Error(`❌ ${failureMessage}`);
  }
}

export { waitUntilVisible, expectCheck };
