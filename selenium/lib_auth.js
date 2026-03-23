import "dotenv/config";
import { Browser, By, Builder } from "selenium-webdriver";
import { waitUntilVisible } from "./utils/utils.js";

const loginUrl = `${process.env.UAT_ODOO_URL}/web/login`;
const userName = process.env.UAT_ODOO_USERNAME;
const password = process.env.UAT_ODOO_PASSWORD;

async function isLoggedIn(driver) {
  try {
    await waitUntilVisible(driver, By.css('img[alt="User"]'));
    return true;
  } catch (error) {
    return false;
  }
}

async function loginTest(driver) {
  await driver.get(loginUrl);
  // log in
  const userNameInput = await waitUntilVisible(driver, By.id("login"));
  const passwordInput = await waitUntilVisible(driver, By.id("password"));
  const loginButton = await waitUntilVisible(
    driver,
    By.xpath("//button[text()='Log in']"),
  );

  await userNameInput.clear();
  await passwordInput.clear();
  await userNameInput.sendKeys(userName);
  await passwordInput.sendKeys(password);
  await loginButton.click();
  console.log("Login successful!", { userName, password });
}
async function logoutTest(driver) {
  // // log out started

  await driver.get(loginUrl);
  // 1. Click the avatar to open the menu
  const avatar = await waitUntilVisible(driver, By.css('img[alt="User"]'));
  await avatar.click();

  // 2. Wait for the logout link to be visible in the dropdown
  const logout = await waitUntilVisible(driver, By.linkText("Log out"));
  await logout.click();

  console.log("Logout successful!");
}

async function main() {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log("Full URL being sent to Selenium:", loginUrl);
    await loginTest(driver);
    await logoutTest(driver);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

// main();

export { loginTest, logoutTest, isLoggedIn };
