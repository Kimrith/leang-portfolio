import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Expertise — Leang Sok",
  description:
    "Core creative & technical tool skills: Photoshop, Illustrator, After Effects, DaVinci Resolve, Photography, and CapCut.",
};

const SKILLS = [
  { id: "01", name: "Photoshop", category: "Image & Retouching" },
  { id: "02", name: "Illustrator", category: "Vector & Identity" },
  { id: "03", name: "After Effects", category: "Motion & Animation" },
  { id: "04", name: "DaVinci Resolve", category: "Color & Video" },
  { id: "05", name: "Photography", category: "Optics & Light" },
  { id: "06", name: "CapCut", category: "Short-Form Video" },
];

export default function ExpertisePage() {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">
        {/* Header */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Index of Core Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-950 dark:text-neutral-50">
            Tool{" "}
            <span className="font-serif italic font-normal text-neutral-500 dark:text-neutral-400">
              Expertise
            </span>
          </h1>
        </section>

        {/* Minimalist Skills List (No Descriptions) */}
        <section className="border-t border-neutral-200 dark:border-neutral-800">
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {SKILLS.map((skill) => (
              <li
                key={skill.id}
                className="group py-8 sm:py-10 flex items-baseline justify-between transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 px-2 sm:px-4 rounded-lg -mx-2 sm:-mx-4"
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 w-6">
                    {skill.id}
                  </span>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:translate-x-2 transition-transform duration-300">
                    {skill.name}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Minimal Bottom Link */}
        <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400 dark:text-neutral-500">
            Available for select commissions
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors uppercase tracking-wider font-medium"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
