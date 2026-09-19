from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class HealthCheckTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_check_endpoint(self):
        url = reverse("v1:health")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("status"), "ok")
        self.assertEqual(response.data.get("service"), "mani-portfolio-backend")
        self.assertEqual(response.data.get("version"), "1.0.0")

    def test_health_check_no_secret_leakage(self):
        url = reverse("v1:health")
        response = self.client.get(url)
        payload = str(response.data)
        self.assertNotIn("SECRET_KEY", payload)
        self.assertNotIn("DATABASES", payload)
        self.assertNotIn("DB_PASSWORD", payload)
