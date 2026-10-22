import { getProjects, getDesignerProfile } from "@/lib/cms";
import { GlowHero } from "@/components/home/GlowHero";
import { BrandTicker } from "@/components/home/BrandTicker";
import { BehindDesignsSection } from "@/components/home/BehindDesignsSection";
import { ProjectGrid } from "@/components/work/ProjectGrid";

export default async function HomePage() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getDesignerProfile(),
  ]);

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Hero Showcase with Radiant Warm Glowing Gradient */}
        <GlowHero
          designerName={profile.name}
          roleTitle={profile.roleTitle}
        />

        {/* 2. Social Proof / Client Marquee */}
        <BrandTicker />

        {/* 3. Behind the Designs Section */}
        <BehindDesignsSection />

        {/* 4. Featured Work & Multi-Column Grid */}
        <ProjectGrid initialProjects={projects} />
      </div>
    </div>
  );
}
