"use client";

import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Serif_JP, Karla } from "next/font/google";
import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown } from "lucide-react";

const notoSerif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const karla = Karla({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

// Fade in on scroll
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Horizontal rule with animation
function Divider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px bg-stone-300 origin-left ${className}`}
    />
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className={`${karla.className} min-h-screen bg-[#faf9f7] text-stone-800 selection:bg-stone-800 selection:text-stone-50`}>
      
      {/* Subtle texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Subtle accent line */}
      <div className="fixed top-0 left-0 w-1 h-screen bg-gradient-to-b from-transparent via-amber-700/20 to-transparent z-50" />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#faf9f7]/90 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 lg:px-12 py-6">
          <Link href="/" className="group">
            <span className={`${notoSerif.className} text-lg tracking-wide text-stone-700`}>
              {siteConfig.name.split(' ')[0]}
            </span>
            <span className="text-amber-700 ml-0.5">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {["About", "Work", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-300 tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={siteConfig.socials.github}
              className="text-stone-400 hover:text-stone-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={siteConfig.socials.linkedin}
              className="text-stone-400 hover:text-stone-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-24">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-6xl mx-auto px-8 lg:px-12 w-full relative z-10"
        >
          <div className="grid lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="inline-block px-3 py-1.5 bg-amber-700/10 text-amber-800 text-xs tracking-widest uppercase rounded mb-8">
                  {siteConfig.contact.availability}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className={`${notoSerif.className} text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-10 text-stone-800`}
              >
                <span className="block">{siteConfig.name.split(' ')[0]}</span>
                <span className="block text-stone-400">{siteConfig.name.split(' ').slice(1).join(' ')}</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg text-stone-600 max-w-lg mb-12 leading-relaxed font-light"
              >
                {siteConfig.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center gap-8"
              >
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-2 text-sm tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
                >
                  <span className="border-b border-stone-800 group-hover:border-amber-700 pb-0.5 transition-colors">
                    Get in touch
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href="#work"
                  className="text-sm tracking-wide text-stone-500 hover:text-stone-800 transition-colors"
                >
                  View work
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end"
            >
              <div className="text-right">
                <span className={`${notoSerif.className} text-[120px] font-light text-stone-200 leading-none block`}>
                  禅
                </span>
                <span className="text-xs text-stone-400 tracking-widest uppercase mt-2 block">Zen</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-stone-400 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-stone-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <Divider className="mb-16" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {siteConfig.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className={`${notoSerif.className} text-4xl md:text-5xl font-light text-stone-800 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-stone-500 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <Divider className="mt-16" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="text-xs tracking-[0.3em] uppercase text-amber-700/80 font-medium">About</span>
                <h2 className={`${notoSerif.className} text-3xl font-light mt-4 text-stone-800`}>
                  Background
                </h2>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8">
              <FadeIn delay={0.1}>
                <p className={`${notoSerif.className} text-2xl md:text-3xl font-light leading-relaxed text-stone-700 mb-12`}>
                  {siteConfig.tagline}
                </p>
              </FadeIn>
              
              <div className="grid sm:grid-cols-2 gap-10">
                {siteConfig.highlights.slice(0, 4).map((h, i) => (
                  <FadeIn key={h.title} delay={0.2 + i * 0.1}>
                    <div className="group">
                      <h3 className="text-base font-medium text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                        {h.title}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 relative z-10 bg-stone-100/60">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="text-xs tracking-[0.3em] uppercase text-amber-700/80 font-medium">Expertise</span>
                <h2 className={`${notoSerif.className} text-3xl font-light mt-4 text-stone-800`}>
                  Skills
                </h2>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {siteConfig.skillCategories.map((cat, catIndex) => (
                  <FadeIn key={cat.category} delay={catIndex * 0.1}>
                    <div className="group">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-2xl">{cat.icon}</span>
                        <h3 className={`${notoSerif.className} text-xl font-normal text-stone-700`}>
                          {cat.category}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, i) => (
                          <motion.span 
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 + i * 0.03 }}
                            className="px-3 py-1.5 bg-white/80 text-stone-600 text-sm rounded border border-stone-200 hover:border-amber-700/30 hover:text-amber-800 transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="text-xs tracking-[0.3em] uppercase text-amber-700/80 font-medium">Journey</span>
                <h2 className={`${notoSerif.className} text-3xl font-light mt-4 text-stone-800`}>
                  Experience
                </h2>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {siteConfig.experience.map((exp, i) => (
                  <FadeIn key={exp.company} delay={i * 0.1}>
                    <div className="relative pl-6 border-l-2 border-stone-200 hover:border-amber-700/50 transition-colors">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 bg-amber-700 rounded-full" />
                      
                      <span className="text-xs text-stone-400 tracking-wider uppercase">{exp.period}</span>
                      <h3 className={`${notoSerif.className} text-xl font-normal text-stone-800 mt-2`}>{exp.title}</h3>
                      <p className="text-stone-600 mt-1">{exp.company}</p>
                      <p className="text-sm text-stone-500 mt-4 leading-relaxed">{exp.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              
              {/* Education */}
              <div className="mt-16 pt-16 border-t border-stone-200">
                <FadeIn>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium mb-8">Education</h3>
                </FadeIn>
                
                <div className="space-y-8">
                  {siteConfig.education.map((edu, i) => (
                    <FadeIn key={edu.institution} delay={i * 0.1}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h4 className="text-stone-800 font-medium">{edu.degree}</h4>
                          <p className="text-sm text-stone-500">{edu.institution}</p>
                        </div>
                        <span className="text-xs text-stone-400 tracking-wide">{edu.period}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-24 relative z-10 bg-stone-100/60">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <FadeIn>
                <span className="text-xs tracking-[0.3em] uppercase text-amber-700/80 font-medium">Portfolio</span>
                <h2 className={`${notoSerif.className} text-3xl font-light mt-4 text-stone-800`}>
                  Selected Work
                </h2>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-8">
              <div className="space-y-20">
                {siteConfig.projects.map((project, i) => (
                  <FadeIn key={project.title} delay={i * 0.15}>
                    <article className="group">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`${notoSerif.className} text-5xl font-light text-stone-300 group-hover:text-amber-700/30 transition-colors`}>
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      
                      <h3 className={`${notoSerif.className} text-2xl md:text-3xl font-light text-stone-800 mb-4 group-hover:text-amber-800 transition-colors`}>
                        {project.title}
                      </h3>
                      
                      <p className="text-stone-600 leading-relaxed mb-6 max-w-xl">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-xs text-stone-500 bg-white/80 border border-stone-200 px-3 py-1.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {project.demo && (
                          <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-stone-700 hover:text-amber-700 transition-colors group/link"
                          >
                            <span className="border-b border-stone-400 group-hover/link:border-amber-700 pb-0.5 transition-colors">
                              View Project
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
                          >
                            Source Code
                          </a>
                        )}
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <span className="text-xs tracking-[0.3em] uppercase text-amber-700/80 font-medium">Contact</span>
              <h2 className={`${notoSerif.className} text-4xl md:text-5xl font-light mt-4 mb-6 text-stone-800`}>
                {siteConfig.contact.headline}
              </h2>
              <p className="text-lg text-stone-500 mb-12 leading-relaxed">
                {siteConfig.contact.subtext}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <a 
                href={`mailto:${siteConfig.socials.email}`}
                className="group inline-flex items-center gap-3 text-xl text-stone-800 hover:text-amber-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="border-b-2 border-stone-300 group-hover:border-amber-700 pb-1 transition-colors">
                  {siteConfig.socials.email}
                </span>
              </a>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex justify-center gap-8 mt-12">
                <a 
                  href={siteConfig.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={siteConfig.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10">
        <Divider />
        <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-400">
            {siteConfig.footer.copyright}
          </p>
          <p className="text-sm text-stone-400">
            {siteConfig.footer.builtWith}
          </p>
        </div>
      </footer>
    </div>
  );
}
