/** @odoo-module **/

import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("login_tour", {
  url: "/web/login",
  test: true,
  steps: () => [
    {
      trigger: ".oe_login_form",
      content: "Check we are on login page",
    },
    {
      trigger: 'input[name="login"]',
      content: "Fill login",
      run: "text csd@reach52.com",
    },
    {
      trigger: 'input[name="password"]',
      content: "Fill password",
      run: "text asd123!@#X",
    },
    {
      trigger: 'button[type="submit"]',
      content: "Submit login form",
      run: "click",
    },
    {
      trigger: ".o_main_navbar",
      // Increase timeout if the server is slow to log in
      timeout: 10000,
      content: "Wait for home screen",
      run: () => {
        console.log("Login Successful");
      },
    },
  ],
});
