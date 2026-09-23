import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "proj-1",
    slug: "explainable-phishing-detection",
    title: "Explainable Machine Learning for Phishing Website Detection Using URL-Based Features",
    shortDescription:
      "A machine-learning based phishing website detection system using URL-based features and explainable AI techniques.",
    description:
      "A machine-learning based phishing website detection system using URL-based features and explainable AI techniques. Evaluates multiple classifier algorithms across varying feature subsets selected via Information Gain, optimized with Optuna and RandomizedSearchCV, and interpreted using SHAP values.",
    category: "AI/ML",
    technologies: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "Random Forest",
      "Gradient Boosting",
      "Extra Trees",
      "SVM",
      "SHAP",
      "Optuna",
    ],
    year: 2026,
    status: "Completed",
    featured: true,
    published: true,
    problem:
      "Detects potentially malicious/phishing websites from URL-based characteristics using machine learning classification.",
    objective:
      "Develop a robust classification pipeline comparing multiple ML models across 5, 8, 10, 20, and 30-feature sets with transparent SHAP explainability.",
    approach:
      "Extracted URL-based features, performed Information Gain feature selection, tuned hyperparameters via Optuna and RandomizedSearchCV, and validated across independent datasets.",
    architecture:
      "Modular Python ML pipeline with cross-dataset validation splits, Optuna search loops, and SHAP summary/waterfall plot generation.",
    implementation:
      "Implemented models using Scikit-learn, XGBoost, LightGBM, and CatBoost; optimized hyperparameters and computed SHAP attributions.",
    results:
      "Achieved high detection accuracy across cross-dataset benchmarks with detailed SHAP feature attribution rankings.",
    challenges:
      "Managing feature subset trade-offs and ensuring consistent SHAP explanation stability across diverse dataset distributions.",
    learnings:
      "Combining feature selection with model explainability provides transparent insight into security risk indicators beyond raw accuracy.",
    futureWork:
      "Expand URL feature extraction pipeline to capture dynamic network signals and real-time browser extension integration.",
    links: {
      github: "https://github.com/MAN-kumar/phishing_detector",
    },
    relatedResearch: ["explainable-phishing-detection-research"],
  },
  {
    id: "proj-2",
    slug: "ai-interview-coach",
    title: "AI Interview Coach",
    shortDescription:
      "An AI-powered interview preparation platform designed around resume analysis, ATS scoring, interview preparation, and candidate analysis.",
    description:
      "An AI-powered interview preparation platform designed around resume analysis, ATS scoring, interview preparation, and candidate analysis. Features resume parsing, ATS scoring algorithms, face detection via MediaPipe, and custom JWT authentication.",
    category: "Full Stack",
    technologies: [
      "Django",
      "Django REST Framework",
      "React",
      "PostgreSQL",
      "JWT",
      "MediaPipe",
    ],
    year: 2026,
    status: "In Progress",
    featured: true,
    published: true,
    problem:
      "Helps candidates prepare for interviews and understand how their resume performs against ATS-style evaluation.",
    objective:
      "Build an end-to-end web application combining automated resume analysis, ATS scoring, face detection, and interview guidance.",
    approach:
      "Designed a Django REST API backend backed by PostgreSQL, paired with a React frontend and MediaPipe computer vision modules.",
    architecture:
      "React single-page application communicating with Django REST Framework endpoints protected by JWT authentication tokens.",
    implementation:
      "Implemented custom user authentication, resume file upload parsing, ATS scoring logic, and MediaPipe face detection for video interview analysis.",
    results:
      "Platform currently in active development with core ATS resume scoring and user authentication subsystems operational.",
    links: {},
  },
  {
    id: "proj-3",
    slug: "realtime-social-media-platform",
    title: "Real-Time Social Media Platform",
    shortDescription:
      "A real-time social media application with real-time communication and backend-driven functionality.",
    description:
      "A real-time social media application with real-time communication and backend-driven functionality. Powered by Django Channels and Redis for low-latency WebSocket messaging.",
    category: "Full Stack",
    technologies: [
      "Django",
      "Django Channels",
      "Redis",
      "Python",
      "PostgreSQL",
    ],
    year: 2025,
    status: "Completed",
    featured: true,
    published: true,
    problem:
      "Enabling instant bidirectional communication and real-time updates for social platform interactions.",
    objective:
      "Architect a scalable real-time messaging and feed system using WebSockets.",
    approach:
      "Utilized Django Channels and Redis channel layers to manage asynchronous WebSocket connections and push events.",
    architecture:
      "ASGI application server running Django Channels backed by Redis in-memory pub/sub message broker.",
    implementation:
      "Developed real-time chat rooms, activity notifications, and WebSocket event handlers connected to a relational database backend.",
    results:
      "Delivered instant message delivery with low latency across concurrent client WebSocket connections.",
    links: {},
  },
  {
    id: "proj-4",
    slug: "fake-ai-image-detector",
    title: "Fake AI Image Detector",
    shortDescription:
      "An AI-based system for detecting potentially AI-generated or manipulated images.",
    description:
      "An AI-based system for detecting potentially AI-generated or manipulated images using computer vision preprocessing and deep learning classification models.",
    category: "AI/ML",
    technologies: [
      "TensorFlow",
      "OpenCV",
      "FFmpeg",
      "Django",
      "Python",
    ],
    year: 2025,
    status: "Completed",
    featured: true,
    published: true,
    problem:
      "Identifies synthetic, AI-generated, or digitally altered images to combat digital misattribution.",
    objective:
      "Create a deep learning image analysis model integrated into a Django web interface.",
    approach:
      "Preprocessed incoming image and media files using OpenCV and FFmpeg before feeding tensor representations to a TensorFlow classification model.",
    architecture:
      "Django web backend receiving image uploads, triggering OpenCV/FFmpeg extraction routines, and executing TensorFlow model inference.",
    implementation:
      "Trained CNN classifier on image artifacts, integrated media decoding via FFmpeg, and exposed web upload interface.",
    results:
      "Successfully classified synthetic image patterns with high accuracy on evaluation splits.",
    links: {},
  },
  {
    id: "proj-5",
    slug: "face-mask-detection",
    title: "Face Mask Detection",
    shortDescription:
      "A computer-vision project for detecting whether a person is wearing a face mask.",
    description:
      "A computer-vision project for detecting whether a person is wearing a face mask using deep learning models and real-time video frame processing.",
    category: "AI/ML",
    technologies: [
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Python",
    ],
    year: 2025,
    status: "Completed",
    featured: false,
    published: true,
    problem:
      "Automated detection of face mask compliance from video streams and image inputs.",
    objective:
      "Train a real-time binary image classifier identifying masked vs. unmasked facial frames.",
    approach:
      "Combined OpenCV facial detection cascades with a custom Keras/TensorFlow convolutional neural network.",
    architecture:
      "Real-time frame capture pipeline passing cropped facial regions to a lightweight CNN classifier.",
    implementation:
      "Trained model on masked/unmasked image datasets, integrated camera feed capturing via OpenCV, and rendered bounding boxes with status labels.",
    results:
      "Achieved smooth real-time detection on live video streams with high classification confidence.",
    links: {},
  },
  {
    id: "proj-6",
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    shortDescription:
      "An interactive developer portfolio showcasing projects, research, education, skills, and professional information.",
    description:
      "An interactive developer portfolio showcasing projects, research, education, skills, and professional information. Features an interactive 3D frontend built with Next.js App Router and dynamic Django REST API integration backed by PostgreSQL.",
    category: "Full Stack",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "Django REST Framework",
      "PostgreSQL",
    ],
    year: 2026,
    status: "Completed",
    featured: true,
    published: true,
    problem:
      "Showcasing engineering projects, research papers, and technical capabilities in a cohesive, interactive workspace.",
    objective:
      "Build a dark-first responsive web platform integrating a modern Next.js frontend with a Django REST API backend.",
    approach:
      "Decoupled UI presentation from data fetching, utilizing TypeScript strong types, dynamic 3D knowledge graph visualizers, and structured REST API fallback mechanisms.",
    architecture:
      "Next.js 16 App Router hosted on Vercel communicating with Django 5 REST Framework hosted on Render backed by PostgreSQL.",
    implementation:
      "Developed responsive page layouts across 9 routes, Three.js knowledge graph canvas, smooth Framer Motion transitions, and idempotent data seeding commands.",
    results:
      "Delivered a fast, accessible, 100% type-safe portfolio platform deployed live to production cloud servers.",
    links: {
      github: "https://github.com/MAN-kumar",
      demo: "https://mani-portfolio1.vercel.app",
    },
    relatedProjects: ["explainable-phishing-detection", "ai-interview-coach"],
    relatedResearch: ["explainable-phishing-detection-research"],
  },
];
