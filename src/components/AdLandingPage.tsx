"use client";

import Link from "next/link";
import { ArrowRight, Check, Shield, Zap, Globe } from "lucide-react";

interface LandingPageProps {
  toolName: string;
  toolSlug: string;
  headline: string;
  subheadline: string;
  features: string[];
  ctaText: string;
  benefits: { icon: React.ReactNode; title: string; description: string }[];
}

export function AdLandingPage({
  toolName,
  toolSlug,
  headline,
  subheadline,
  features,
  ctaText,
  benefits,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Free Online Tool - No Sign Up Required
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            {subheadline}
          </p>

          {/* CTA Button */}
          <Link
            href={`/${toolSlug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> 100% Free
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" /> No Data Stored
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-500" /> Works Offline
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Why Use {toolName}?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Everything You Need
          </h2>

          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            No sign-up, no downloads. Just open and use.
          </p>
          <Link
            href={`/${toolSlug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Try {toolName} Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
