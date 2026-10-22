"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface HeaderProps {
  designerName?: string;
  monogram?: string;
  statusText?: string;
  resumeUrl?: string;
}

export function Header({
  designerName = "Folioblox",
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#work" },
    { label: "Expertise", href: "/expertise" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0e]/90 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          {designerName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && link.href !== "/#work";

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Pill CTA Button (White pill with orange arrow circle from reference design) */}
          <Link
            href="/contact"
            className="group pl-5 pr-2 py-2 rounded-full bg-white text-neutral-950 text-xs font-semibold flex items-center gap-2.5 hover:bg-neutral-100 transition-all active:scale-[0.98] shadow-sm"
          >
            <span>Get in touch</span>
            <span className="w-6 h-6 rounded-full bg-[#f97316] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/contact"
            className="pl-4 pr-1.5 py-1.5 rounded-full bg-white text-neutral-950 text-xs font-semibold flex items-center gap-2"
          >
            <span>Contact</span>
            <span className="w-5 h-5 rounded-full bg-[#f97316] text-white flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#0d0d0e]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-base" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-white hover:text-orange-400 transition-colors py-2 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs text-neutral-400">→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
