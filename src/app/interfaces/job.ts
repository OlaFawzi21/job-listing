export interface JobResponse {
  data: Job[];
  links: Links;
  meta: Meta;
}

export interface Job {
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
  title: string;
  description: string;
  company_name: string;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

interface Meta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
  terms: string;
  info: string;
}
