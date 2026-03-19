from odoo.tests import HttpCase, tagged


@tagged("post_install", "-at_install")
class TestLoginTour(HttpCase):

    def test_01_login_tour(self):
        """Run the login tour."""
        # Start the tour
        self.start_tour("/web", "login_tour", login=None)
