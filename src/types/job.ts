export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time';
  isRemote: boolean;
  isUrgent: boolean;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  category: string;
}

export type JobCategory = 
  | 'all'
  | 'technology'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'finance'
  | 'hr'
  | 'operations';

export type JobType = 'all' | 'full-time' | 'part-time';

export interface JobFilters {
  search: string;
  category: JobCategory;
  type: JobType;
  location: string;
  remote: boolean;
}
