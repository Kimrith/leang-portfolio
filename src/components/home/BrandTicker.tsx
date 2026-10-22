import { Circle, Hourglass, Disc3, ShieldCheck } from "lucide-react";

export function BrandTicker() {
  const brands = [
    { name: "Supa Blox", icon: Circle },
    { name: "Hype Blox", icon: Hourglass },
    { name: "Frame Blox", icon: Disc3 },
    { name: "Ultra Blox", icon: ShieldCheck },
  ];

  return (
    <section className="w-full py-8 sm:py-12 border-b border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-4">
        {/* Left Subtitle */}
        <span className="text-xs sm:text-sm font-medium text-neutral-400 shrink-0">
          Trusted by Brands I&apos;ve Helped Shape
        </span>

        {/* Brand Logotypes */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12 md:gap-14">
          {brands.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.name}
                className="flex items-center gap-2.5 text-neutral-200 hover:text-white transition-colors group cursor-default"
              >
                <Icon className="w-4 h-4 text-neutral-400 group-hover:text-orange-500 transition-colors" />
                <span className="text-base sm:text-lg font-bold tracking-tight">
                  {b.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
