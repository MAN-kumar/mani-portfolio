import { Research } from "@/types/portfolio";

export const researchData: Research[] = [
  {
    id: "res-1",
    slug: "explainable-phishing-detection-research",
    title: "Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
    abstract:
      "Investigating machine-learning based phishing website detection using URL-based features and explainable AI techniques. Evaluates multiple classifier algorithms across varying feature subsets (5, 8, 10, 20, 30 features) selected via Information Gain, optimized with Optuna and RandomizedSearchCV, and interpreted using SHAP values.",
    motivation:
      "Phishing attacks pose significant cybersecurity threats. Black-box machine learning models require transparent feature attribution explanations to establish trust and help security analysts understand URL risk signals.",
    researchQuestion:
      "How effectively can URL-based feature selection combined with SHAP explainability identify phishing websites across diverse machine learning classification models and cross-dataset benchmarks?",
    methodology:
      "Extracted URL-based features from phishing website datasets. Applied Information Gain feature selection across 5, 8, 10, 20, and 30-feature subsets. Evaluated 9 machine learning models (XGBoost, LightGBM, CatBoost, Random Forest, Gradient Boosting, Extra Trees, SVM, Logistic Regression, Decision Tree). Optimized hyperparameters using Optuna and RandomizedSearchCV, computed SHAP attributions, and validated performance via cross-dataset validation.",
    limitations:
      "URL-based feature extraction relies on structural characteristics of URL strings, requiring complementary content or network analysis for dynamic zero-day cloaked domains.",
    futureWork:
      "Extend feature extraction pipeline to include dynamic page DOM features and real-time browser extension integration.",
    category: "AI/ML",
    year: 2026,
    status: "in_progress",
    featured: true,
    published: true,
    dataset: {
      name: "Phishing Website Datasets",
      description: "Phishing website datasets with 31 URL-based features targeting binary classification ('Result').",
      source: "Phishing Website Benchmark Datasets",
      size: "Training: 5849 × 31 | Testing: 2456 × 31",
      featureCount: 31,
      format: "Tabular / CSV",
    },
    experiments: [
      {
        name: "URL Feature Selection & Model Comparison",
        model: "XGBoost, LightGBM, CatBoost, Random Forest, Gradient Boosting, Extra Trees, SVM, Logistic Regression, Decision Tree",
        featureCount: 30,
        notes: "Evaluated 5, 8, 10, 20, and 30-feature subsets selected via Information Gain. Hyperparameters tuned with Optuna and RandomizedSearchCV.",
        results: [
          { metric: "Training Split", value: "5849 × 31", unit: "samples" },
          { metric: "Testing Split", value: "2456 × 31", unit: "samples" },
          { metric: "Feature Subsets", value: "5, 8, 10, 20, 30", unit: "features" },
          { metric: "Feature Selection", value: "Information Gain", unit: "method" },
          { metric: "Optimization", value: "Optuna & RandomizedSearchCV", unit: "framework" },
          { metric: "Explainability", value: "SHAP Values", unit: "method" },
        ],
      },
    ],
    publications: [
      {
        title: "Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
        venue: "IEEE Conference (Intended Publication)",
        status: "In Preparation / Not Published Yet",
      },
    ],
    relatedProjects: ["explainable-phishing-detection"],
  },
];
