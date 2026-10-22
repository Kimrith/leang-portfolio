import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects, getAdjacentProjects } from "@/lib/cms";
import { ModularBlocks } from "@/components/work/ModularBlocks";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Leang Sok`,
    description: project.tagline || project.overview?.challenge || "Design Case Study",
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.tagline || project.overview?.challenge || "Design Case Study",
      images: project.coverImage?.url
        ? [
            {
              url: project.coverImage.url,
              width: 1600,
              height: 1000,
              alt: project.coverImage.alt || project.title,
            },
          ]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(slug);

  return (
    <article className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Index</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-6 pb-12 sm:pb-16 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <span>{project.client}</span>
            <span>/</span>
            <span>{project.category}</span>
            <span>/</span>
            <span>{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 max-w-5xl">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 font-light max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Project Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-900/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Immersive Hero Cover */}
        {project.coverImage?.url && (
          <div className="my-12 sm:my-16">
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/70 shadow-sm">
              <Image
                src={project.coverImage.url}
                alt={project.coverImage.alt || project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {project.coverImage.caption && (
              <p className="mt-3 text-xs font-mono text-neutral-400 dark:text-neutral-500 text-center">
                {project.coverImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Structured Metadata Sidebar & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Metadata Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            {project.metadata?.role && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
                  Role
                </span>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {project.metadata.role}
                </p>
              </div>
            )}

            {project.metadata?.timeline && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
                  Timeline
                </span>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {project.metadata.timeline}
                </p>
              </div>
            )}

            {project.metadata?.tools && project.metadata.tools.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
                  Tools &amp; Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.metadata.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.metadata?.deliverables && project.metadata.deliverables.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                  {project.metadata.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-400">/</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.metadata?.liveUrl && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                <a
                  href={project.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </aside>

          {/* Overview: Challenge & Solution (8 cols) */}
          <div className="lg:col-span-8 space-y-12 order-1 lg:order-2">
            {project.overview?.challenge && (
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
                  01. The Challenge
                </span>
                <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-light leading-relaxed">
                  {project.overview.challenge}
                </p>
              </div>
            )}

            {project.overview?.solution && (
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
                  02. The Solution
                </span>
                <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-light leading-relaxed">
                  {project.overview.solution}
                </p>
              </div>
            )}

            {project.overview?.impact && (
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
                  03. The Impact
                </span>
                <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 font-light leading-relaxed">
                  {project.overview.impact}
                </p>
              </div>
            )}

            {/* Impact Metric Stats */}
            {project.overview?.metrics && project.overview.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                {project.overview.metrics.map((metric, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-serif text-neutral-900 dark:text-neutral-100">
                      {metric.value}
                    </span>
                    <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                      {metric.label}
                    </p>
                    {metric.description && (
                      <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                        {metric.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CMS Modular Content Blocks (Full Width Image, Side-by-Side, Quotes, Specs) */}
        <ModularBlocks blocks={project.blocks} />

        {/* Previous / Next Project Navigation Bar */}
        <nav
          className="pt-16 pb-12 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8"
          aria-label="Case Study Pagination"
        >
          {prev && (
            <Link
              href={`/work/${prev.slug}`}
              className="group p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Case Study</span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-light text-neutral-900 dark:text-neutral-100">
                  {prev.title}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {prev.category} · {prev.year}
                </p>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between text-left md:text-right"
            >
              <div className="flex items-center justify-start md:justify-end gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                <span>Next Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-light text-neutral-900 dark:text-neutral-100">
                  {next.title}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {next.category} · {next.year}
                </p>
              </div>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
