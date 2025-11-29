// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  years: string;
  role?: string;
  summary: string;
  impact?: string;
  tags: string[];
  highlight?: boolean;
}

export const projects: Project[] = [
  {
    id: "archv",
    title: "ARCHV PLATFORM",
    role: "Founder · Product & Full-stack",
    years: "2024 – Present",
    summary:
      "Brutalist, security-first AI workspace for law firms. Private deployments, retrieval-augmented search over matters, and usage analytics.",
    impact:
      "Own product direction, IA, and first implementation: workspace UX, ingestion pipeline, and firm-grade auth.",
    tags: ["TypeScript", "React", "Node", "PostgreSQL", "OpenAI API"],
    highlight: true,
  },
  {
    id: "medvanta",
    title: "MEDVANTA",
    role: "Full-stack Developer · iOS Design",
    years: "2024",
    summary:
      "Text-based health reporting tool for patient check-ins over SMS. Designed clean iOS interface and built HIPAA-compliant backend integrations.",
    impact:
      "Shipped full-stack MVP in Agile sprints. Owned iOS design, user flows, and end-to-end feature delivery for clinician workflows.",
    tags: ["iOS Design", "React", "Node.js", "PostgreSQL", "Twilio"],
    highlight: false,
  },
];
