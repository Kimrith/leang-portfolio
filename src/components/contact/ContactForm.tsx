"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Copy, Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required (at least 2 characters)"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a service type"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  directEmail?: string;
}

export function ContactForm({
  directEmail = "leang.design.studio@gmail.com",
}: ContactFormProps) {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "Product Design (UI/UX)",
      timeline: "1 — 3 Months",
      budget: "$10k — $25k",
      message: "",
    },
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const onSubmit = async (data: FormValues) => {
    setServerStatus({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setServerStatus({
          type: "success",
          message: json.message || "Inquiry sent successfully! Expect a reply within 24 hours.",
        });
        reset();
      } else {
        setServerStatus({
          type: "error",
          message: json.message || "Failed to transmit message. Please email directly.",
        });
      }
    } catch {
      setServerStatus({
        type: "error",
        message: "Network error occurred. Please try emailing directly.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Direct Email Row */}
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
            Direct Inquiries &amp; Confidential RFPs
          </span>
          <span className="text-sm font-mono text-neutral-900 dark:text-neutral-100 font-medium">
            {directEmail}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">
                Copied to clipboard!
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy email address</span>
            </>
          )}
        </button>
      </div>

      {/* Success Notification */}
      {serverStatus.type === "success" && (
        <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-sm font-semibold">Message Received</h4>
          </div>
          <p className="text-xs font-mono">{serverStatus.message}</p>
          <button
            type="button"
            onClick={() => setServerStatus({ type: "idle" })}
            className="text-xs underline pt-2 text-emerald-700 dark:text-emerald-300"
          >
            Send another inquiry
          </button>
        </div>
      )}

      {/* Error Notification */}
      {serverStatus.type === "error" && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 text-xs font-mono">
          {serverStatus.message}
        </div>
      )}

      {/* Contact Form */}
      {serverStatus.type !== "success" && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Your Name *
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Katherine Miller"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              />
              {errors.name && (
                <p className="text-xs font-mono text-rose-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="katherine@company.com"
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              />
              {errors.email && (
                <p className="text-xs font-mono text-rose-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Service & Timeline Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Project Scope
              </label>
              <select
                {...register("projectType")}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              >
                <option value="Product Design (UI/UX)">Product Design (UI/UX)</option>
                <option value="Design Systems Architecture">Design Systems Architecture</option>
                <option value="Spatial & 3D Interface">Spatial &amp; 3D Interface</option>
                <option value="Brand Identity & Direction">Brand Identity &amp; Direction</option>
                <option value="Design Advisory / Leadership">Design Advisory / Leadership</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Estimated Timeline
              </label>
              <select
                {...register("timeline")}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              >
                <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                <option value="1 — 3 Months">1 — 3 Months</option>
                <option value="3 — 6 Months">3 — 6 Months</option>
                <option value="Long-term Advisory">Long-term Advisory</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Budget Range
              </label>
              <select
                {...register("budget")}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
              >
                <option value="<$10,000">&lt; $10,000</option>
                <option value="$10,000 — $25,000">$10,000 — $25,000</option>
                <option value="$25,000 — $50,000">$25,000 — $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Project Brief &amp; Context *
            </label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tell me about your product, objectives, and any existing design artifacts..."
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors resize-y"
            />
            {errors.message && (
              <p className="text-xs font-mono text-rose-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
              Strictly confidential · NDA available upon request
            </span>

            <button
              type="submit"
              disabled={serverStatus.type === "loading"}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {serverStatus.type === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
