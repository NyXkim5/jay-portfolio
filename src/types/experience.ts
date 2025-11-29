export type ExperienceItem = {
  id: string;
  company: string;
  title: string; // 👈 NEW
  years: string;
  location?: string;
  summary: string;
  tags: string[];
};
