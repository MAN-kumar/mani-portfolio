import { Research } from "@/types/portfolio";

export const researchData: Research[] = [
  {
    id: "res-1",
    slug: "explainable-ai-dashboard",
    title: "Feature Importance & Model Explainability Visualizer",
    abstract:
      "Investigating techniques for interpreting complex machine learning predictions through feature contribution analysis and transparent model inspection.",
    motivation:
      "Black-box machine learning models require transparent explanations to establish user trust and facilitate clinical or technical debugging.",
    researchQuestion:
      "How effectively can model-agnostic feature attribution algorithms represent non-linear feature interactions in tabular and vision datasets?",
    methodology:
      "Conducted comparative experiments measuring SHAP value convergence speed, local attribution consistency, and feature interaction rankings across synthetic and real-world benchmark datasets.",
    limitations:
      "Exact Shapley value computation scales exponentially with feature dimensionality, requiring sampling approximations for high-dimensional feature spaces.",
    futureWork:
      "Extend local interpretation methods to real-time streaming time-series data.",
    category: "AI/ML",
    year: 2025,
    status: "completed",
    featured: true,
    published: true,
    dataset: {
      name: "Tabular & Benchmark Evaluation Callset",
      description: "Standardized multi-feature benchmark dataset for testing model explainability metrics.",
      source: "Open Data Science Repository",
      featureCount: 42,
      format: "CSV / Parquet",
    },
    experiments: [
      {
        name: "Feature Attribution Benchmark",
        model: "Gradient Boosted Decision Trees & Random Forests",
        featureCount: 42,
        notes: "Evaluated stability of local feature importance attribution across 1000 validation runs.",
        results: [
          { metric: "Attribution Consistency", value: 96.4, unit: "%" },
          { metric: "Inference Overhead", value: 14.2, unit: "ms" },
        ],
      },
    ],
    relatedProjects: ["interactive-portfolio-platform", "computer-vision-research-lab"],
  },
];
