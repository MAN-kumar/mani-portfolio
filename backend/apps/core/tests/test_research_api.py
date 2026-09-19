import json
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.research.models import Research, ResearchCategory, Dataset, Experiment, ExperimentResult, Publication


class ResearchApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = ResearchCategory.objects.create(name="Deep Learning", slug="deep-learning")
        self.research = Research.objects.create(
            title="Transformer Optimization",
            slug="transformer-optimization",
            category=self.category,
            abstract="Optimizing attention layers",
            year=2026,
            status="completed",
            featured=True,
            published=True,
        )
        self.dataset = Dataset.objects.create(
            research=self.research,
            name="WikiText Benchmark",
            format="JSON",
        )
        self.experiment = Experiment.objects.create(
            research=self.research,
            name="Attention Mutagenesis",
            model="BERT-Base",
            parameters={"heads": 12, "layers": 12},
        )
        self.result = ExperimentResult.objects.create(
            experiment=self.experiment,
            metric="Accuracy",
            value="94.5",
            unit="%",
        )
        self.publication = Publication.objects.create(
            research=self.research,
            title="Efficient Attention Mechanism",
            venue="NeurIPS 2026",
            status="published",
        )

    def test_research_list_pagination_and_envelope(self):
        url = reverse("v1:research-list")
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("data", res.data)
        self.assertIn("meta", res.data)
        self.assertEqual(res.data["meta"]["count"], 1)

    def test_research_detail_valid_slug_and_nested_serialization(self):
        url = reverse("v1:research-detail", kwargs={"slug": "transformer-optimization"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        content = json.loads(res.content)
        self.assertIn("data", content)
        self.assertEqual(content["data"]["title"], "Transformer Optimization")
        self.assertEqual(len(content["data"]["datasets"]), 1)
        self.assertEqual(len(content["data"]["experiments"]), 1)
        self.assertEqual(content["data"]["experiments"][0]["results"][0]["metric"], "Accuracy")
        self.assertEqual(len(content["data"]["publications"]), 1)

    def test_research_detail_invalid_slug_returns_404(self):
        url = reverse("v1:research-detail", kwargs={"slug": "invalid-research-slug"})
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", res.data)
        self.assertEqual(res.data["error"]["code"], "NOT_FOUND")

    def test_research_filtering_and_search(self):
        res = self.client.get(reverse("v1:research-list") + "?category=deep-learning")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:research-list") + "?search=Attention")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

    def test_research_featured_endpoint(self):
        res = self.client.get(reverse("v1:research-featured"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["data"]), 1)
        self.assertEqual(res.data["data"][0]["slug"], "transformer-optimization")

    def test_datasets_experiments_publications_endpoints(self):
        res = self.client.get(reverse("v1:dataset-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:experiment-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)

        res = self.client.get(reverse("v1:publication-list"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["meta"]["count"], 1)
