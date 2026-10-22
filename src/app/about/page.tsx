import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDesignerProfile } from "@/lib/cms";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { SkillsMatrix } from "@/components/about/SkillsMatrix";
import { ArrowUpRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Leang Sok",
  description:
    "Product Designer & Design Systems Architect with 9+ years crafting systematic digital instruments, enterprise platforms, and spatial interfaces.",
};

export default async function AboutPage() {
  const profile = await getDesignerProfile();

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">
        {/* Hero Bio Section with Portrait Photo */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait Photo (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-mono text-xs flex justify-between items-end">
                <span>{profile.name}</span>
                <span className="opacity-80">{profile.location}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 text-xs font-mono space-y-2">
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>Status</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {profile.availability}
                </span>
              </div>
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>Specialization</span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  Product &amp; Systems
                </span>
              </div>
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>Email</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-neutral-900 dark:text-neutral-100 hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          {/* Bio Text & Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
                Background &amp; Philosophy
              </span>
              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                Designing with{" "}
                <span className="font-serif italic text-neutral-500 dark:text-neutral-400">
                  quiet restraint
                </span>{" "}
                and mathematical precision.
              </h1>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {profile.bioParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Inquire for Projects
              </Link>
              <a
                href={profile.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-mono text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <span>Curriculum Vitae</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Experience & Education Timeline */}
        <section className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <ExperienceTimeline
            experience={profile.experience}
            education={profile.education}
          />
        </section>

        {/* Skills Matrix */}
        <section className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <SkillsMatrix skills={profile.skills} />
        </section>

        {/* Awards & Recognition */}
        {profile.awards && profile.awards.length > 0 && (
          <section className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800">
              Selected Honors &amp; Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.awards.map((award) => (
                <div
                  key={award.id}
                  className="p-6 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 space-y-2 bg-neutral-50/30 dark:bg-neutral-900/20"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{award.year}</span>
                    <Award className="w-4 h-4 opacity-60" />
                  </div>
                  <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {award.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {award.organization}
                  </p>
                  {award.project && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 pt-1">
                      Project: {award.project}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Client Roster */}
        {profile.clients && profile.clients.length > 0 && (
          <section className="pt-12 border-t border-neutral-200 dark:border-neutral-800 pb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800">
              Collaborated With
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {profile.clients.map((client) => (
                <div
                  key={client}
                  className="py-6 px-4 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 text-sm font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-50/40 dark:bg-neutral-900/30"
                >
                  {client}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
