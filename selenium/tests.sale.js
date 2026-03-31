import "dotenv/config";
import { Builder, By } from "selenium-webdriver";
import { loginTest } from "./lib_auth.js";
import { clickCompanyByName } from "./lib_common_tour.js";
import { waitUntilVisible, expectCheck } from "./utils/utils.js";
import { Key } from "selenium-webdriver";
const baseSaleURL = `${process.env.UAT_ODOO_URL}/odoo/sales/`;

console.log("Mocha is loading this file!");

describe("New Sales Suite", function () {
  let driver;
  let newSaleURL = baseSaleURL + "new";

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await loginTest(driver);
    await clickCompanyByName(driver, "reach52 India");
    await driver.get(newSaleURL);
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  this.beforeEach(async function () {
    const customerInput = await waitUntilVisible(driver, By.id("partner_id_0"));
    await customerInput.click();
    const customerOption = await waitUntilVisible(
      driver,
      By.id("partner_id_0_0_0"),
    );
    await customerOption.click();

    const addProduct = await waitUntilVisible(
      driver,
      By.linkText("Add a product"),
    );
    await addProduct.click();

    const productSearch = await waitUntilVisible(
      driver,
      By.css('input[placeholder="Search a product"]'),
    );
    await productSearch.click();

    const productOption = await waitUntilVisible(
      driver,
      By.id("autocomplete_0_2"),
    );
    await productOption.click();
  });

  it("SN1: As an ERP user, I should not be able to confirm a sales order if the quantity is zero.", async function () {
    const qtyInput = await waitUntilVisible(
      driver,
      By.css('div[name="product_uom_qty"] input'),
    );
    await qtyInput.click();

    await qtyInput.sendKeys(Key.CONTROL, "a");
    await qtyInput.sendKeys(Key.BACK_SPACE);
    await qtyInput.sendKeys("0");
    await qtyInput.sendKeys(Key.TAB);
    const qtyContainer = await driver.findElement(
      By.css('div[name="product_uom_qty"]'),
    );
    const classes = await qtyContainer.getAttribute("class");
    const isInvalid = classes.includes("o_field_invalid");

    expectCheck(
      isInvalid,
      "Quantity field correctly showed validation error.",
      "Quantity field allowed 0 without showing o_field_invalid class!",
    );
  });

  it("SN2: As an ERP user, I should have the ability to see the unit price automatically populated from the product template.", async function () {
    const unitPriceInput = await waitUntilVisible(
      driver,
      By.css('div[name="price_unit"] input'),
    );

    await driver.wait(
      async () => {
        const value = await unitPriceInput.getAttribute("value");
        return value !== "0.00" && value !== "" && value !== "0";
      },
      10000,
      "Price Unit failed to auto-populate after 10 seconds",
    );

    const finalPrice = await unitPriceInput.getAttribute("value");
    console.log(`✅ Success: Price auto-populated to ${finalPrice}`);

    expectCheck(
      parseFloat(finalPrice) > 0,
      "Price is greater than zero",
      "Price is still zero!",
    );
  });
});
