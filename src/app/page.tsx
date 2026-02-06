"use client";

import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Noto_Serif_JP, Karla } from "next/font/google";
import { useRef, useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown, Menu, X, ArrowUp, Sun, Moon, Cloud, Container, FileCode2, GitBranch, BarChart3, Shield } from "lucide-react";

const notoSerif = Noto_Serif_JP({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const karla = Karla({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

// Skill category icon mapping - consistent across all platforms
const skillIconMap: { [key: string]: React.ReactNode } = {
  "Cloud Platforms": <Cloud className="w-5 h-5" />,
  "Containers & Orchestration": <Container className="w-5 h-5" />,
  "Infrastructure as Code": <FileCode2 className="w-5 h-5" />,
  "CI/CD & GitOps": <GitBranch className="w-5 h-5" />,
  "Monitoring & Observability": <BarChart3 className="w-5 h-5" />,
  "Security & Networking": <Shield className="w-5 h-5" />,
};

// Fade in on scroll - triggers every time element enters viewport
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px", amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Horizontal rule with animation - triggers every time
function Divider({ className = "", isDark = false }: { className?: string; isDark?: boolean }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px origin-left ${isDark ? 'bg-stone-700' : 'bg-stone-300'} ${className}`}
    />
  );
}

// Magnetic Button Component
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Custom Cursor Component - reduced smoothing for snappier feel
function CustomCursor({ isDark }: { isDark: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 1000, damping: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"]');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block`}
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className={`w-3 h-3 -ml-1.5 -mt-1.5 rounded-full ${isDark ? 'bg-stone-200' : 'bg-stone-800'}`}
        />
      </motion.div>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.2 }}
          className={`w-8 h-8 -ml-4 -mt-4 rounded-full border ${isDark ? 'border-stone-400' : 'border-stone-500'}`}
        />
      </motion.div>
    </>
  );
}

