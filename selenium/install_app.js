import { Builder, By, until } from "selenium-webdriver";
import "dotenv/config";
import { loginTest } from "./login-test.js";
import { expectCheck, waitUntilVisible,  } from "./utils/utils.js";

const pathUrl = `${process.env.ODOO_URL}/odoo/apps`;

async function activateApp(driver, appTitle, skipInstall = false) {
  // check kanban view is visible
  await waitUntilVisible(driver, By.css(".o_kanban_view"));
  
  // find activate button
  const appActivateButtonXPath = By.xpath(
    `//main[@title='${appTitle}']//button[contains(normalize-space(.), 'Activate')]`,
  );

  if (!skipInstall) {
    const activateButton = await waitUntilVisible(
      driver,
      appActivateButtonXPath,
    );

    console.log(`Clicking Activate for ${appTitle}...`);
    await activateButton.click();

    // wait for redirect
    console.log("Waiting for Odoo to process installation and redirect...");
    await driver.wait(until.urlMatches(/\/odoo\/(?!apps)/), 20000);

    // wait for the page to fully load after redirect
    await driver.wait(async () => {
      const state = await driver.executeScript("return document.readyState");
      return state === "complete";
    }, 15000);

    // click home menu
    const homeMenu = await waitUntilVisible(
      driver,
      By.css(".o_navbar_apps_menu button"),
    );
    await homeMenu.click();

    // click apps menu item
    const appMenuItem = await waitUntilVisible(
      driver,
      By.xpath(
        "//a[contains(@class, 'dropdown-item') and contains(text(), 'Apps')]",
      ),
    );
    await appMenuItem.click();
  }

  const finalCheck = await driver.findElements(appActivateButtonXPath);

  expectCheck(
    finalCheck.length === 0,
    `'Activate' button is confirmed GONE for ${appTitle}.`,
    `'Activate' button is still present for ${appTitle}.`,
  );
 
  console.log(`${appTitle} activation sequence completed successfully.`);
}

async function main() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(pathUrl);
    await loginTest(driver);
    await activateApp(driver, "Fleet");
  } catch (error) {
    console.error("Tour failed:", error);
  } finally {
    await driver.quit();
  }
}

main();
