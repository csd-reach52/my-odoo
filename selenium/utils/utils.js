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

export { waitUntilVisible };
