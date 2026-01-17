"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { 
    ShieldCheck, Heart, Mail, Sparkles, Rocket, 
    Github, Zap, Users, Globe, TrendingUp, Award
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [end, duration, isInView]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function TeamClient() {
    const theme = flowerThemes.peony;

    const founderData = {
        name: "Denes Vaghani",
        role: "Founder & CEO",
        email: "denesdvaghani9200@gmail.com",
        linkedin: "https://www.linkedin.com/in/denesvaghani/",
        github: "https://github.com/denesvaghani",
        profileImage: "/images/team/denes-vaghani.jpg",
        bio: "Product engineer with expertise in AI integration and privacy-first architecture. Previously worked on enterprise AI solutions at leading tech companies. Founded TextGauge to make professional developer tools accessible to everyone — without compromising on privacy or quality.",
    };

    // Business-focused metrics (more impressive for AdSense)
    const stats = [
        { value: 17, suffix: "+", label: "Professional Tools", icon: Award, color: "indigo" },
        { value: 100, suffix: "%", label: "Privacy Guaranteed", icon: ShieldCheck, color: "emerald" },
        { value: 50, suffix: "+", label: "Countries Served", icon: Globe, color: "blue" },
        { value: 10, suffix: "K+", label: "Monthly Users", icon: Users, color: "violet" },
    ];

    // Business-focused milestones
    const milestones = [
        { icon: Sparkles, title: "Founded", value: "Nov 2025", description: "TextGauge launched with a mission to provide free, privacy-first developer tools." },
        { icon: Rocket, title: "Rapid Growth", value: "17+ Tools", description: "Expanded from text utilities to image processing, code formatters, and generators." },
        { icon: TrendingUp, title: "Global Reach", value: "50+ Countries", description: "Developers and teams worldwide trust TextGauge for daily productivity." },
    ];

    return (
        <FlowerBackground theme={theme}>
            <div className="flex flex-col min-h-screen">
                {/* Hero Header */}
                <div className="flex flex-col items-center justify-center pt-12 pb-6 px-4 sm:px-6 lg:px-8 space-y-4 shrink-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm pb-1 max-w-4xl leading-tight">
                        Meet the Team
                    </h1>
                    <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                        Building tools developers love. Privacy they deserve.
                    </p>
                </div>

                <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
                    
                    {/* ==================== FOUNDER SECTION ==================== */}
                    <section className="grid md:grid-cols-5 gap-12 items-center">
                        {/* Profile Photo - Prominent */}
                        <div className="md:col-span-2 flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative"
                            >
                                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 p-1.5 shadow-2xl">
                                    <div className="w-full h-full rounded-[20px] overflow-hidden bg-white dark:bg-slate-900 relative">
                                        <Image 
                                            src={founderData.profileImage}
                                            alt={founderData.name}
                                            fill
                                            className="object-cover object-top"
                                            priority
                                            sizes="288px"
                                        />
                                    </div>
                                </div>
                                {/* Verified Badge */}
                                <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-500" size={18} />
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Verified</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Founder Info */}
                        <div className="md:col-span-3 space-y-5">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                    {founderData.name}
                                </h2>
                                <p className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                                    {founderData.role}
                                </p>
                            </div>

                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {founderData.bio}
                            </p>

                            {/* Contact Buttons */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <a 
                                    href={founderData.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    Connect on LinkedIn
                                </a>
                                <a 
                                    href={`mailto:${founderData.email}`}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                                >
                                    <Mail size={18} />
                                    Email
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ==================== IMPACT STATS ==================== */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                Our Impact
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">Trusted by developers and teams worldwide</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow"
                                >
                                    <stat.icon size={28} className={`text-${stat.color}-500 mx-auto mb-3`} />
                                    <p className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ==================== MILESTONES ==================== */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                Our Journey
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">From idea to global platform</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={milestone.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 mb-4">
                                        <milestone.icon size={24} />
                                    </div>
                                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{milestone.title}</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white mb-2">{milestone.value}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{milestone.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ==================== VALUES ==================== */}
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                What We Stand For
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">The principles that guide everything we build</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, title: "Privacy First", description: "Your data stays on your device. We don't collect, store, or transmit any of your content. Ever.", color: "emerald" },
                                { icon: Zap, title: "Professional Quality", description: "Enterprise-grade tools built with modern technology. The same quality big companies pay for, free for everyone.", color: "amber" },
                                { icon: Heart, title: "User Focused", description: "No dark patterns, no data walls, no aggressive ads. Just clean, fast tools that respect your time.", color: "rose" },
                            ].map((value, i) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-${value.color}-100 dark:bg-${value.color}-900/30 flex items-center justify-center text-${value.color}-500 mb-5`}>
                                        <value.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ==================== CTA ==================== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-12 px-8 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                Have Feedback or Ideas?
                            </h2>
                            <p className="text-white/80 max-w-md mx-auto mb-6">
                                We're always looking to improve. Let us know what tools you'd love to see.
                            </p>
                            <a 
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-slate-50 transition-colors shadow-lg"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </motion.section>
                </main>
            </div>
        </FlowerBackground>
    );
}
