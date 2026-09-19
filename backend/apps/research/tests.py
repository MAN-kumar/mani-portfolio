from django.test import TestCase
from .models import ResearchCategory, Research, Experiment, ExperimentResult, Dataset


class ResearchModelTests(TestCase):
    def test_research_experiment_and_result(self):
        category = ResearchCategory.objects.create(name="Machine Learning", slug="ml")
        research = Research.objects.create(
            title="Explainable AI Dashboard",
            slug="explainable-ai-dashboard",
            category=category,
            abstract="Research on model interpretability.",
            year=2026,
            status="in_progress",
        )
        dataset = Dataset.objects.create(
            research=research,
            name="Tabular Benchmark Set",
            feature_count=42,
        )
        experiment = Experiment.objects.create(
            research=research,
            name="SHAP Feature Importance Analysis",
            model="Random Forest",
            parameters={"n_estimators": 100},
        )
        result = ExperimentResult.objects.create(
            experiment=experiment,
            metric="Accuracy",
            value="0.942",
            unit="ratio",
        )

        self.assertEqual(research.category.slug, "ml")
        self.assertEqual(dataset.feature_count, 42)
        self.assertEqual(experiment.parameters.get("n_estimators"), 100)
        self.assertEqual(str(result), "Accuracy: 0.942 ratio")
