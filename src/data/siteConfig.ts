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
    { name: "Experience", href: "#experience" },
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
    { value: "20+", label: "Projects Completed", icon: "folder" },
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
    languages: ["Python", "Bash", "Go", "YAML", "HCL"],
    cloud: ["AWS", "GCP", "Azure", "DigitalOcean"],
    containers: ["Docker", "Kubernetes", "Helm", "Podman"],
    iac: ["Terraform", "Ansible", "Pulumi", "CloudFormation"],
    cicd: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD"],
    monitoring: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
  },

  // Skill Categories for Terminal Display
  skillCategories: [
    {
      category: "Cloud Platforms",
      icon: "☁️",
      skills: ["AWS", "GCP", "Azure", "DigitalOcean", "Cloudflare"],
    },
    {
      category: "Containers & Orchestration",
      icon: "🐳",
      skills: ["Docker", "Kubernetes", "Helm", "Docker Compose", "Podman"],
    },
    {
      category: "Infrastructure as Code",
      icon: "📝",
      skills: ["Terraform", "Ansible", "Pulumi", "CloudFormation", "Vagrant"],
    },
    {
      category: "CI/CD & GitOps",
      icon: "🔄",
      skills: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD", "FluxCD"],
    },
    {
      category: "Monitoring & Observability",
      icon: "📊",
      skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "PagerDuty"],
    },
    {
      category: "Security & Networking",
      icon: "🔒",
      skills: ["Vault", "Nginx", "Traefik", "Istio", "Trivy"],
    },
  ],

  // Projects Section
  projects: [
    {
      title: "AdaQuiz",
      description:
        "A modern quiz platform for educators and learners. Released and continuously improving with new features.",
      tags: ["Next.js 16", "React 19", "Supabase", "OpenAI", "Redis", "Vercel"],
      github: "", // Closed source
      demo: "https://adaquiz.online",
      image: "/projects/adaquiz.png",
    },
    {
      title: "Project Ohara",
      description:
        "A full-featured web application for AI-powered deep research, based on the Lutum Veritas engine. Conducts comprehensive multi-source research with intelligent synthesis, producing detailed reports with proper citations.",
      tags: ["React 19", "FastAPI", "PostgreSQL", "OAuth2", "Camoufox"],
      github: "https://github.com/aravindsnarayan/ProjectOhara",
      demo: "",
      image: "/projects/ohara.png",
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
      title: "Senior DevOps Engineer",
      company: "PIT Solutions Ltd",
      period: "Dec 2020 - Present",
      description: "Leading DevOps initiatives, CI/CD pipelines, and cloud infrastructure",
    },
  ],

  // Education
  education: [
    {
      degree: "B.Tech in Electrical and Electronics Engineering",
      institution: "College of Engineering Trivandrum",
      period: "2015 - 2019",
    },
    {
      degree: "+2 Computer Science",
      institution: "Kendriya Vidyalaya Pattom",
      period: "2014",
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
    title: "Aravind S Narayan - Senior DevOps Engineer",
    description:
      "Portfolio of Aravind S Narayan - Senior DevOps Engineer specializing in CI/CD, Kubernetes, AWS, and cloud infrastructure automation.",
    keywords: [
      "DevOps Engineer",
      "Cloud Engineer", 
      "Kubernetes Expert",
      "CI/CD Specialist",
      "AWS Certified",
      "Infrastructure as Code",
      "Terraform",
      "Docker",
    ],
    siteUrl: "https://aravindsnarayan.com",
    ogImage: "/og-image.png",
    twitterHandle: "@aravindsnarayan",
  },
};

export type SiteConfig = typeof siteConfig;
