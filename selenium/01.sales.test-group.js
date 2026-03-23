import "dotenv/config";
import { Builder, By, until } from "selenium-webdriver";
import { loginTest, logoutTest } from "./lib_auth.js";
import { waitUntilVisible } from "./utils/utils.js";
const salePathURL = `${process.env.UAT_ODOO_URL}/odoo/sales`;

async function clickCompanyByName(driver, name) {
  try {
    // locate company switch
    const menu = await waitUntilVisible(
      driver,
      By.css(".o_switch_company_menu"),
      10000,
    );
    await menu.click();

    // locate company menu item by name
    const companyXpath = `//span[contains(@class, 'company_label') and normalize-space(text())='${name}']`;

    const companyItem = await waitUntilVisible(
      driver,
      By.xpath(companyXpath),
      5000,
    );

    console.log(`Selecting company: ${name}`);
    await companyItem.click();

    // the same url but waiting for the old dom to be replaced
    await driver.wait(until.stalenessOf(companyItem), 10000);
  } catch (error) {
    console.error(`Could not select company "${name}":`, error.message);
  }
}

async function main() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    // login
    await loginTest(driver);
    // sale path
    await driver.get(salePathURL);

    // switch company
    await clickCompanyByName(driver, "reach52 Kenya");

    // switch another
    await clickCompanyByName(driver, "reach52 India");

    // logout
    await logoutTest(driver);

    console.log("Tour completed successfully.");
  } catch (err) {
    console.error("Tour failed:", err);
  } finally {
    await driver.quit();
  }
}

main();
