import {
  Project,
  DesignerProfile,
  ProjectCategory,
  ExperienceItem,
  SkillCategory,
} from "./types";
import {
  isSanityConfigured,
  fetchSanityProjects,
  fetchSanityProjectBySlug,
  fetchSanityProfile,
} from "./sanity";
import {
  isContentfulConfigured,
  fetchContentfulProjects,
  fetchContentfulProjectBySlug,
} from "./contentful";

export type CMSProvider = "sanity" | "contentful";

export function getActiveCMSProvider(): CMSProvider {
  if (isContentfulConfigured) return "contentful";
  return "sanity";
}

export function getCMSStatus(): {
  provider: CMSProvider;
  isConfigured: boolean;
  message: string;
} {
  const provider = getActiveCMSProvider();
  if (provider === "sanity") {
    return {
      provider: "sanity",
      isConfigured: isSanityConfigured,
      message: "Connected to Sanity.io live dataset",
    };
  }
  return {
    provider: "contentful",
    isConfigured: isContentfulConfigured,
    message: "Connected to Contentful Space CDN",
  };
}

const DEFAULT_PROFILE: DesignerProfile = {
  name: "Designer",
  monogram: "DS",
  roleTitle: "Product Designer & Design Architect",
  status: "Available for new projects",
  availability: "Q2 / Q3",
  headline: "Crafting digital systems and elevated experiences.",
  statement:
    "Partnering with ambitious teams to conceive, architect, and ship enduring digital products.",
  bioParagraphs: [
    "Manage your bio paragraphs and career highlights directly in Sanity Studio (/admin).",
  ],
  location: "Phnom Penh & Remote",
  timezone: "ICT (UTC+7)",
  email: "hello@design.studio",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  resumePdfUrl: "#",
  socials: [
    { platform: "facebook" as any, label: "Facebook", url: "https://www.facebook.com/chhai.leang.102", handle: "chhai.leang.102" },
    { platform: "telegram" as any, label: "Telegram", url: "https://t.me/chhaichhai1888", handle: "@chhaichhai1888" },
    { platform: "phone" as any, label: "Phone", url: "tel:+855718788785", handle: "+855 71 878 8785" },
  ],
  experience: [],
  education: [],
  skills: [],
  awards: [],
  clients: [],
};

/**
 * Fetch all projects directly from CMS (no mock data)
 */
export async function getProjects(options?: {
  category?: ProjectCategory | "All";
  featuredOnly?: boolean;
}): Promise<Project[]> {
  let projects: Project[] | null = null;

  if (isSanityConfigured) {
    projects = await fetchSanityProjects();
  } else if (isContentfulConfigured) {
    projects = await fetchContentfulProjects();
  }

  if (!projects) {
    return [];
  }

  // Sort by order ascending
  projects.sort((a, b) => a.order - b.order);

  // Filter by featured
  if (options?.featuredOnly) {
    projects = projects.filter((p) => p.featured);
  }

  // Filter by category
  if (options?.category && options.category !== "All") {
    projects = projects.filter((p) => p.category === options.category);
  }

  return projects;
}

/**
 * Fetch a single project by its slug directly from CMS (no mock data)
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  let project: Project | null = null;

  if (isSanityConfigured) {
    project = await fetchSanityProjectBySlug(slug);
  } else if (isContentfulConfigured) {
    project = await fetchContentfulProjectBySlug(slug);
  }

  return project;
}

/**
 * Get previous and next projects for navigation at bottom of project detail
 */
export async function getAdjacentProjects(currentSlug: string): Promise<{
  prev: Project | null;
  next: Project | null;
}> {
  const allProjects = await getProjects();
  if (!allProjects.length) {
    return { prev: null, next: null };
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects[allProjects.length - 1];
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return { prev, next };
}

/**
 * Fetch designer profile and bio from CMS
 */
export async function getDesignerProfile(): Promise<DesignerProfile> {
  let profile: DesignerProfile | null = null;

  if (isSanityConfigured) {
    profile = await fetchSanityProfile();
  }

  if (!profile) {
    return DEFAULT_PROFILE;
  }

  return {
    ...DEFAULT_PROFILE,
    ...profile,
    bioParagraphs: profile.bioParagraphs || DEFAULT_PROFILE.bioParagraphs,
    socials: profile.socials || DEFAULT_PROFILE.socials,
    experience: profile.experience || [],
    education: profile.education || [],
    skills: profile.skills || [],
    awards: profile.awards || [],
    clients: profile.clients || [],
  };
}

/**
 * Helper to fetch experience list
 */
export async function getExperience(): Promise<ExperienceItem[]> {
  const profile = await getDesignerProfile();
  return profile.experience;
}

/**
 * Helper to fetch skills list
 */
export async function getSkills(): Promise<SkillCategory[]> {
  const profile = await getDesignerProfile();
  return profile.skills;
}
