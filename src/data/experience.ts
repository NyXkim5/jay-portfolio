// src/data/experience.ts

export const experience = [
  {
    id: "archv",
    company: "Archv",
    role: "Founder & Product + Full-stack",
    years: "2024 – Present",
    location: "Remote / OC",
    summary:
      "Security-first AI workspace for law firms. Designed, spec'd, and built early product with a focus on retrieval quality, privacy, and brutalist UI.",
    achievements: [
      "Architected multi-LLM retrieval pipelines on AWS (EC2, S3, RDS, IAM) with hybrid caching",
      "Reduced query latency by 45% through context optimization",
      "Built production-grade full-stack products (React, Node.js, PostgreSQL)",
      "Established full compliance and data governance frameworks (DPA, SLA, TOS)",
      "Led marketing and brand growth, increasing inbound demo traffic by 70% within three months",
    ],
    tags: ["TypeScript", "React", "Node", "PostgreSQL", "OpenAI API", "AWS"],
  },
  {
    id: "medvanta",
    company: "MedVanta",
    role: "Full-stack Developer",
    years: "2024",
    location: "Remote",
    summary:
      "Text-based health reporting tool that lets patients submit structured check-ins over SMS. Designed simple flows that clinicians can actually use.",
    achievements: [
      "Designed and deployed HIPAA-compliant healthcare integrations",
      "Developed and shipped full-stack MVPs in Agile sprints",
      "Built scalable web applications (React, Node.js, PostgreSQL) meeting strict regulatory requirements",
      "Owned end-to-end product feature delivery",
    ],
    tags: ["Twilio", "Node", "PostgreSQL", "WeWeb"],
  },
  {
    id: "uav-uci",
    company: "UAV @ UCI",
    role: "President · Systems & Flight",
    years: "2023 – 2024",
    location: "Irvine, CA",
    summary:
      "Led teams building modular UAV platforms for sensing and mission support. Coordinated mech, EE, and software students around test flights.",
    achievements: [
      "Led a 25-member engineering team, coordinating UAV prototype design, testing, and cross-team development",
      "Increased rotor speed capability from 3,800 to 4,200 RPM, improving lift efficiency and flight stability",
      "Integrated a lightweight carbon-fiber airframe reducing vehicle weight by 12% and extending flight endurance by 18%",
      "Supervised UAV deployment logistics and field testing, standardizing documentation and performance tracking",
      "Designed and integrated a custom UAV companion HUD using Raspberry Pi 5 and Pixhawk flight controller",
    ],
    tags: ["PX4 / ArduPilot", "Systems", "Flight tests"],
  },
];
