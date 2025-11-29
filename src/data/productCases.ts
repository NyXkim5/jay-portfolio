// src/data/productCases.ts
import type { ProductCase } from "../types/productCase";

export const productCases: ProductCase[] = [
  {
    id: "archv-platform",
    company: "Archv",
    title: "Archv Workspace",
    role: "Founder · Product & Full-stack",
    years: "2024 – Present",
    location: "Remote / Orange County, CA",
    summary:
      "Brutalist, security-first AI workspace for law firms. Private deployments, retrieval-augmented search over matters, and usage analytics.",
    impact:
      "Own product direction and first implementation: workspace UX, ingestion pipeline, and firm-grade auth. Shaped how I think about building tools for regulated spaces.",
    tags: ["TypeScript", "React", "Node", "PostgreSQL", "OpenAI API"],
    fidelity: "Active deployment / live prototype",
    links: [
      {
        label: "Website",
        href: "https://www.archvai.com/",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/archvai/",
      },
    ],
  },

  {
    id: "independent-tools",
    company: "Independent",
    title: "Independent Tools",
    role: "Product & Systems",
    years: "2023 – 2024",
    location: "Remote",
    summary:
      "A mix of internal dashboards, small tools, and experiments around routing, data-viz, and surface-level automation.",
    impact:
      "Let me experiment fast with layout, information density, and how much structure people will tolerate before rebelling.",
    tags: ["Dashboards", "Automation", "Design Systems"],
    fidelity: "Concepts & prototypes",
  },

  {
    id: "medvanta-app",
    company: "MedVanta",
    title: "MedVanta Check-in App",
    role: "Full-stack · Product",
    years: "2024",
    location: "Bethesda, MD",
    summary:
      "Phone-first patient reporting flow that mirrors how people actually text. Structured SMS + app screens that roll up into a clinician view.",
    impact:
      "Reduced friction for patients sending symptom updates and gave clinicians one sane place to scan what mattered each day.",
    tags: ["Twilio", "React", "Node", "Healthcare UX"],
    fidelity: "Pilot prototype",
  },
];
