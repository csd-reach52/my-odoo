/** @odoo-module **/
import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("my_first_tour", {
  url: "/web",
  steps: () => [
    {
      trigger: '.o_menu_sections [data-menu-xmlid="base.menu_administration"]',
      content: "Click on Settings",
      run: "click",
    },
    // Add more steps here
  ],
});
