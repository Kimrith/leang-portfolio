import Image from "next/image";
import { ProjectContentBlock } from "@/lib/cms/types";
import { Play } from "lucide-react";

interface ModularBlocksProps {
  blocks: ProjectContentBlock[];
}

export function ModularBlocks({ blocks }: ModularBlocksProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-20 sm:space-y-28 my-16 sm:my-24">
      {blocks.map((block) => {
        switch (block._type) {
          case "text":
            return (
              <section key={block.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4">
                  {block.subheading && (
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
                      {block.subheading}
                    </span>
                  )}
                  {block.heading && (
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
                      {block.heading}
                    </h3>
                  )}
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                    {block.body}
                  </p>
                </div>
              </section>
            );

          case "fullWidthImage":
            return (
              <figure key={block.id} className="w-full">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/70">
                  <Image
                    src={block.image.url}
                    alt={block.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                {block.image.caption && (
                  <figcaption className="mt-3 text-xs font-mono text-neutral-400 dark:text-neutral-500 text-center">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "sideBySide":
            return (
              <div key={block.id} className="w-full space-y-4">
                {block.title && (
                  <h4 className="text-sm font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    {block.title}
                  </h4>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left */}
                  <figure className="space-y-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/70">
                      <Image
                        src={block.leftImage.url}
                        alt={block.leftImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {block.leftImage.caption && (
                      <figcaption className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        {block.leftImage.caption}
                      </figcaption>
                    )}
                  </figure>

                  {/* Right */}
                  <figure className="space-y-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/70">
                      <Image
                        src={block.rightImage.url}
                        alt={block.rightImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {block.rightImage.caption && (
                      <figcaption className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        {block.rightImage.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="py-12 border-y border-neutral-200 dark:border-neutral-800 my-12"
              >
                <div className="max-w-4xl mx-auto space-y-6 text-center">
                  <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 font-light leading-snug">
                    &ldquo;{block.quote}&rdquo;
                  </p>
                  <footer className="flex flex-col items-center gap-1">
                    <cite className="not-italic text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {block.author}
                    </cite>
                    {block.role && (
                      <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        {block.role}
                      </span>
                    )}
                  </footer>
                </div>
              </blockquote>
            );

          case "metricsGrid":
            return (
              <div
                key={block.id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-neutral-200/70 dark:border-neutral-800/70"
              >
                {block.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col space-y-1">
                    <span className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 font-serif">
                      {metric.value}
                    </span>
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {metric.label}
                    </span>
                    {metric.description && (
                      <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                        {metric.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );

          case "videoLoop":
            return (
              <figure key={block.id} className="w-full space-y-3">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800/70 group">
                  <Image
                    src={block.posterUrl}
                    alt={block.title}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-80 group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md flex items-center justify-center text-neutral-900 dark:text-neutral-100 shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-white/80 px-3 py-1 bg-black/60 backdrop-blur-md rounded">
                    {block.title} (Interactive Loop)
                  </div>
                </div>
                {block.caption && (
                  <figcaption className="text-xs font-mono text-neutral-400 dark:text-neutral-500 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
