"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle, Phone, Globe } from "lucide-react";

export default function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Ignore
    }
  };

  const contactMethods = [
    {
      id: "telegram",
      label: "Telegram",
      value: "@chhaichhai1888",
      copyText: "@chhaichhai1888",
      href: "https://t.me/chhaichhai1888",
      icon: MessageCircle,
      description: "Fastest response for inquiries & instant messaging",
      actionLabel: "Open Chat",
    },
    {
      id: "phone",
      label: "Phone & Mobile",
      value: "+855 71 878 8785",
      copyText: "+855718788785",
      href: "tel:+855718788785",
      icon: Phone,
      description: "Direct voice calls, WhatsApp & SMS",
      actionLabel: "Call",
    },
    {
      id: "facebook",
      label: "Facebook",
      value: "facebook.com/chhai.leang.102",
      copyText: "https://www.facebook.com/chhai.leang.102",
      href: "https://www.facebook.com/chhai.leang.102",
      icon: Globe,
      description: "Social profile & direct Messenger",
      actionLabel: "Visit Profile",
    },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Direct Reach
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-950 dark:text-neutral-50">
            Let&apos;s{" "}
            <span className="font-serif italic font-normal text-neutral-500 dark:text-neutral-400">
              Connect
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-xl">
            Reach out directly through Telegram, phone, or Facebook for new projects, creative direction, and collaborations.
          </p>
        </section>

        {/* Minimalist Contact Channel Rows */}
        <section className="border-t border-neutral-200 dark:border-neutral-800">
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const isCopied = copiedKey === method.id;

              return (
                <li
                  key={method.id}
                  className="py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 px-2 sm:px-4 rounded-xl -mx-2 sm:-mx-4 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                        {method.label}
                      </span>
                    </div>

                    <a
                      href={method.href}
                      target={method.id === "phone" ? undefined : "_blank"}
                      rel={method.id === "phone" ? undefined : "noopener noreferrer"}
                      className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors block"
                    >
                      {method.value}
                    </a>

                    <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {method.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(method.copyText, method.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 opacity-60" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={method.href}
                      target={method.id === "phone" ? undefined : "_blank"}
                      rel={method.id === "phone" ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                      <span>{method.actionLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
