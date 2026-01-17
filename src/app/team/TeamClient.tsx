"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { 
    Code2, ShieldCheck, Heart, Mail, Sparkles, Rocket, 
    Github, Calendar, Zap, Users, Globe, Coffee, Wrench
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
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

    return <span ref={ref}>{count}{suffix}</span>;
}

// Timeline Item
function TimelineItem({ year, title, description, icon: Icon, isLast = false }: { 
    year: string; 
    title: string; 
    description: string; 
    icon: React.ElementType;
    isLast?: boolean;
}) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-8 pb-8"
        >
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent" />
            )}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center ring-4 ring-white dark:ring-slate-900">
                <Icon size={12} className="text-white" />
            </div>
            {/* Content */}
            <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">{year}</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </motion.div>
    );
}

export function TeamClient() {
    const theme = flowerThemes.peony;

    const founderData = {
        name: "Denes Vaghani",
        role: "Founder & Lead Developer",
        email: "denesdvaghani9200@gmail.com",
        linkedin: "https://www.linkedin.com/in/denesvaghani/",
        github: "https://github.com/denesvaghani",
        profileImage: "/images/team/denes-vaghani.jpg",
        tagline: "Building the developer tools I wish existed",
    };

    const stats = [
        { value: 17, suffix: "+", label: "Tools Built", icon: Wrench },
        { value: 100, suffix: "%", label: "Client-Side", icon: ShieldCheck },
        { value: 0, suffix: "", label: "Data Sent to Servers", icon: Globe },
        { value: 247, suffix: "+", label: "Automated Tests", icon: Code2 },
    ];

    const timeline = [
        { year: "2024", title: "The Problem", description: "Frustrated with developer tools that harvest code for 'analytics'. Started building privacy-first alternatives.", icon: Coffee },
        { year: "2024", title: "TextGauge Born", description: "Launched with Character Counter, JSON Formatter, and the vision of 100% browser-based processing.", icon: Rocket },
        { year: "2025", title: "AI-Accelerated Growth", description: "Adopted 'Vibe Coding' workflow. Built 17+ tools in months using AI pair-programming.", icon: Sparkles },
        { year: "Now", title: "The Mission Continues", description: "Expanding to image tools, generators, and more. Every tool processes locally. Always.", icon: Zap },
    ];

    const techStack = [
        { name: "Next.js 15", category: "Framework" },
        { name: "TypeScript", category: "Language" },
        { name: "Framer Motion", category: "Animation" },
        { name: "Vitest", category: "Testing" },
        { name: "Web Workers", category: "Performance" },
        { name: "Vercel", category: "Hosting" },
    ];

    return (
        <FlowerBackground theme={theme}>
            <div className="flex flex-col min-h-screen">
                {/* Hero Header */}
                <div className="flex flex-col items-center justify-center pt-12 pb-6 px-4 sm:px-6 lg:px-8 space-y-4 shrink-0">
                    {/* AI Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800"
                    >
                        <Sparkles size={14} className="text-indigo-500" />
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Built with AI-Accelerated Development</span>
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm pb-1 max-w-4xl leading-tight">
                        The Team Behind TextGauge
                    </h1>
                    <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                        One developer. One mission. Zero compromises on privacy.
                    </p>
                </div>

                <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                    
                    {/* ==================== BENTO GRID ==================== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]">
                        
                        {/* Founder Card - Large */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 relative overflow-hidden group"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            
                            {/* Background image */}
                            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                                <Image 
                                    src={founderData.profileImage}
                                    alt=""
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-20 h-full flex flex-col justify-end">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-white/80">
                                        Founder
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-sm text-xs font-semibold text-indigo-300">
                                        Solo Developer
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-1">
                                    {founderData.name}
                                </h2>
                                <p className="text-lg text-white/70 mb-4">
                                    {founderData.tagline}
                                </p>
                                
                                {/* Social Links */}
                                <div className="flex gap-3">
                                    <a 
                                        href={founderData.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                    <a 
                                        href={founderData.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/20 transition-colors"
                                    >
                                        <Github size={16} />
                                        GitHub
                                    </a>
                                    <a 
                                        href={`mailto:${founderData.email}`}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/20 transition-colors"
                                    >
                                        <Mail size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Cards */}
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * i }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors group"
                            >
                                <stat.icon size={24} className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Timeline Card - Wide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Calendar size={20} className="text-indigo-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Journey</h3>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-x-8">
                                {timeline.slice(0, 2).map((item, i) => (
                                    <TimelineItem key={i} {...item} isLast={false} />
                                ))}
                                {timeline.slice(2).map((item, i) => (
                                    <TimelineItem key={i + 2} {...item} isLast={i === timeline.slice(2).length - 1} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="md:col-span-2 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/50 dark:via-slate-900 dark:to-violet-950/50 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/50"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Code2 size={20} className="text-indigo-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tech Stack</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech) => (
                                    <div 
                                        key={tech.name}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                                    >
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">{tech.category}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ==================== VALUES SECTION ==================== */}
                    <section className="pt-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                What We Stand For
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">The principles behind every tool we build</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheck, title: "Privacy First", description: "Your code, your data. Everything processes locally in your browser. Zero server uploads.", color: "emerald" },
                                { icon: Zap, title: "Enterprise Quality", description: "Monaco editors, Web Workers, 247+ automated tests. Professional-grade tools, free for everyone.", color: "amber" },
                                { icon: Heart, title: "Developer Love", description: "No pop-ups, no data walls, no dark patterns. Clean, fast tools that respect your time.", color: "rose" },
                            ].map((value, i) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-${value.color}-100 dark:bg-${value.color}-900/30 flex items-center justify-center text-${value.color}-500 mb-5 group-hover:scale-110 transition-transform`}>
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

                    {/* ==================== CTA SECTION ==================== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center py-12 px-8 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
                        <div className="relative z-10">
                            <Users size={40} className="text-white/80 mx-auto mb-4" />
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                Join The Mission
                            </h2>
                            <p className="text-white/80 max-w-md mx-auto mb-6">
                                Have feedback? Want a new tool? I'd love to hear from you.
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
