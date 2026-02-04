"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Terminal-style header */}
          <div className="inline-block">
            <code className="text-emerald-400 font-mono text-lg sm:text-xl">
              ./skills --list --verbose
            </code>
          </div>
          <p className="text-slate-400 mt-4">
            A comprehensive overview of my technical toolkit
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/30 transition-colors"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-slate-400 text-sm font-mono">
                  {category.category.toLowerCase()}.sh
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <span className="text-emerald-400">$</span>
                  <span>cat {category.category.toLowerCase()}/skills.txt</span>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-emerald-400">{category.icon}</span>
                      <span className="text-slate-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal Command Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 max-w-4xl mx-auto overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-slate-400 text-sm font-mono">
                tech-ecosystem.conf
              </span>
            </div>

            {/* Config Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-slate-400 mb-4">
                <span className="text-cyan-400"># Production stack configuration</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-purple-400">LANGUAGES</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-emerald-400">
                    ({siteConfig.skills.languages.slice(0, 3).join(", ")})
                  </span>
                </div>
                <div>
                  <span className="text-purple-400">FRONTEND</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-emerald-400">
                    ({siteConfig.skills.frontend.slice(0, 3).join(", ")})
                  </span>
                </div>
                <div>
                  <span className="text-purple-400">BACKEND</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-emerald-400">
                    ({siteConfig.skills.backend.slice(0, 3).join(", ")})
                  </span>
                </div>
                <div>
                  <span className="text-purple-400">CLOUD</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-emerald-400">
                    ({siteConfig.skills.cloud.slice(0, 3).join(", ")})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
