require("dotenv").config();
const { Browser, By, Builder, until } = require("selenium-webdriver");

const loginUrl = "http://localhost:8069/web/login";
const userName = process.env.ODOO_USERNAME;
const password = process.env.ODOO_PASSWORD;

(async function () {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get(loginUrl);

    // log in
    userNameInput = await waitUntilVisible(driver, By.id("login"));
    passwordInput = await waitUntilVisible(driver, By.id("password"));
    let loginButton = await waitUntilVisible(
      driver,
      By.xpath("//button[text()='Log in']"),
    );

    await userNameInput.clear();
    await passwordInput.clear();
    await userNameInput.sendKeys(userName);
    await passwordInput.sendKeys(password);
    await loginButton.click();

    console.log("Login successful!", { userName, password });

    // // log out started

    // 1. Click the avatar to open the menu
    let avatar = await waitUntilVisible(driver, By.css('img[alt="User"]'));
    await avatar.click();

    // 2. Wait for the logout link to be visible in the dropdown
    let logout = await waitUntilVisible(driver, By.linkText("Log out"));
    await logout.click();

    console.log("Logout successful!");
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();

async function waitUntilVisible(
  driver,
  elementLocator,
  { locatedTimeout = 5000, visibleTimeout = 5000 } = {},
) {
  const element = await driver.wait(
    until.elementLocated(elementLocator),
    locatedTimeout,
  );
  return driver.wait(until.elementIsVisible(element), visibleTimeout);
}
