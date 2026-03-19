# -*- coding: utf-8 -*-
from odoo.tests import HttpCase, tagged

@tagged('post_install', '-at_install', 'login_tour') # 'login_tour' tag matches your command
class TestLoginTour(HttpCase):

    def test_run_login_tour(self):
        # This command actually starts the JS tour in Headless Chrome
        self.start_tour("/web/login", "login_tour", login="admin")