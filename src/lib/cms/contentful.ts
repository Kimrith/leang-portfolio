import { createClient } from "contentful";
import { Project, DesignerProfile } from "./types";

export const contentfulConfig = {
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
};

export const isContentfulConfigured = Boolean(
  contentfulConfig.space &&
    contentfulConfig.space.trim() !== "" &&
    contentfulConfig.accessToken &&
    contentfulConfig.accessToken.trim() !== ""
);

export const contentfulClient = isContentfulConfigured
  ? createClient({
      space: contentfulConfig.space,
      accessToken: contentfulConfig.accessToken,
      environment: contentfulConfig.environment,
    })
  : null;

export async function fetchContentfulProjects(): Promise<Project[] | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries({
      content_type: "project",
      order: ["fields.order" as any],
    });

    if (!entries.items.length) return null;

    return entries.items.map((item: any) => {
      const f = item.fields;
      return {
        id: item.sys.id,
        slug: f.slug,
        title: f.title,
        client: f.client,
        year: f.year,
        category: f.category,
        tags: f.tags || [],
        tagline: f.tagline || "",
        coverImage: {
          url: f.coverImage?.fields?.file?.url
            ? `https:${f.coverImage.fields.file.url}`
            : "",
          alt: f.coverImage?.fields?.title || f.title,
          caption: f.coverImageCaption,
        },
        featured: Boolean(f.featured),
        order: f.order || 99,
        metadata: f.metadata || {
          role: f.role || "Lead Designer",
          timeline: f.timeline || "2024",
          tools: f.tools || [],
          deliverables: f.deliverables || [],
          liveUrl: f.liveUrl,
        },
        overview: f.overview || {
          challenge: f.challenge || "",
          solution: f.solution || "",
        },
        blocks: f.blocks || [],
      } as Project;
    });
  } catch (err) {
    console.warn("Failed to fetch projects from Contentful, falling back:", err);
    return null;
  }
}

export async function fetchContentfulProjectBySlug(slug: string): Promise<Project | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries({
      content_type: "project",
      "fields.slug": slug,
      limit: 1,
    });

    if (!entries.items.length) return null;
    const item: any = entries.items[0];
    const f = item.fields;

    return {
      id: item.sys.id,
      slug: f.slug,
      title: f.title,
      client: f.client,
      year: f.year,
      category: f.category,
      tags: f.tags || [],
      tagline: f.tagline || "",
      coverImage: {
        url: f.coverImage?.fields?.file?.url
          ? `https:${f.coverImage.fields.file.url}`
          : "",
        alt: f.coverImage?.fields?.title || f.title,
        caption: f.coverImageCaption,
      },
      featured: Boolean(f.featured),
      order: f.order || 99,
      metadata: f.metadata || {
        role: f.role || "Lead Designer",
        timeline: f.timeline || "2024",
        tools: f.tools || [],
        deliverables: f.deliverables || [],
        liveUrl: f.liveUrl,
      },
      overview: f.overview || {
        challenge: f.challenge || "",
        solution: f.solution || "",
      },
      blocks: f.blocks || [],
    } as Project;
  } catch (err) {
    console.warn(`Failed to fetch project ${slug} from Contentful:`, err);
    return null;
  }
}
