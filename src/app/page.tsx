"use client";

import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Noto_Serif_JP, Karla } from "next/font/google";
import { useRef, useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown, Menu, X, ArrowUp, Sun, Moon, Cloud, Container, FileCode2, GitBranch, BarChart3, Shield, Command, Download, Search } from "lucide-react";

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

// Track scroll direction globally
let lastScrollY = 0;
let scrollDirection: 'up' | 'down' = 'down';

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
  }, { passive: true });
}

// Staggered fade in on scroll - ensures sequential animation order
// Reverse order on scroll up (last element fades first)
function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  staggerIndex = 0,
  totalInGroup = 1
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
  staggerIndex?: number;
  totalInGroup?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Skip animation logic if reduced motion preferred
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entering viewport - stagger based on index (first to last)
          const staggerDelay = staggerIndex * 80;
          setTimeout(() => {
            setIsInView(true);
            setHasAnimated(true);
          }, staggerDelay);
        } else if (hasAnimated) {
          // Leaving viewport - reverse stagger (last to first)
          // When scrolling UP, bottom elements leave first so they should fade first
          // When scrolling DOWN, top elements leave first so they should fade first
          const reverseIndex = totalInGroup - 1 - staggerIndex;
          const staggerDelay = scrollDirection === 'up' 
            ? staggerIndex * 60  // When scrolling up, lower index items (at top) leave later
            : reverseIndex * 60; // When scrolling down, higher index items (at bottom) leave later
          
          setTimeout(() => setIsInView(false), staggerDelay);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: "-30px 0px -30px 0px"
      }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [staggerIndex, hasAnimated, totalInGroup, prefersReducedMotion]);

  // If reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Horizontal rule with animation - triggers every time
