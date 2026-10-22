import { ExperienceItem, EducationItem } from "@/lib/cms/types";

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export function ExperienceTimeline({
  experience,
  education,
}: ExperienceTimelineProps) {
  return (
    <div className="space-y-16">
      {/* Experience Section */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          Professional Experience
        </h3>

        <div className="space-y-12">
          {experience.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-10 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
            >
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
                  {item.period}
                </span>
                <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {item.company}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {item.location}
                </p>
              </div>

              <div className="md:col-span-8 space-y-3">
                <h5 className="text-lg font-light text-neutral-800 dark:text-neutral-200">
                  {item.role}
                </h5>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-400 font-mono text-xs select-none mt-0.5">
                        —
                      </span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {item.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          Education &amp; Credentials
        </h3>

        <div className="space-y-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 pb-6 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
            >
              <div className="md:col-span-4">
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block">
                  {item.year}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {item.location}
                </span>
              </div>

              <div className="md:col-span-8 space-y-1">
                <h4 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {item.degree}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.institution}
                </p>
                {item.note && (
                  <p className="text-xs font-mono text-neutral-400 pt-1">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
