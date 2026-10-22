import { SkillCategory } from "@/lib/cms/types";

interface SkillsMatrixProps {
  skills: SkillCategory[];
}

export function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        Core Competencies &amp; Matrix
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((category) => (
          <div
            key={category.category}
            className="p-6 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/50 dark:bg-neutral-900/40 space-y-4"
          >
            <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold">
              {category.category}
            </h4>

            <ul className="space-y-2.5">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