function Divider({ className = "", isDark = false }: { className?: string; isDark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px origin-left ${isDark ? 'bg-stone-700' : 'bg-stone-300'} ${className}`}
    />
  );
}

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

// Text reveal animation - characters appear sequentially (Zen-like calm reveal)
function TextReveal({ 
  children, 
  className = "",
  delay = 0,
  staggerChildren = 0.03
}: { 
  children: string; 
  className?: string;
  delay?: number;
  staggerChildren?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(' ');
  
  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * staggerChildren * 3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// Floating Zen particles - subtle, meditative floating dots
function FloatingParticles({ isDark, count = 15 }: { isDark: boolean; count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on client side only
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  if (prefersReducedMotion || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${isDark ? 'bg-amber-500/10' : 'bg-amber-600/8'}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated counter for stats - counts up when in view
function AnimatedCounter({ 
  value, 
  suffix = "",
  className = "" 
}: { 
  value: string; 
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [isInView, setIsInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Parse the value to extract number and any prefix/suffix
  const numericMatch = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  const prefix = numericMatch?.[1] || "";
  const numericValue = parseFloat(numericMatch?.[2] || "0");
  const valueSuffix = numericMatch?.[3] || "";
  const isInteger = !value.includes('.');
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number;
    const duration = 2000; // 2 seconds
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      
      setDisplayValue(
        prefix + 
        (isInteger ? Math.floor(current).toString() : current.toFixed(1)) + 
        valueSuffix
      );
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, numericValue, prefix, valueSuffix, value, isInteger, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

// Animated underline link - Zen-like calm slide animation
function AnimatedLink({ 
  href, 
  children, 
  className = "",
  external = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative inline-block ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-px bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </a>
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // If reduced motion, complete immediately
    if (mediaQuery.matches) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Skip loader entirely for reduced motion users
  if (prefersReducedMotion) return null;

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
          style={{ willChange: 'transform' }}
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

// Command Palette Component
function CommandPalette({ 
  isOpen, 
  onClose, 
  isDark,
  scrollToSection 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  isDark: boolean;
  scrollToSection: (href: string) => void;
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: "home", label: "Go to Home", shortcut: "1", action: () => { scrollToSection("#home"); onClose(); } },
    { id: "about", label: "Go to About", shortcut: "2", action: () => { scrollToSection("#about"); onClose(); } },
    { id: "skills", label: "Go to Skills", shortcut: "3", action: () => { scrollToSection("#skills"); onClose(); } },
    { id: "experience", label: "Go to Experience", shortcut: "4", action: () => { scrollToSection("#experience"); onClose(); } },
    { id: "work", label: "Go to Projects", shortcut: "5", action: () => { scrollToSection("#work"); onClose(); } },
    { id: "contact", label: "Go to Contact", shortcut: "6", action: () => { scrollToSection("#contact"); onClose(); } },
    { id: "resume", label: "Download Resume", shortcut: "R", action: () => { 
      trackResumeDownload();
      window.open(siteConfig.resumeUrl, '_blank'); 
      onClose(); 
    }},
    { id: "github", label: "Open GitHub", shortcut: "G", action: () => { window.open(siteConfig.socials.github, '_blank'); onClose(); } },
    { id: "linkedin", label: "Open LinkedIn", shortcut: "L", action: () => { window.open(siteConfig.socials.linkedin, '_blank'); onClose(); } },
    { id: "email", label: "Send Email", shortcut: "E", action: () => { window.location.href = `mailto:${siteConfig.socials.email}`; onClose(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full max-w-lg mx-4 rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-stone-900 border border-stone-800' : 'bg-white border border-stone-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
          <Search className={`w-5 h-5 ${isDark ? 'text-stone-500' : 'text-stone-400'}`} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm ${
              isDark ? 'text-stone-200 placeholder:text-stone-500' : 'text-stone-800 placeholder:text-stone-400'
            }`}
          />
          <kbd className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-500'}`}>
            ESC
          </kbd>
        </div>
        
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <p className={`text-center py-8 text-sm ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
              No commands found
            </p>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isDark 
                    ? 'hover:bg-stone-800 text-stone-300' 
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                <span className="text-sm">{cmd.label}</span>
                <kbd className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-stone-800 text-stone-500' : 'bg-stone-100 text-stone-500'}`}>
                  {cmd.shortcut}
                </kbd>
              </button>
            ))
          )}
        </div>
        
        <div className={`flex items-center justify-between px-4 py-2 text-xs border-t ${
          isDark ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-400'
        }`}>
          <span>Navigate with ↑↓ • Select with Enter</span>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" /> K to open
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Loading Skeleton Component
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-stone-300/30 rounded ${className}`} />
  );
}

// Project Image Preview Component
function ProjectCard({ 
  project, 
  index,
  totalProjects,
  isDarkMode, 
  colors 
}: { 
  project: typeof siteConfig.projects[0]; 
  index: number;
  totalProjects: number;
  isDarkMode: boolean;
  colors: { textMuted: string; cardBg: string; border: string };
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <FadeIn staggerIndex={index} totalInGroup={totalProjects}>
      <article 
        className="group relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hover Image Preview */}
        <AnimatePresence>
          {isHovering && project.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 right-0 z-20 hidden lg:block -translate-y-full"
            >
              <div className={`relative w-64 h-40 rounded-lg overflow-hidden shadow-2xl border ${colors.border}`}>
                {!imageLoaded && <Skeleton className="absolute inset-0" />}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="256px"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-start justify-between mb-4">
          <span className={`${notoSerif.className} text-5xl font-light ${isDarkMode ? 'text-stone-700' : 'text-stone-300'} group-hover:text-amber-600/30 transition-colors`}>
            {(index + 1).toString().padStart(2, '0')}
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
              className={`text-sm ${isDarkMode ? 'text-stone-500' : 'text-stone-400'} hover:text-amber-600 transition-colors`}
            >
              Source Code
            </a>
          )}
        </div>
      </article>
    </FadeIn>
  );
}

// Resume download tracking
function trackResumeDownload() {
  // Log download event (replace with actual analytics like Umami, Plausible, or GA4)
  console.log('[Analytics] Resume downloaded at', new Date().toISOString());
  
  // If using window.gtag (Google Analytics 4):
  if (typeof window !== 'undefined' && (window as { gtag?: Function }).gtag) {
    (window as { gtag?: Function }).gtag?.('event', 'download_resume', {
      event_category: 'engagement',
      event_label: 'Resume PDF',
    });
  }
  
  // If using Umami:
  if (typeof window !== 'undefined' && (window as { umami?: { track: Function } }).umami) {
    (window as { umami?: { track: Function } }).umami?.track('download_resume');
  }
}

// Parallax Section Wrapper
function ParallaxSection({ 
  children, 
  className = "",
  offset = 50 
}: { 
  children: React.ReactNode; 
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroScrollProgress, [0, 0.5], [0, 100]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll to section helper (for both click events and keyboard/command palette)
  const scrollToSectionById = useCallback((href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  // Smooth scroll handler for click events
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSectionById(href);
  }, [scrollToSectionById]);

  // Konami Code Easter Egg: ↑↑↓↓←→←→BA
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setEasterEggActive(true);
          konamiIndex = 0;
          // Reset after 5 seconds
          setTimeout(() => setEasterEggActive(false), 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Keyboard Navigation: Cmd+K for command palette, 1-6 for sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // Close command palette with Escape
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        return;
      }

      // Don't trigger number navigation if command palette is open or user is typing
      if (isCommandPaletteOpen) return;
      const activeElement = document.activeElement;
      if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') return;

      // Number key navigation
      const sectionMap: { [key: string]: string } = {
        '1': 'home',
        '2': 'about',
        '3': 'skills',
        '4': 'experience',
        '5': 'work',
        '6': 'contact',
      };

      if (sectionMap[e.key]) {
        const targetId = sectionMap[e.key];
        const element = targetId === 'home' 
          ? document.querySelector('section') 
          : document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Quick actions: G for GitHub, L for LinkedIn, R for Resume, E for Email
      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey) {
        window.open(siteConfig.socials.github, '_blank');
      }
      if (e.key.toLowerCase() === 'l' && !e.metaKey && !e.ctrlKey) {
        window.open(siteConfig.socials.linkedin, '_blank');
      }
      if (e.key.toLowerCase() === 'r' && !e.metaKey && !e.ctrlKey) {
        trackResumeDownload();
        window.open(siteConfig.resumeUrl, '_blank');
      }
      if (e.key.toLowerCase() === 'e' && !e.metaKey && !e.ctrlKey) {
        window.location.href = `mailto:${siteConfig.socials.email}`;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

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

  // Dark mode persistence - defaults to light theme
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored) {
      setIsDarkMode(stored === 'true');
    }
    // Default is light theme (isDarkMode is already false)
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

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            isDark={isDarkMode}
            scrollToSection={scrollToSectionById}
          />
        )}
      </AnimatePresence>

      {/* Easter Egg: Konami Code Celebration */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 10 }}
              className="text-center"
            >
              <div className="text-8xl mb-4">🎉</div>
              <p className={`${notoSerif.className} text-2xl text-amber-600`}>
                You found the secret!
              </p>
              <p className="text-sm text-stone-500 mt-2">
                Nice work, fellow developer!
              </p>
            </motion.div>
            {/* Confetti effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 500, 
                  y: Math.random() * 500 - 250,
                  rotate: Math.random() * 720 
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][i % 5] 
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor isDark={isDarkMode} />

      {/* Floating Zen Particles */}
      <FloatingParticles isDark={isDarkMode} count={12} />

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX, willChange: 'transform' }}
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
        <section id="home" ref={heroRef} className="min-h-0 md:min-h-[85vh] flex items-start md:items-center relative pt-28 md:pt-32 pb-16 md:pb-16">
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
                      View works
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href={siteConfig.resumeUrl}
                      onClick={() => trackResumeDownload()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm tracking-wide ${colors.textMuted} hover:text-amber-600 transition-colors`}
                    >
                      <Download className="w-4 h-4" />
                      Resume
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
            className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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
                <FadeIn key={stat.label} staggerIndex={i} totalInGroup={siteConfig.stats.length}>
                  <div className="text-center md:text-left">
                    <div className={`${notoSerif.className} text-3xl md:text-5xl font-light mb-1 md:mb-2`}>
                      <AnimatedCounter value={stat.value} />
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
                <FadeIn staggerIndex={1} totalInGroup={6}>
                  <p className={`${notoSerif.className} text-xl md:text-3xl font-light leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-700'} mb-8 md:mb-12`}>
                    {siteConfig.tagline}
                  </p>
                </FadeIn>
                
                <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                  {siteConfig.highlights.slice(0, 4).map((h, i) => (
                    <FadeIn key={h.title} staggerIndex={i + 2} totalInGroup={6}>
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
        <section id="skills" className={`py-10 md:py-24 relative z-10 ${colors.sectionBg} transition-colors duration-500`}>
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
                    <FadeIn key={cat.category} staggerIndex={catIndex} totalInGroup={siteConfig.skillCategories.length}>
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
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03, duration: 0.3 }}
                              whileHover={{ scale: 1.05, y: -2 }}
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
        <section id="experience" className="py-10 md:py-24 relative z-10">
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
                    <FadeIn key={exp.company} staggerIndex={i} totalInGroup={siteConfig.experience.length}>
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
                      <FadeIn key={edu.institution} staggerIndex={i} totalInGroup={siteConfig.education.length}>
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
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={i}
                      totalProjects={siteConfig.projects.length}
                      isDarkMode={isDarkMode}
                      colors={colors}
                    />
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
              
              <FadeIn staggerIndex={1} totalInGroup={3}>
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
              
              <FadeIn staggerIndex={2} totalInGroup={3}>
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
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-8 md:pt-12">
            {/* Keyboard shortcuts hint - hidden on mobile */}
            <div className={`hidden md:flex justify-center gap-6 mb-6 text-xs ${colors.textSubtle}`}>
              <span className="flex items-center gap-1.5">
                <kbd className={`px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}>⌘</kbd>
                <kbd className={`px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}>K</kbd>
                <span className="ml-1">Command palette</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className={`px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-stone-800' : 'bg-stone-200'}`}>1-6</kbd>
                <span className="ml-1">Navigate sections</span>
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <p className={`text-xs md:text-sm ${colors.textSubtle}`}>
                {siteConfig.footer.copyright}
              </p>
              <p className={`text-xs md:text-sm ${colors.textSubtle}`}>
                {siteConfig.footer.builtWith}
              </p>
            </div>
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
