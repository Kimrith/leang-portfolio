import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/cms/types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/work/${project.slug}`}
        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
      >
        {/* Rounded Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#18181b] border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-md">
          {project.coverImage?.url ? (
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-neutral-500 bg-[#141416]">
              Case Study Mockup
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Top Right Floating Year / Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90">
              {project.category || "Design"}
            </span>
          </div>

          {/* Floating Hover Arrow Circle */}
          <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-neutral-950 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-orange-400 font-semibold">
              {project.client || "Client Work"}
            </span>
            {project.year && (
              <span className="text-neutral-500 font-mono text-[11px]">
                {project.year}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
            {project.title}
          </h3>

          {project.tagline && (
            <p className="text-sm text-neutral-400 line-clamp-2 font-normal leading-relaxed">
              {project.tagline}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
