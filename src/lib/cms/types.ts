export type ProjectCategory = 
  | "All"
  | "Product Design"
  | "Design Systems"
  | "Brand Identity"
  | "Spatial & Web3";

export interface ProjectImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export type ProjectContentBlock =
  | {
      _type: "text";
      id: string;
      heading?: string;
      subheading?: string;
      body: string;
    }
  | {
      _type: "fullWidthImage";
      id: string;
      image: ProjectImage;
    }
  | {
      _type: "sideBySide";
      id: string;
      title?: string;
      leftImage: ProjectImage;
      rightImage: ProjectImage;
    }
  | {
      _type: "quote";
      id: string;
      quote: string;
      author: string;
      role?: string;
    }
  | {
      _type: "metricsGrid";
      id: string;
      metrics: MetricItem[];
    }
  | {
      _type: "videoLoop";
      id: string;
      videoUrl: string;
      posterUrl: string;
      title: string;
      caption?: string;
    };

export interface ProjectMetadata {
  role: string;
  timeline: string;
  tools: string[];
  deliverables: string[];
  liveUrl?: string;
  clientLocation?: string;
}

export interface ProjectOverview {
  challenge: string;
  solution: string;
  impact?: string;
  metrics?: MetricItem[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number | string;
  category: ProjectCategory;
  tags: string[];
  tagline: string;
  coverImage: ProjectImage;
  featured: boolean;
  order: number;
  metadata: ProjectMetadata;
  overview: ProjectOverview;
  blocks: ProjectContentBlock[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  highlights?: string[];
  skills?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  note?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  project?: string;
}

export interface SocialLink {
  platform: "dribbble" | "behance" | "github" | "linkedin" | "twitter" | "readcv" | "email";
  label: string;
  url: string;
  handle: string;
}

export interface DesignerProfile {
  name: string;
  monogram: string;
  roleTitle: string;
  status: string;
  availability: string;
  headline: string;
  statement: string;
  bioParagraphs: string[];
  location: string;
  timezone: string;
  email: string;
  avatarUrl: string;
  resumePdfUrl: string;
  socials: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  awards: AwardItem[];
  clients: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  timeline?: string;
  budget?: string;
  projectType: string;
  message: string;
}
