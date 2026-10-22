"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/lib/cms/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  initialProjects: Project[];
}

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Product Design",
  "Design Systems",
  "Brand Identity",
  "Spatial & Web3",
];

// Showcase design placeholders styled directly after the reference image
const SHOWCASE_FEATURED: Project[] = [
  {
    id: "f-1",
    slug: "structural-acoustics",
    title: "Minimalist Tensile Pavilion",
    client: "Architecture Lab",
    year: "2026",
    category: "Product Design",
    tags: ["Industrial", "Spatial"],
    tagline: "High-precision wire suspension and architectural structure.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      alt: "Tensile wire structure",
    },
    featured: true,
    order: 1,
    metadata: {
      role: "Lead Designer",
      timeline: "4 Months",
      tools: ["Rhino", "Keyshot"],
      deliverables: ["Hardware Spec"],
    },
    overview: {
      challenge: "Engineering ultra-light structural balance.",
      solution: "Minimalist stainless tension wires and nodal fasteners.",
    },
    blocks: [],
  },
  {
    id: "f-2",
    slug: "haptic-audio-system",
    title: "Studio Sound Architecture",
    client: "Acoustic Craft",
    year: "2025",
    category: "Brand Identity",
    tags: ["Hardware", "Industrial Design"],
    tagline: "Tactile headphone ergonomics with anodized finish.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
      alt: "Minimalist audio hardware detail",
    },
    featured: true,
    order: 2,
    metadata: {
      role: "Creative Director",
      timeline: "6 Months",
      tools: ["Figma", "Blender"],
      deliverables: ["Industrial Identity"],
    },
    overview: {
      challenge: "Creating silent, timeless acoustic hardware.",
      solution: "Matte sandblasted aluminum and zero-clutter surfaces.",
    },
    blocks: [],
  },
  {
    id: "f-3",
    slug: "botanical-elixir-packaging",
    title: "L’Origine Botanical System",
    client: "Maison Forma",
    year: "2025",
    category: "Product Design",
    tags: ["Packaging", "Art Direction"],
    tagline: "Sustainable amber glass bottle and embossed label typography.",
    coverImage: {
      url: "https://images.unsplash.com/photo-1608248597359-00911802ebba?q=80&w=1200&auto=format&fit=crop",
      alt: "Luxury minimalist packaging",
    },
    featured: true,
    order: 3,
    metadata: {
      role: "Packaging Director",
      timeline: "3 Months",
      tools: ["Illustrator", "Cinema 4D"],
      deliverables: ["Packaging Spec"],
    },
    overview: {
      challenge: "Elevating sustainable glass apothecary packaging.",
      solution: "Recycled amber glass with screen-printed typography.",
    },
    blocks: [],
  },
];

export function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  // Merge CMS live projects with showcase items if CMS has only few projects
  const displayProjects =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : SHOWCASE_FEATURED;

  const filteredProjects =
    activeCategory === "All"
      ? displayProjects
      : displayProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="w-full pb-20 sm:pb-28 scroll-mt-24">
      {/* Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Selected Works ({filteredProjects.length})
          </span>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs font-mono px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[#f97316] text-white font-semibold shadow-md shadow-orange-500/20"
                    : "text-neutral-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Responsive Grid matching Reference Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index < 3}
          />
        ))}
      </div>
    </section>
  );
}
