// Single source of truth for portfolio content.
// All 5 aesthetic variations read from this.
window.PORTFOLIO = {
  identity: {
    name: "Kaustubh Salunke",
    initials: "KS",
    role: "AI / ML Engineer",
    subroles: ["Data Scientist", "LLM & Agentic Systems"],
    location: "Berlin, Germany",
    status: "Open to AI / ML Engineer & Data Scientist roles",
    tagline: "I build production-grade GenAI and ML systems.",
    bio_short: "Berlin-based AI/ML engineer. 2+ years at Accenture. M.Sc. Big Data & AI at SRH Berlin. I care about systems that actually work under load — not demos.",
    bio_long: [
      "I'm an AI / ML Engineer and Data Scientist based in Berlin, specializing in LLM application development, agentic systems, and production ML pipelines. At Accenture, I spent 2+ years engineering ML data pipelines and enterprise data systems, cutting processing time by 20% and earning the Accenture ACE Award for client outcomes.",
      "These days I'm focused on the hard parts of putting LLMs and ML models in production: hybrid retrieval, self-correction loops, guardrails, observability, and evaluation harnesses. I care about systems that actually work under load, not demos."
    ]
  },
  contact: {
    email: "kaustubh.v.salunke@gmail.com",
    linkedin: { label: "in/kaustubhsalunke", url: "https://www.linkedin.com/in/kaustubh-salunke-a4264619a/" },
    github:   { label: "github.com/kausta1011", url: "https://github.com/kausta1011" },
    location: "Berlin, Germany"
  },
  metrics: [
    { value: "20%", label: "pipeline speedup at Accenture" },
    { value: "2+",  label: "years shipping ML in production" },
    { value: "1.7", label: "M.Sc. GPA (German scale)" },
    { value: "8",   label: "cloud & ML certifications" }
  ],
  skills: [
    { group: "Agentic / LLM", items: ["LangGraph","LangChain","MCP","Agentic RAG","Hybrid Retrieval","Cross-Encoder Reranking","Self-Correction Loops","Guardrails","RAGAS Eval"] },
    { group: "Models",        items: ["GPT-4o","Claude","Llama 3.1 (Groq)","HuggingFace Transformers","Sentence-Transformers","PyTorch","TensorFlow","Scikit-learn"] },
    { group: "Retrieval",     items: ["ChromaDB","FAISS","Pinecone","BM25","Tavily","tiktoken"] },
    { group: "Backend",       items: ["Python","FastAPI","SSE Streaming","Pydantic","REST","Flask","SQL","Node.js"] },
    { group: "MLOps",         items: ["MLflow","W&B","OpenTelemetry","Loguru","Eval Harnesses"] },
    { group: "Cloud / DevOps",items: ["Docker","docker-compose","GitHub Actions","Kubernetes","Azure ML","Google Cloud AI","Render"] },
    { group: "Data Eng",      items: ["PySpark","Airflow","Pandas","NumPy","n8n"] },
    { group: "Testing",       items: ["pytest","pytest-asyncio","FakeLLM patterns","ruff","mypy"] },
    { group: "Languages",     items: ["English (C2)","German (B1)","Hindi","Marathi"] }
  ],
  experience: [
    {
      company: "Accenture",
      role: "Associate Software Developer",
      sub: "ML / Data Science · Enterprise Data & ML Pipeline Engineering",
      location: "Pune, India",
      date: "Feb 2023 – Sep 2024",
      bullets: [
        "Optimized Python-based ML data pipelines with vectorized operations, reducing end-to-end processing time by 20%.",
        "Engineered feature-ready datasets from structured enterprise data (imputation, encoding, normalization) powering predictive modeling and automated decisioning.",
        "Refactored Python and SQL pipelines to modularize transformation logic and optimize query execution, improving system reliability at scale.",
        "Recognized with the Accenture ACE (Extra Mile) Award for delivering exceptional client outcomes."
      ]
    },
    {
      company: "Ethnus",
      role: "Software Developer Intern",
      sub: "Internal tooling · SQL workflows · Agile",
      location: "Bangalore, India",
      date: "Jul 2022 – Sep 2022",
      bullets: [
        "Reduced manual reporting effort by building SQL workflows for internal business applications.",
        "Resolved UI/UX friction in an instructor-facing internal tool, improving task completion flow.",
        "Contributed to Agile sprint cycles (standups, planning, retrospectives) shipping features on schedule."
      ]
    }
  ],
  projects: [
    {
      slug: "agentic-rag",
      title: "Agentic RAG Platform",
      tag: "GenAI",
      year: "2025",
      summary: "LangGraph state machine with self-correction loops, hybrid retrieval, guardrails, and full observability.",
      desc: "Production-grade Agentic RAG as a LangGraph state machine: router → query rewriter → retrieve → rerank → grade → web-search fallback → generate → reflect. Hybrid retrieval (ChromaDB + BM25 + RRF) with cross-encoder reranking. InputGuard for PII / prompt injection, OutputGuard for faithfulness, RAGAS harness, OpenTelemetry on every node. Shipped with FastAPI + SSE, stdio MCP server, Streamlit UI, Docker.",
      stack: ["LangGraph","FastAPI","MCP","ChromaDB","BM25","OpenTelemetry","Docker"],
      highlights: [
        { k: "Retrieval", v: "Dense + BM25 + RRF" },
        { k: "Reranking", v: "Cross-encoder" },
        { k: "Guardrails", v: "PII · prompt-inj · faithfulness" },
        { k: "Observability", v: "OpenTelemetry · RAGAS" }
      ],
      architecture: ["router","query_rewrite","retrieve","rerank","grade","web_fallback","generate","reflect"]
    },
    {
      slug: "investment-research",
      title: "AI Investment Research Assistant",
      tag: "Multi-Agent",
      year: "2025",
      summary: "Parallel multi-agent system → BUY / HOLD / SELL with bull case, bear case, and risks.",
      desc: "News Scout, Analyst, and Sentiment Judge fan out concurrently across Google News, yfinance, SEC EDGAR (10-K/10-Q/8-K), and Reddit, then synchronize to produce verdicts with bull case, bear case, and risks. Partial-failure tolerance, SHA-256 disk cache with TTL, pluggable LLM factory, and a self-contained HTML brief with Plotly charts and filterable source tables.",
      stack: ["LangGraph","LangChain","yfinance","SEC EDGAR","Plotly","Jinja2"],
      highlights: [
        { k: "Agents", v: "News · Analyst · Sentiment" },
        { k: "Sources", v: "Google News · yfinance · EDGAR · Reddit" },
        { k: "Output", v: "BUY / HOLD / SELL + thesis" },
        { k: "Resilience", v: "Partial-failure tolerant" }
      ],
      architecture: ["fan_out","news_scout","analyst","sentiment","synchronize","verdict"]
    },
    {
      slug: "pizza-agent",
      title: "AI Pizza Ordering Assistant",
      tag: "Conv. Agent",
      year: "2024",
      summary: "Structured prompt-driven dialog agent → clean JSON orders. Voice-enabled variant included.",
      desc: "Conversational agent for a pizza delivery service. Designed a dialog flowchart and implemented a structured prompt-driven system to manage real-time customer interactions (menu validation, special requests like allergies and vegan, delivery address collection) outputting clean JSON orders. Also built a voice-enabled variant.",
      stack: ["Python","LLM","Prompt Engineering","Voice I/O"],
      highlights: [
        { k: "Modality", v: "Text + Voice" },
        { k: "Output", v: "Validated JSON orders" },
        { k: "Handles", v: "Allergies · vegan · address" }
      ],
      architecture: ["greet","menu","validate","modify","address","confirm","emit_json"]
    },
    {
      slug: "neural-stocks",
      title: "Neural Time-Series Forecasting",
      tag: "Deep Learning",
      year: "2024",
      summary: "Stock forecasting pipeline with technical indicators, LSTM/GRU, and trading-KPI backtesting.",
      desc: "ML pipeline for stock market forecasting on historical price and volume data. Feature engineering with technical indicators (MA, RSI, MACD), baseline models (Logistic Regression, Random Forest), then sequence models (LSTM / GRU). Proper time-series validation, classification metrics plus trading KPIs (Sharpe ratio, cumulative returns), and simple backtesting simulation.",
      stack: ["PyTorch","LSTM","Pandas","Scikit-learn","Backtesting"],
      highlights: [
        { k: "Features", v: "MA · RSI · MACD" },
        { k: "Models", v: "LR · RF · LSTM · GRU" },
        { k: "Eval", v: "Sharpe · Cum. returns" }
      ],
      architecture: ["ingest","features","baseline","lstm","backtest","report"]
    },
    {
      slug: "churn",
      title: "Customer Churn Prediction",
      tag: "Classical ML",
      year: "2023",
      summary: "End-to-end churn pipeline with SHAP, MLflow, and a Streamlit dashboard for stakeholders.",
      desc: "End-to-end churn prediction pipeline covering EDA, feature engineering, class imbalance handling (SMOTE), and comparison across Logistic Regression, XGBoost, and LightGBM. SHAP for explainability, MLflow for experiment tracking, FastAPI for serving, and a lightweight Streamlit dashboard for business stakeholders.",
      stack: ["XGBoost","SHAP","MLflow","FastAPI","Streamlit"],
      highlights: [
        { k: "Imbalance", v: "SMOTE" },
        { k: "Models", v: "LR · XGBoost · LightGBM" },
        { k: "Explain", v: "SHAP" },
        { k: "Serve", v: "FastAPI + Streamlit" }
      ],
      architecture: ["eda","features","smote","train","explain","serve"]
    },
    {
      slug: "retail-forecast",
      title: "Retail Demand Forecasting",
      tag: "Forecasting",
      year: "2023",
      summary: "Hierarchical SKU × store × week forecasting with TFT at the top tier and reconciliation.",
      desc: "Hierarchical demand forecasting across SKU × store × week. Baselines (naive, ETS, Prophet) vs. gradient-boosted trees (LightGBM) with lag and rolling features, then a Temporal Fusion Transformer for the top tier. Cross-validation with expanding window, MAPE / WAPE metrics, and a reconciliation step across the hierarchy.",
      stack: ["Prophet","LightGBM","PyTorch","Pandas"],
      highlights: [
        { k: "Hierarchy", v: "SKU × store × week" },
        { k: "Top tier", v: "Temporal Fusion Transformer" },
        { k: "Eval", v: "MAPE · WAPE" }
      ],
      architecture: ["aggregate","baseline","gbm","tft","reconcile"]
    }
  ],
  education: [
    {
      school: "SRH Berlin University of Applied Sciences",
      degree: "M.Sc. Big Data & Artificial Intelligence",
      grade: "GPA 1.7 (German scale, equivalent to Distinction)",
      date: "Oct 2024 – Present"
    },
    {
      school: "Pune University",
      degree: "B.Sc. Mechanical Engineering",
      grade: "CGPA 2.2 (German scale)",
      date: "Aug 2017 – Jul 2022"
    }
  ],
  certifications: [
    { code: "AZ", name: "Azure Administrator Associate (AZ-104)", issuer: "Microsoft" },
    { code: "AI", name: "Azure AI Fundamentals (AI-900)",         issuer: "Microsoft" },
    { code: "AZ", name: "Azure Fundamentals (AZ-900)",            issuer: "Microsoft" },
    { code: "GCP",name: "Cloud Digital Leader",                   issuer: "Google Cloud" },
    { code: "ML", name: "Machine Learning Specialization",        issuer: "Stanford / DeepLearning.AI" },
    { code: "MA", name: "Mathematics for ML & Data Science",      issuer: "DeepLearning.AI" },
    { code: "AP", name: "Certified Associate Developer",          issuer: "Appian" },
    { code: "GO", name: "Foundations: Data, Data, Everywhere",    issuer: "Google" }
  ],
  // ─── NEW SECTIONS for Swiss standalone ─────────────────────────────
  now_playing: {
    updated: "2026-04-29",
    items: [
      { kind: "building",  label: "Building",  text: "An eval harness for retrieval drift in long-running RAG agents.",        meta: "side project · evenings" },
      { kind: "learning",  label: "Learning",  text: "Sutton & Barto, Reinforcement Learning, 2nd ed. — chapter 6, TD methods.", meta: "book · 2 of 7 chapters left" },
      { kind: "reading",   label: "Reading",   text: "DeepSeek-V3 paper. MoE routing, FP8 mixed-precision training.",            meta: "paper · technical" },
      { kind: "shipping",  label: "Shipping",  text: "Cross-encoder reranker on the agentic-RAG repo, behind a feature flag.",   meta: "GitHub · this week" },
      { kind: "listening", label: "Listening", text: "Latent Space pod — episode on production agent failure modes.",            meta: "podcast" }
    ]
  },
  writing: [
    { slug: "rag-eval-harness",   title: "Why your RAG eval harness lies to you",                date: "Apr 2026", read: "8 min", tag: "RAG",       excerpt: "Most teams ship retrieval changes on vibes. Here's a hard, honest harness that actually surfaces drift." },
    { slug: "langgraph-self-correct", title: "Self-correction loops in LangGraph, the boring version", date: "Mar 2026", read: "6 min", tag: "Agents",    excerpt: "Reflection nodes are seductive. Most of the lift comes from one boring guardrail. A walkthrough." },
    { slug: "hybrid-retrieval",   title: "BM25 is not dead, and your dense retriever knows it",   date: "Feb 2026", read: "5 min", tag: "Retrieval", excerpt: "Hybrid retrieval with reciprocal rank fusion, in 60 lines, with the failure modes it actually fixes." },
    { slug: "ml-pipelines-accenture", title: "Twenty percent: a small story about pipeline math",     date: "Jan 2026", read: "4 min", tag: "Notes",     excerpt: "How one vectorization pass at Accenture cut a pipeline by a fifth, and what that taught me about premature ML." },
    { slug: "berlin-stack",       title: "What the Berlin AI stack actually looks like",          date: "Dec 2025", read: "7 min", tag: "Industry",  excerpt: "After fifty coffees: what teams here are running in production right now, and what they aren't." }
  ],
  talks: [
    { date: "Mar 2026", venue: "SRH Berlin · Guest Lecture",            title: "Agentic RAG in Production",         kind: "Lecture",  status: "delivered" },
    { date: "Feb 2026", venue: "Berlin AI Engineers · Meetup",          title: "Hybrid Retrieval, Concretely",      kind: "Talk",     status: "delivered" },
    { date: "—",        venue: "(Open slot)",                            title: "On evaluating long-running agents", kind: "Talk",     status: "available" },
    { date: "—",        venue: "(Open slot)",                            title: "Podcast guest — RAG / agents",      kind: "Podcast",  status: "available" }
  ],
  stack_visual: [
    { name: "Python",      group: "Lang",      freq: 95, recency: "today" },
    { name: "LangGraph",   group: "Agents",    freq: 88, recency: "today" },
    { name: "FastAPI",     group: "Backend",   freq: 80, recency: "today" },
    { name: "ChromaDB",    group: "Retrieval", freq: 72, recency: "this week" },
    { name: "BM25",        group: "Retrieval", freq: 68, recency: "this week" },
    { name: "OpenTelemetry",group:"MLOps",     freq: 64, recency: "this week" },
    { name: "PyTorch",     group: "Models",    freq: 60, recency: "this month" },
    { name: "Docker",      group: "DevOps",    freq: 75, recency: "today" },
    { name: "MCP",         group: "Agents",    freq: 56, recency: "this week" },
    { name: "Pydantic",    group: "Backend",   freq: 70, recency: "today" },
    { name: "MLflow",      group: "MLOps",     freq: 52, recency: "this month" },
    { name: "GitHub Actions", group:"DevOps",  freq: 66, recency: "this week" },
    { name: "PySpark",     group: "Data",      freq: 48, recency: "this quarter" },
    { name: "pytest",      group: "Testing",   freq: 78, recency: "today" },
    { name: "SQL",         group: "Data",      freq: 70, recency: "today" },
    { name: "Pandas",      group: "Data",      freq: 82, recency: "today" },
    { name: "Claude",      group: "Models",    freq: 66, recency: "today" },
    { name: "GPT-4o",      group: "Models",    freq: 62, recency: "this week" }
  ],
  process: [
    { n: "01", title: "Frame",      blurb: "Get to the actual decision the model is supporting. If there isn't one, stop."  },
    { n: "02", title: "Baseline",   blurb: "Cheapest possible baseline first. Heuristic, regex, BM25 — whatever beats nothing." },
    { n: "03", title: "Instrument", blurb: "Logs, traces, eval harness on day one. You can't improve what you can't measure." },
    { n: "04", title: "Iterate",    blurb: "Small changes, one variable, real eval set. Reject anything that doesn't move the metric." },
    { n: "05", title: "Harden",     blurb: "Guardrails, fallbacks, retries, idempotency, cost ceiling. Then ship." }
  ],
  testimonials: [
    { quote: "Kaustubh has the rare combination of being deeply technical and consistently shipping. He owned the hardest pipeline on the team and made it 20% faster — the kind of work nobody asks for.", who: "Senior Manager, Accenture", role: "ML / Data Practice", placeholder: false },
    { quote: "Every time I asked him to look into something he came back with a working prototype, a benchmark, and a list of three things he'd already tried. Default-to-action.", who: "Tech Lead, Accenture", role: "Data Engineering", placeholder: false },
    { quote: "Pleasure to work with — calm under pressure, asks the right questions, doesn't ship fluff.", who: "Project Lead", role: "Enterprise Data", placeholder: false },
    { quote: "Add your own quote here once we've worked together.", who: "Future colleague", role: "—", placeholder: true }
  ],
  // For the AI chat — context the model receives
  ai_context: `You are a friendly, concise AI assistant embedded on Kaustubh Salunke's portfolio. Answer questions about Kaustubh's work, skills, and projects using ONLY the facts below. Be honest if asked something not covered. Keep answers short (2-4 sentences max), confident, and conversational. Never make up employers, dates, or metrics.

KAUSTUBH SALUNKE — AI/ML Engineer & Data Scientist, based in Berlin, Germany.
- 2+ years at Accenture (Feb 2023 – Sep 2024) as Associate Software Developer doing ML/Data Science: optimized Python ML pipelines (-20% processing time), engineered feature-ready datasets, refactored Python/SQL pipelines. Won the Accenture ACE Award.
- Earlier: Software Developer Intern at Ethnus (Jul–Sep 2022, Bangalore) — SQL workflows, internal tooling.
- Currently: M.Sc. Big Data & AI at SRH Berlin University of Applied Sciences (Oct 2024 – Present), GPA 1.7 (Distinction).
- Earlier degree: B.Sc. Mechanical Engineering, Pune University (2017–2022).
- Languages: English C2, German B1.

CORE EXPERTISE: Production GenAI and ML systems. LLM apps, agentic RAG, multi-agent pipelines, MLOps, hybrid retrieval, guardrails, evaluation harnesses, observability.

STACK: LangGraph, LangChain, MCP, ChromaDB/FAISS/Pinecone, BM25, GPT-4o, Claude, Llama 3.1 via Groq, HuggingFace, PyTorch, TensorFlow, Scikit-learn, FastAPI, SSE streaming, Pydantic, MLflow, Weights & Biases, OpenTelemetry, Docker, docker-compose, GitHub Actions, Kubernetes, Azure ML, Google Cloud AI, PySpark, Airflow, Pandas, pytest.

PROJECTS:
1. Agentic RAG Platform — LangGraph state machine with self-correction loops (router, query rewriter, retrieve, rerank, grade, web fallback, generate, reflect). Hybrid retrieval (ChromaDB + BM25 + RRF) with cross-encoder reranking. InputGuard (PII, prompt injection), OutputGuard (faithfulness), RAGAS eval harness, OpenTelemetry on every node. FastAPI + SSE, stdio MCP server, Streamlit UI, Docker.
2. AI Investment Research Assistant — Parallel multi-agent system (News Scout, Analyst, Sentiment Judge) over Google News, yfinance, SEC EDGAR (10-K/10-Q/8-K), Reddit. Produces BUY/HOLD/SELL with bull case, bear case, risks. SHA-256 disk cache with TTL, pluggable LLM factory, partial-failure tolerance, self-contained HTML brief with Plotly charts.
3. AI Pizza Ordering Assistant — Conversational agent with dialog flowchart, structured prompts, menu validation, allergy/vegan handling, address collection. Outputs validated JSON orders. Voice-enabled variant.
4. Neural Time-Series Forecasting for Stocks — Technical indicators (MA, RSI, MACD), baselines (LR, RF), then LSTM/GRU. Time-series CV, classification metrics + trading KPIs (Sharpe, cumulative returns), backtesting.
5. Customer Churn Prediction — End-to-end pipeline. EDA, feature engineering, SMOTE, LR vs XGBoost vs LightGBM, SHAP for explainability, MLflow tracking, FastAPI serving, Streamlit dashboard.
6. Retail Demand Forecasting — Hierarchical SKU × store × week. Baselines (naive, ETS, Prophet) vs LightGBM with lag/rolling features, then Temporal Fusion Transformer at top tier. Expanding-window CV, MAPE/WAPE, reconciliation.

CERTIFICATIONS: Microsoft Azure AZ-104, AI-900, AZ-900; Google Cloud Digital Leader; Stanford/DeepLearning.AI Machine Learning Specialization; DeepLearning.AI Math for ML; Appian Certified Associate Developer; Google Data Foundations.

CONTACT: kaustubh.v.salunke@gmail.com · LinkedIn /in/kaustubh-salunke-a4264619a · GitHub /kausta1011

If asked about availability: "Open to AI Engineer, ML Engineer, and Data Scientist roles in Berlin or remote."
If asked something off-topic or personal: politely redirect to his work.
Never invent metrics, employers, or projects beyond what's listed above.`
};
