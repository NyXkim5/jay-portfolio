// src/types/productCase.ts

export type ProductCaseLink = {
  label: string;
  href: string;
};

export type ProductCase = {
  id: string;
  company: string;
  title: string;
  role: string;
  years: string;
  location: string;
  summary: string;
  impact: string;
  tags: string[];
  fidelity: string;
  links?: ProductCaseLink[];
};
