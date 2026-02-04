# Aravind S Narayan - Portfolio Website

A modern, terminal-themed portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with SEO
│   └── page.tsx         # Main page assembling components
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Terminal-style hero section
│   ├── About.tsx        # Stats and highlights
│   ├── Impact.tsx       # Impact metrics section
│   ├── Skills.tsx       # Skills with terminal styling
│   ├── Projects.tsx     # Featured projects & GitHub repos
│   ├── Contact.tsx      # Contact information
│   ├── Footer.tsx       # Site footer
│   └── index.ts         # Component exports
└── data/
    └── siteConfig.ts    # ⭐ ALL CONTENT LIVES HERE
```

## ✏️ How to Modify Content

**All website content is centralized in `src/data/siteConfig.ts`**

### Personal Information
```typescript
name: "Your Name",
username: "yourname",
tagline: "Your Title",
description: "Your description...",
```

### Social Links
```typescript
socials: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "your@email.com",
},
```

### Stats & Metrics
```typescript
stats: [
  { value: "5+", label: "Years Experience", icon: "calendar" },
  // Add more stats...
],
```

### Skills
```typescript
skillCategories: [
  {
    category: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript"],
  },
  // Add more categories...
],
```

### Projects
```typescript
projects: [
  {
    title: "Project Name",
    description: "Description...",
    tags: ["React", "Node.js"],
    github: "https://github.com/...",
    demo: "https://demo.example.com",
  },
  // Add more projects...
],
```

### GitHub Repositories
```typescript
featuredRepos: [
  {
    name: "repo-name",
    description: "Description...",
    stars: 100,
    language: "TypeScript",
  },
  // Add more repos...
],
```

## 🎨 Customization

### Colors
The site uses Tailwind's `emerald` and `slate` color palettes. To change:

1. Search for `emerald` in components and replace with your preferred color
2. Common replacements: `emerald-400`, `emerald-500`, `emerald-600`

### Fonts
Fonts are configured in `src/app/layout.tsx`:
- Primary: Inter
- Monospace: JetBrains Mono

### Adding New Sections
1. Create a new component in `src/components/`
2. Export it from `src/components/index.ts`
3. Import and add it to `src/app/page.tsx`

## 📄 Adding Your Resume

Place your resume PDF at `public/resume.pdf`

## 🖼️ Adding Project Images

1. Add images to `public/projects/`
2. Update the `image` field in `siteConfig.ts` projects array

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
Build and deploy the `.next` directory or use `next export` for static.

## 📦 Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Type Animation** - Typing effect

## 📝 License

MIT License - Feel free to use this template for your own portfolio!
