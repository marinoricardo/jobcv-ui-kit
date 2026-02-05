export interface Job {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time';
  isRemote: boolean;
  isUrgent: boolean;
  salary?: string;
  salaryRange?: { min: number; max: number };
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  category: string;
  status?: 'active' | 'paused' | 'closed';
  views?: number;
  applications?: number;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  location: string;
  website?: string;
  employees?: string;
  founded?: string;
  email?: string;
  phone?: string;
  activeJobs?: number;
  verified?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  cvUrl?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  company: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'company' | 'candidate';
  avatar?: string;
  companyId?: string;
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