// Page Load Animation
function PageLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] bg-[#faf9f7] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className={`${notoSerif.className} text-7xl md:text-9xl font-light text-stone-300`}>
            禅
          </span>
        </motion.div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-px bg-amber-700 mx-auto mt-8 origin-left"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs text-stone-400 tracking-[0.3em] uppercase mt-6"
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroScrollProgress, [0, 0.5], [0, 100]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Smooth scroll handler
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = ['about', 'work', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [isLoading]);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode persistence
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored) {
      setIsDarkMode(stored === 'true');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Colors based on dark mode
  const colors = {
    bg: isDarkMode ? 'bg-stone-950' : 'bg-[#faf9f7]',
    text: isDarkMode ? 'text-stone-100' : 'text-stone-800',
    textMuted: isDarkMode ? 'text-stone-400' : 'text-stone-500',
    textSubtle: isDarkMode ? 'text-stone-500' : 'text-stone-400',
    accent: 'text-amber-600',
    accentBg: isDarkMode ? 'bg-amber-600/10' : 'bg-amber-700/10',
    border: isDarkMode ? 'border-stone-800' : 'border-stone-200',
    cardBg: isDarkMode ? 'bg-stone-900/80' : 'bg-white/80',
    navBg: isDarkMode ? 'bg-stone-950/90' : 'bg-[#faf9f7]/90',
    sectionBg: isDarkMode ? 'bg-stone-900/60' : 'bg-stone-100/60',
  };

  return (
    <>
      {/* Page Loader */}
      <AnimatePresence>
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor isDark={isDarkMode} />

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-amber-600 origin-left z-[100]"
      />

      <div className={`${karla.className} min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500 selection:bg-stone-800 selection:text-stone-50 ${!isLoading ? '' : 'overflow-hidden'}`}>
      
        {/* Subtle texture overlay */}
        <div 
          className={`fixed inset-0 pointer-events-none ${isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.015]'}`}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        {/* Subtle accent line */}
        <div className="fixed top-0 left-0 w-1 h-screen bg-gradient-to-b from-transparent via-amber-600/20 to-transparent z-50" />

        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isLoading ? 0 : 0.5 }}
          className={`fixed top-0 left-0 right-0 z-40 ${colors.navBg} backdrop-blur-md transition-colors duration-500`}
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center px-8 lg:px-12 py-6">
            <Link href="/" className="group">
              <span className={`${notoSerif.className} text-lg tracking-wide ${isDarkMode ? 'text-stone-200' : 'text-stone-700'}`}>
                {siteConfig.name.split(' ')[0]}
              </span>
              <span className="text-amber-600 ml-0.5">.</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {["About", "Work", "Contact"].map((item) => (
                <MagneticButton key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                    className={`text-sm transition-colors duration-300 tracking-wide relative ${
                      activeSection === item.toLowerCase() 
                        ? 'text-amber-600' 
                        : `${colors.textMuted} hover:${colors.text}`
                    }`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.span 
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-amber-600"
                      />
                    )}
                  </a>
                </MagneticButton>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <MagneticButton>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full ${colors.textMuted} hover:text-amber-600 transition-colors`}
                  aria-label="Toggle dark mode"
                >
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </MagneticButton>

              <a 
                href={siteConfig.socials.github}
                className={`${colors.textSubtle} hover:${colors.text} transition-colors hidden sm:block`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={siteConfig.socials.linkedin}
                className={`${colors.textSubtle} hover:${colors.text} transition-colors hidden sm:block`}
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 ${colors.textMuted} hover:text-amber-600 transition-colors`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 md:hidden"
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className={`absolute right-0 top-0 bottom-0 w-3/4 max-w-sm ${isDarkMode ? 'bg-stone-950' : 'bg-[#faf9f7]'} shadow-2xl`}
              >
                <div className="pt-20 px-6">
                  <nav className="space-y-4">
                    {["About", "Work", "Contact"].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <a
                          href={`#${item.toLowerCase()}`}
                          onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                          className={`block text-lg ${karla.className} tracking-wide ${
                            activeSection === item.toLowerCase() ? 'text-amber-600' : colors.text
                          }`}
                        >
                          {item}
                        </a>
                      </motion.div>
                    ))}
                  </nav>
                  
                  <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
                    <div className="flex gap-6">
                      <a href={siteConfig.socials.github} className={colors.textMuted}>
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={siteConfig.socials.linkedin} className={colors.textMuted}>
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${siteConfig.socials.email}`} className={colors.textMuted}>
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero */}
        <section ref={heroRef} className="min-h-0 md:min-h-[85vh] flex items-start md:items-center relative overflow-hidden pt-28 md:pt-32 pb-8 md:pb-0">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 w-full relative z-10"
          >
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: isLoading ? 0 : 0.3 }}
                >
                  <span className={`inline-block px-2.5 py-1 ${colors.accentBg} text-amber-600 text-xs tracking-widest uppercase rounded mb-3 md:mb-6`}>
                    {siteConfig.contact.availability}
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: isLoading ? 0 : 0.4 }}
                  className={`${notoSerif.className} text-3xl md:text-6xl lg:text-7xl font-light leading-[1.15] mb-4 md:mb-10`}
                >
                  <span className="block">{siteConfig.name.split(' ')[0]}</span>
                  <span className={`block ${colors.textMuted}`}>{siteConfig.name.split(' ').slice(1).join(' ')}</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: isLoading ? 0 : 0.6 }}
                  className={`text-sm md:text-lg ${colors.textMuted} max-w-lg mb-6 md:mb-12 leading-relaxed font-light`}
                >
                  {siteConfig.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: isLoading ? 0 : 0.8 }}
                  className="flex items-center gap-6 md:gap-8"
                >
                  <MagneticButton>
                    <a 
                      href="#contact" 
                      onClick={(e) => scrollToSection(e, '#contact')}
                      className={`group inline-flex items-center gap-2 text-sm tracking-wide ${colors.text} hover:text-amber-600 transition-colors`}
                    >
                      <span className={`border-b ${isDarkMode ? 'border-stone-200' : 'border-stone-800'} group-hover:border-amber-600 pb-0.5 transition-colors`}>
                        Get in touch
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href="#work"
                      onClick={(e) => scrollToSection(e, '#work')}
                      className={`text-sm tracking-wide ${colors.textMuted} hover:${colors.text} transition-colors`}
                    >
                      View work
                    </a>
                  </MagneticButton>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: isLoading ? 0 : 0.8 }}
                className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end"
              >
                <div className="text-right">
                  <span className={`${notoSerif.className} text-[120px] font-light ${isDarkMode ? 'text-stone-800' : 'text-stone-200'} leading-none block`}>
                    禅
                  </span>
                  <span className={`text-xs ${colors.textSubtle} tracking-widest uppercase mt-2 block`}>Zen</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Scroll indicator - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isLoading ? 0 : 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className={`text-xs ${colors.textSubtle} tracking-widest uppercase`}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className={`w-4 h-4 ${colors.textSubtle}`} />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="py-10 md:py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <Divider className="mb-8 md:mb-16" isDark={isDarkMode} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {siteConfig.stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <div className="text-center md:text-left">
                    <div className={`${notoSerif.className} text-3xl md:text-5xl font-light mb-1 md:mb-2`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs md:text-sm ${colors.textMuted} tracking-wide`}>
                      {stat.label}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <Divider className="mt-16" isDark={isDarkMode} />
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-10 md:py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">
              <div className="lg:col-span-4">
                <FadeIn>
                  <span className="text-xs tracking-[0.3em] uppercase text-amber-600/80 font-medium">About</span>
                  <h2 className={`${notoSerif.className} text-2xl md:text-3xl font-light mt-3 md:mt-4`}>
                    Background
                  </h2>
                </FadeIn>
              </div>
              
              <div className="lg:col-span-8">
                <FadeIn delay={0.1}>
                  <p className={`${notoSerif.className} text-xl md:text-3xl font-light leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-700'} mb-8 md:mb-12`}>
                    {siteConfig.tagline}
                  </p>
                </FadeIn>
                
                <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                  {siteConfig.highlights.slice(0, 4).map((h, i) => (
                    <FadeIn key={h.title} delay={0.2 + i * 0.1}>
                      <div className="group">
                        <h3 className={`text-base font-medium mb-2 group-hover:text-amber-600 transition-colors`}>
                          {h.title}
                        </h3>
                        <p className={`text-sm ${colors.textMuted} leading-relaxed`}>
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
        <section className={`py-10 md:py-24 relative z-10 ${colors.sectionBg} transition-colors duration-500`}>
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">
              <div className="lg:col-span-4">
                <FadeIn>
                  <span className="text-xs tracking-[0.3em] uppercase text-amber-600/80 font-medium">Expertise</span>
                  <h2 className={`${notoSerif.className} text-3xl font-light mt-4`}>
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
                          <span className={`${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>
                            {skillIconMap[cat.category] || <Cloud className="w-5 h-5" />}
                          </span>
                          <h3 className={`${notoSerif.className} text-xl font-normal ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                            {cat.category}
                          </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill, i) => (
                            <motion.span 
                              key={skill}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: false, amount: 0.5 }}
                              transition={{ delay: catIndex * 0.05 + i * 0.02 }}
                              className={`px-3 py-1.5 ${colors.cardBg} ${colors.textMuted} text-sm rounded border ${colors.border} hover:border-amber-600/30 hover:text-amber-600 transition-colors cursor-default`}
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
        <section className="py-10 md:py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">
              <div className="lg:col-span-4">
                <FadeIn>
                  <span className="text-xs tracking-[0.3em] uppercase text-amber-600/80 font-medium">Journey</span>
                  <h2 className={`${notoSerif.className} text-3xl font-light mt-4`}>
                    Experience
                  </h2>
                </FadeIn>
              </div>
              
              <div className="lg:col-span-8">
                <div className="space-y-12">
                  {siteConfig.experience.map((exp, i) => (
                    <FadeIn key={exp.company} delay={i * 0.1}>
                      <div className={`relative pl-6 border-l-2 ${colors.border} hover:border-amber-600/50 transition-colors`}>
                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-amber-600 rounded-full" />
                        
                        <span className={`text-xs ${colors.textSubtle} tracking-wider uppercase`}>{exp.period}</span>
                        <h3 className={`${notoSerif.className} text-xl font-normal mt-2`}>{exp.title}</h3>
                        <p className={colors.textMuted + " mt-1"}>{exp.company}</p>
                        <p className={`text-sm ${colors.textMuted} mt-4 leading-relaxed`}>{exp.description}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                
                {/* Education */}
                <div className={`mt-16 pt-16 border-t ${colors.border}`}>
                  <FadeIn>
                    <h3 className={`text-xs tracking-[0.3em] uppercase ${colors.textSubtle} font-medium mb-8`}>Education</h3>
                  </FadeIn>
                  
                  <div className="space-y-8">
                    {siteConfig.education.map((edu, i) => (
                      <FadeIn key={edu.institution} delay={i * 0.1}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className={`text-sm ${colors.textMuted}`}>{edu.institution}</p>
                          </div>
                          <span className={`text-xs ${colors.textSubtle} tracking-wide`}>{edu.period}</span>
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
        <section id="work" className={`py-10 md:py-24 relative z-10 ${colors.sectionBg} transition-colors duration-500`}>
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">
              <div className="lg:col-span-4">
                <FadeIn>
                  <span className="text-xs tracking-[0.3em] uppercase text-amber-600/80 font-medium">Portfolio</span>
                  <h2 className={`${notoSerif.className} text-3xl font-light mt-4`}>
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
                          <span className={`${notoSerif.className} text-5xl font-light ${isDarkMode ? 'text-stone-700' : 'text-stone-300'} group-hover:text-amber-600/30 transition-colors`}>
                            {(i + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                        
                        <h3 className={`${notoSerif.className} text-2xl md:text-3xl font-light mb-4 group-hover:text-amber-600 transition-colors`}>
                          {project.title}
                        </h3>
                        
                        <p className={`${colors.textMuted} leading-relaxed mb-6 max-w-xl`}>
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className={`text-xs ${colors.textMuted} ${colors.cardBg} border ${colors.border} px-3 py-1.5 rounded`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-6">
                          {project.demo && (
                            <MagneticButton>
                              <a 
                                href={project.demo} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 text-sm ${isDarkMode ? 'text-stone-300' : 'text-stone-700'} hover:text-amber-600 transition-colors group/link`}
                              >
                                <span className={`border-b ${colors.border} group-hover/link:border-amber-600 pb-0.5 transition-colors`}>
                                  View Project
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </MagneticButton>
                          )}
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`text-sm ${colors.textSubtle} hover:${colors.text} transition-colors`}
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
        <section id="contact" className="py-12 md:py-32 relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <span className="text-xs tracking-[0.3em] uppercase text-amber-600/80 font-medium">Contact</span>
                <h2 className={`${notoSerif.className} text-2xl md:text-5xl font-light mt-3 md:mt-4 mb-4 md:mb-6`}>
                  {siteConfig.contact.headline}
                </h2>
                <p className={`text-sm md:text-lg ${colors.textMuted} mb-8 md:mb-12 leading-relaxed`}>
                  {siteConfig.contact.subtext}
                </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <MagneticButton className="inline-block">
                  <a 
                    href={`mailto:${siteConfig.socials.email}`}
                    className={`group inline-flex items-center gap-2 md:gap-3 text-base md:text-xl hover:text-amber-600 transition-colors`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className={`border-b-2 ${colors.border} group-hover:border-amber-600 pb-1 transition-colors`}>
                      {siteConfig.socials.email}
                    </span>
                  </a>
                </MagneticButton>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="flex justify-center gap-8 mt-12">
                  <MagneticButton>
                    <a 
                      href={siteConfig.socials.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${colors.textSubtle} hover:${colors.text} transition-colors`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href={siteConfig.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${colors.textSubtle} hover:${colors.text} transition-colors`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 md:py-12 relative z-10">
          <Divider isDark={isDarkMode} />
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className={`text-xs md:text-sm ${colors.textSubtle}`}>
              {siteConfig.footer.copyright}
            </p>
            <p className={`text-xs md:text-sm ${colors.textSubtle}`}>
              {siteConfig.footer.builtWith}
            </p>
          </div>
        </footer>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className={`fixed bottom-6 right-6 z-50 p-3 rounded-full ${isDarkMode ? 'bg-stone-800 text-stone-200 hover:bg-stone-700' : 'bg-stone-800 text-stone-100 hover:bg-stone-700'} transition-colors shadow-lg`}
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
