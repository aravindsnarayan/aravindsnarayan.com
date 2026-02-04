"use client";

import { motion } from "framer-motion";
import { Calendar, Folder, CheckCircle, Clock, Code, Rocket, Shield, Users } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-6 h-6" />,
  folder: <Folder className="w-6 h-6" />,
  check: <CheckCircle className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
};

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {siteConfig.tagline} & {siteConfig.subtitle.split("&")[1]?.trim() || "Problem Solver"}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            I build scalable, reliable, and beautiful software solutions that power innovation at scale.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {siteConfig.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
            >
              <div className="text-emerald-400 flex justify-center mb-3">
                {iconMap[stat.icon]}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 hover:bg-slate-800/50 transition-all group"
            >
              <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                {iconMap[highlight.icon]}
              </div>
              <h3 className="text-white font-semibold mb-2">{highlight.title}</h3>
              <p className="text-slate-400 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
