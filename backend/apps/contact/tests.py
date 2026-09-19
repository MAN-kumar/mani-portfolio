from django.test import TestCase
from .models import ContactMessage


class ContactMessageModelTests(TestCase):
    def test_contact_message_creation(self):
        msg = ContactMessage.objects.create(
            name="Alice",
            email="alice@example.com",
            message="Hello Mani, loved your portfolio!",
            status="new",
        )
        self.assertIsNotNone(msg.id)
        self.assertEqual(str(msg), "Message from Alice (alice@example.com)")
