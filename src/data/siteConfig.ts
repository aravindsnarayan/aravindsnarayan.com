// =====================================================
// SITE CONFIGURATION - Edit this file to update your portfolio
// =====================================================

export const siteConfig = {
  // Personal Info
  name: "Aravind S Narayan",
  username: "aravind",
  domain: "devops", // appears in terminal prompt
  tagline: "Senior DevOps Engineer | CI/CD Specialist ",
  subtitle: "Software Engineer & Tech Enthusiast",
  description:
    "Building scalable web applications, crafting elegant solutions, and exploring cutting-edge technologies to create impactful digital experiences.",
  location: "India",
  resumeUrl: "/resume.pdf", // Place your resume in /public folder
  
  // Social Links
  socials: {
    github: "https://github.com/aravindsnarayan",
    linkedin: "https://linkedin.com/in/aravindsnarayan",
    twitter: "https://twitter.com/aravindsnarayan",
    email: "aravindsnarayan@gmail.com",
  },

  // Navigation
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],

  // Hero Section - Typing animation sequences
  typingSequences: [
    "Senior DevOps Engineer",
    2000,
    "Cloud Enthusiast",
    2000,
    "CI/CD Specialist",
    2000,
    "Automation Guru",
    2000,
    "Infrastructure as Code Advocate",
    2000,
    "Kubernetes Expert",
    2000,
    "Security Focused",
    2000,
  ],

  // Stats Section
  stats: [
    { value: "5+", label: "Years Experience", icon: "calendar" },
    { value: "50+", label: "Projects Completed", icon: "folder" },
    { value: "99.9%", label: "Uptime Delivered", icon: "check" },
    { value: "24/7", label: "Support Available", icon: "clock" },
  ],

  // About Section - Key Highlights
  highlights: [
    { icon: "code", title: "Clean Code", description: "Writing maintainable, scalable code" },
    { icon: "rocket", title: "Performance", description: "Optimizing for speed & efficiency" },
    { icon: "shield", title: "Security", description: "Building secure applications" },
    { icon: "users", title: "Collaboration", description: "Team player & communicator" },
  ],

  // Impact Metrics
  impactMetrics: [
    { value: "25+", label: "Applications Deployed", description: "Production-ready apps serving users globally" },
    { value: "10K", label: "Lines of Code", description: "Clean, documented, and tested code" },
    { value: "50+", label: "Open Source Contributions", description: "Active contributor to the community" },
    { value: "99%", label: "Client Satisfaction", description: "Consistently exceeding expectations" },
  ],

  // Skills Section
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
    frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5/CSS3"],
    backend: ["Node.js", "Express", "FastAPI", "GraphQL", "REST APIs"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    cloud: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
    tools: ["Git", "GitHub Actions", "Jenkins", "VS Code", "Figma"],
  },

  // Skill Categories for Terminal Display
  skillCategories: [
    {
      category: "Frontend",
      icon: "🎨",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      category: "Backend",
      icon: "⚙️",
      skills: ["Node.js", "Python", "Go", "GraphQL", "REST APIs"],
    },
    {
      category: "Database",
      icon: "🗄️",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    },
    {
      category: "DevOps",
      icon: "🚀",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    },
    {
      category: "Tools",
      icon: "🔧",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
    },
  ],

  // Projects Section
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com/aravindsnarayan/ecommerce",
      demo: "https://demo.aravindsnarayan.com/ecommerce",
      image: "/projects/ecommerce.png",
    },
    {
      title: "DevOps Dashboard",
      description:
        "Real-time monitoring dashboard for infrastructure metrics, deployments, and system health.",
      tags: ["React", "Go", "Prometheus", "Grafana"],
      github: "https://github.com/aravindsnarayan/devops-dashboard",
      demo: "https://demo.aravindsnarayan.com/dashboard",
      image: "/projects/dashboard.png",
    },
    {
      title: "AI Chat Assistant",
      description:
        "Intelligent chatbot powered by LLMs with context awareness and multi-turn conversations.",
      tags: ["Python", "FastAPI", "OpenAI", "Redis"],
      github: "https://github.com/aravindsnarayan/ai-chat",
      demo: "https://demo.aravindsnarayan.com/chat",
      image: "/projects/chat.png",
    },
  ],

  // GitHub Repositories to Feature
  featuredRepos: [
    {
      name: "react-component-library",
      description: "A collection of reusable React components with TypeScript support",
      stars: 120,
      language: "TypeScript",
    },
    {
      name: "devops-toolkit",
      description: "Docker and Kubernetes configurations for modern deployments",
      stars: 85,
      language: "Go",
    },
    {
      name: "api-boilerplate",
      description: "Production-ready Node.js API starter with authentication",
      stars: 200,
      language: "JavaScript",
    },
  ],

  // Experience/Work History
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Leading development of cloud-native applications",
    },
    {
      title: "Full Stack Developer",
      company: "Startup Inc",
      period: "2020 - 2022",
      description: "Built and scaled multiple web applications",
    },
    {
      title: "Software Developer",
      company: "Digital Agency",
      period: "2019 - 2020",
      description: "Developed client websites and web applications",
    },
  ],

  // Contact Section
  contact: {
    headline: "Let's Connect",
    subtext:
      "Ready to discuss your next project? I'd love to hear about your challenges and explore how we can build something amazing together.",
    availability: "Available for freelance and full-time opportunities",
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Aravind S Narayan. All rights reserved.`,
    builtWith: "Built with Next.js, Tailwind CSS & ❤️",
  },

  // SEO
  seo: {
    title: "Aravind S Narayan - Full Stack Developer",
    description:
      "Portfolio of Aravind S Narayan - Full Stack Developer specializing in React, Node.js, and cloud technologies.",
    keywords: [
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Software Engineer",
      "Web Developer",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
