"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Copy, Check } from "lucide-react";
import { SocialLink } from "@/lib/cms/types";

interface FooterProps {
  designerName?: string;
  email?: string;
  socials?: SocialLink[];
  timezone?: string;
}

export function Footer({
  designerName = "Hoeurn Chhaileang",
  email = "chhaileang078@gmail.com",
  socials = [
    { platform: "facebook" as any, label: "Facebook", url: "https://www.facebook.com/chhai.leang.102", handle: "chhai.leang.102" },
    { platform: "telegram" as any, label: "Telegram", url: "https://t.me/chhaichhai1888", handle: "@chhaichhai1888" },
    { platform: "phone" as any, label: "Phone", url: "tel:+855718788785", handle: "+855 71 878 8785" },
  ],
  timezone = "ICT (UTC+7)",
}: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const updateTime = () => {
      const now = new Date();
      // Format time in ICT / local designer timezone
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Phnom_Penh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-stone-50/50 dark:bg-stone-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Middle Navigation & Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-neutral-200/70 dark:border-neutral-800/70 text-sm">
          {/* Col 1: Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
              Index
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#work"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/expertise"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Expertise &amp; Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  About &amp; Background
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 3: Presence */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
              Location & Time
            </h3>
            <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <p>Phnom Penh / Global Remote</p>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>
                  {currentTime || "10:30:00 AM"} {timezone}
                </span>
              </div>
              <p className="text-xs text-neutral-400">Available across EU & US East overlaps</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500">
          <p>© {currentYear} {designerName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Crafted with precision &amp; intention</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
