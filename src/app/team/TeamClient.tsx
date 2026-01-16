"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { Code2, ShieldCheck, Heart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function TeamClient() {
    const theme = flowerThemes.peony;

    const founderData = {
        name: "Denes Vaghani",
        role: "Founder & Lead Developer",
        email: "denesdvaghani9200@gmail.com",
        linkedin: "https://www.linkedin.com/in/denesvaghani/",
        profileImage: "/images/team/denes-vaghani.jpg",
        summary: "I started TextGauge to solve a problem I kept running into — powerful developer tools that treat your code like their data. As a product engineer with a background in AI integration and full-stack development, I'm building the toolkit I wish existed: enterprise-grade utilities that process everything locally, respect your privacy, and just work.",
        skills: ["AI & LLM Integration", "Privacy-First Architecture", "Full-Stack Development", "Technical Leadership", "Product Strategy"]
    };

    return (
        <FlowerBackground theme={theme}>
            <div className="flex flex-col min-h-screen">
                {/* Custom Header - No Flower Icon */}
                <div className="flex flex-col items-center justify-center pt-12 pb-8 px-4 sm:px-6 lg:px-8 space-y-4 shrink-0 animate-in fade-in zoom-in duration-500">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm pb-1 max-w-4xl leading-tight">
                        The Team Behind TextGauge
                    </h1>
                    <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
                        Meet the founder building the next generation of privacy-focused developer tools.
                    </p>
                </div>

                <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                    {/* Founder Section */}
                    <section className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative"
                            >
                                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-1 shadow-2xl rotate-3 overflow-hidden">
                                    <div className="w-full h-full rounded-[20px] overflow-hidden -rotate-3 relative">
                                        <Image 
                                            src={founderData.profileImage}
                                            alt={founderData.name}
                                            fill
                                            className="object-cover scale-150 object-[center_20%]"
                                            priority
                                        />
                                    </div>
                                </div>
                                {/* Decorative Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-500" size={20} />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Verified Developer</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="md:col-span-7 space-y-6">
                            {/* Founder Label */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Meet the Founder</span>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                    {founderData.name}
                                </h2>
                                <p className="text-xl font-medium text-slate-600 dark:text-slate-400">
                                    {founderData.role}
                                </p>
                            </div>

                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {founderData.summary}
                            </p>

                            {/* Expertise Tags - Clean, Professional Design */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Expertise</p>
                                <div className="flex flex-wrap gap-2">
                                    {founderData.skills.map((skill) => (
                                        <span 
                                            key={skill}
                                            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Buttons - LinkedIn + Email only */}
                            <div className="flex gap-4 pt-4">
                                <a 
                                    href={founderData.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0A66C2] text-white font-bold hover:bg-[#004182] transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    {/* Official LinkedIn Logo */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </a>
                                <a 
                                    href={`mailto:${founderData.email}`}
                                    className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                                >
                                    <Mail size={20} />
                                    Email
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Vision Section */}
                    <section className="grid sm:grid-cols-3 gap-8 pt-8">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Privacy First</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We believe developer tools shouldn't harvest your code. Every tool we build runs entirely on your device.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional Grade</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                From Monaco editors to Web-Worker powered diffs, we bring enterprise technology to free web utilities.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">User Centric</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                No intrusive pop-ups or data gates. We keep TextGauge clean and fast for a superior developer experience.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </FlowerBackground>
    );
}
