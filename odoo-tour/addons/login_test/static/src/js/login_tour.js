odoo.define("login_test.login_tour", function (require) {
  "use strict";

  const { Tour } = require("web.Tour");
  const tour = Tour.register({
    id: "login_tour",
    name: "Login test tour",
    mode: "test", // run only in test mode
    steps: [
      {
        title: "Check we are on login page",
        element: ".oe_login_form",
      },
      {
        title: "Fill login",
        element: 'input[name="login"]',
        run: "text csd@reach52.com",
      },
      {
        title: "Fill password",
        element: 'input[name="password"]',
        run: "text asd123!@#X",
      },
      {
        title: "Submit login form",
        element: 'button[type="submit"]',
        run: "click",
      },
      {
        title: "Wait for home screen",
        element: ".o_user_menu",
        // The presence of the user menu indicates a successful login
      },
    ],
  });

  return tour;
});
