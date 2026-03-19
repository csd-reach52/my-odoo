import "dotenv/config";
import { Browser, By, Builder } from "selenium-webdriver";
import { waitUntilVisible } from "./utils/utils.js";

const loginUrl = "http://localhost:8069/web/login";
const userName = process.env.ODOO_USERNAME;
const password = process.env.ODOO_PASSWORD;

async function loginTest(driver) {
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
    await driver.get(loginUrl);
    await loginTest(driver);
    await logoutTest(driver);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

// main();

export { loginTest, logoutTest };
