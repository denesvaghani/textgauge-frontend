"use client";

import { flowerThemes } from "@/config/flowerThemes";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { TrustPanel } from "@/components/TrustPanel";
import { Linkedin, Mail, Twitter, ExternalLink, Code2, ShieldCheck, Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function TeamClient() {
    const theme = flowerThemes.peony;

    const founderData = {
        name: "Denes Vaghani",
        role: "Founder & Lead Developer",
        email: "denesdvaghani9200@gmail.com",
        linkedin: "https://www.linkedin.com/in/denesvaghani/",
        medium: "https://medium.com/@denes_vaghani",
        profileImage: "/images/team/denes-vaghani.jpg",
        summary: "Senior Product Engineer who wears more than just a dev hat — Architect by mindset, debugger by instinct, and mentor when the team needs clarity. With TextGauge, I'm building privacy-first developer tools that run entirely in your browser, using AI-accelerated development to solve real technical workflows without compromising data security.",
        skills: ["AI Engineering", "Privacy-First Tools", "Full-Stack Development", "Technical Leadership", "Product Engineering"]
    };

    const projectSocials = [
        { name: "Twitter", icon: <Twitter size={20} />, href: "#", label: "@TextGauge" },
        { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#", label: "TextGauge" },
    ];

    return (
        <FlowerBackground theme={theme}>
            <div className="flex flex-col min-h-screen">
                <SmartHeroHeader
                    title="The Team Behind TextGauge"
                    theme={theme}
                    description="Meet the developer building the next generation of privacy-focused, AI-accelerated developer tools."
                />

                <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                    {/* Founder Section */}
                    <section className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative"
                            >
                                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-600 p-1 shadow-2xl rotate-3 overflow-hidden">
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
                                {/* Decorative Badges */}
                                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-500" size={20} />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Verified Developer</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="md:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                    {founderData.name}
                                </h2>
                                <p className="text-xl font-medium text-yellow-600 dark:text-yellow-400">
                                    {founderData.role}
                                </p>
                            </div>

                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {founderData.summary}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {founderData.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                                        {skill}
                                    </span>
                                ))}
                            </div>

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
                                    {/* Official Gmail Logo */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                                        <path fill="#34A853" d="M24 5.457v.274L12 14.182 0 5.73v-.273c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                                        <path fill="#4285F4" d="M24 5.457v.274L12 14.182 0 5.73v-.273c0-.452.092-.88.255-1.271L12 11.73l11.745-7.544c.163.39.255.819.255 1.271z"/>
                                        <path fill="#FBBC05" d="M0 5.457c0-.452.092-.88.255-1.271l.99.745L12 11.73 0 5.73v-.273z"/>
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Vision Section */}
                    <section className="grid sm:grid-cols-3 gap-8 pt-8">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Privacy First</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We believe developer tools shouldn't harvest your code. Every tool we build runs entirely on your device.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional Grade</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                From Monaco editors to Web-Worker powered diffs, we bring enterprise technology to free web utilities.
                            </p>
                        </div>

                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">User Centric</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                No intrusive pop-ups or data gates. We keep TextGauge clean and fast for a superior developer experience.
                            </p>
                        </div>
                    </section>

                    {/* Project Socials */}
                    <section className="text-center space-y-8 py-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Follow the Journey</h3>
                        <div className="flex justify-center gap-6">
                            {projectSocials.map(social => (
                                <a 
                                    key={social.name}
                                    href={social.href}
                                    className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 group-hover:border-yellow-200 dark:group-hover:border-yellow-900 shadow-sm transition-colors">
                                        {social.icon}
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{social.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </FlowerBackground>
    );
}
