import { createClient } from "@sanity/client";
import { Project, DesignerProfile } from "./types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN || "",
};

export const isSanityConfigured = Boolean(
  sanityConfig.projectId && sanityConfig.projectId.trim() !== ""
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: sanityConfig.useCdn,
      token: sanityConfig.token || undefined,
    })
  : null;

/**
 * GROQ Queries for Sanity.io Studio schema
 */
export const SANITY_QUERIES = {
  allProjects: `*[_type == "project"] | order(order asc) {
    "id": _id,
    "slug": slug.current,
    title,
    client,
    year,
    category,
    tags,
    tagline,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "caption": coverImage.caption
    },
    featured,
    order,
    metadata,
    overview,
    blocks
  }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    client,
    year,
    category,
    tags,
    tagline,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "caption": coverImage.caption
    },
    featured,
    order,
    metadata,
    overview,
    blocks
  }`,
  designerProfile: `*[_type == "designerProfile"][0] {
    name,
    monogram,
    roleTitle,
    status,
    availability,
    headline,
    statement,
    bioParagraphs,
    location,
    timezone,
    email,
    "avatarUrl": avatar.asset->url,
    resumePdfUrl,
    socials,
    experience,
    education,
    skills,
    awards,
    clients
  }`,
};

export async function fetchSanityProjects(): Promise<Project[] | null> {
  if (!sanityClient) return null;
  try {
    const projects = await sanityClient.fetch<Project[]>(
      SANITY_QUERIES.allProjects,
      {},
      { next: { revalidate: 60 } }
    );
    if (!projects || projects.length === 0) return null;
    return projects;
  } catch (err) {
    console.warn("Notice: Sanity dataset has no published projects yet or is unseeded, using mock data.");
    return null;
  }
}

export async function fetchSanityProjectBySlug(slug: string): Promise<Project | null> {
  if (!sanityClient) return null;
  try {
    const project = await sanityClient.fetch<Project | null>(
      SANITY_QUERIES.projectBySlug,
      { slug },
      { next: { revalidate: 60 } }
    );
    return project;
  } catch (err) {
    return null;
  }
}

export async function fetchSanityProfile(): Promise<DesignerProfile | null> {
  if (!sanityClient) return null;
  try {
    const profile = await sanityClient.fetch<DesignerProfile | null>(
      SANITY_QUERIES.designerProfile,
      {},
      { next: { revalidate: 60 } }
    );
    return profile;
  } catch (err) {
    return null;
  }
}
