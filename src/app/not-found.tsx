import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          Error 404
        </span>
        <h1 className="text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100">
          Page Not Found
        </h1>
        <p className="text-sm text-neutral-500 font-light">
          The requested case study or page could not be located.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
