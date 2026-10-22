import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BehindDesignsSection() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <span className="text-xs sm:text-sm font-bold text-[#f97316] tracking-wider uppercase block">
            Behind the Designs
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Shaping Experiences That Make Life Simpler
          </h2>
        </div>

        {/* Right Column: Statement & Orange CTA Button */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 pt-2 lg:pt-8">
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
            I&apos;m a product designer focused on building clean, intuitive interfaces that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-neutral-400 font-medium block">
                Let&apos;s Build Something
              </span>
              <span className="text-sm font-semibold text-white">
                Meaningful Together
              </span>
            </div>

            {/* Glowing Orange Pill Button from Reference Design */}
            <Link
              href="/contact"
              className="group pl-5 pr-2 py-2 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-semibold flex items-center gap-3 shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98]"
            >
              <span>Get in touch</span>
              <span className="w-7 h-7 rounded-full bg-white text-neutral-950 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
