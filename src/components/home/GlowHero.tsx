import Image from "next/image";

interface GlowHeroProps {
  designerName?: string;
  roleTitle?: string;
}

export function GlowHero({
  roleTitle = "Creative Director",
}: GlowHeroProps) {
  const specialties = [
    { number: "#01", title: "Brand Strategy" },
    { number: "#02", title: "Brand Identity Design" },
    { number: "#03", title: "Packaging Design" },
    { number: "#04", title: "Creative Direction" },
  ];

  return (
    <section className="w-full pt-2 pb-8 sm:pb-12">
      {/* Outer rounded card container */}
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden bg-[#180805] border border-orange-500/20 shadow-2xl">
        {/* Glowing Gradient Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 35% 20%, #ff5500 0%, #e63800 35%, #b31e00 60%, #4a0808 85%, #140505 100%)",
          }}
        />

        {/* Ambient Warm Vignette & Grid Depth */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Silhouette / Portrait Photo Blended into Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 z-0 pointer-events-none overflow-hidden flex items-end justify-center md:justify-end">
          <div className="relative w-full h-[115%] opacity-90 mix-blend-screen contrast-125 saturate-150">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
              alt="Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top mask-radial"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8)) brightness(0.95)",
              }}
            />
          </div>
          {/* Edge gradient masks to integrate seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e63800] via-transparent to-transparent opacity-80 md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between">
          {/* Top Hero Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 sm:pt-8">
            {/* Left Big Heading */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <span className="text-sm sm:text-base md:text-lg font-medium text-white/90 tracking-wide block">
                Hey, I&apos;m a
              </span>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-white leading-[0.94] drop-shadow-sm">
                Creative <br />
                Director
              </h1>
            </div>

            {/* Right Tagline Block */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3 max-w-md pt-2 lg:pt-12">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                Great design should feel invisible.
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                From logo to language, I build brands that connect and convert.
              </p>
            </div>
          </div>

          {/* Bottom Numbered Specialties Strip */}
          <div className="pt-16 sm:pt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-white/15">
              {specialties.map((item) => (
                <div key={item.number} className="space-y-1">
                  <span className="text-xs sm:text-sm font-mono font-bold text-orange-400 block tracking-wider">
                    {item.number}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white tracking-tight">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
