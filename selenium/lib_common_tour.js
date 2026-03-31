import {By, until} from "selenium-webdriver";
import { waitUntilVisible } from "./utils/utils.js";

async function clickCompanyByName(driver, name) {
  try {
    // locate company switch
    const menu = await waitUntilVisible(
      driver,
      By.css(".o_switch_company_menu"),
    );
    await menu.click();

    // locate company menu item by name
    const companyXpath = `//span[contains(@class, 'company_label') and normalize-space(text())='${name}']`;

    const companyItem = await waitUntilVisible(
      driver,
      By.xpath(companyXpath),
    );

    console.log(`Selecting company: ${name}`);
    await companyItem.click();

    // the same url but waiting for the old dom to be replaced
    await driver.wait(until.stalenessOf(companyItem), 10000);
  } catch (error) {
    console.error(`Could not select company "${name}":`, error.message);
  }
}


export { clickCompanyByName };