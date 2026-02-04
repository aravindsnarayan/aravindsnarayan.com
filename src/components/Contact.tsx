"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle, Download, Calendar } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
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
            {siteConfig.contact.headline}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {siteConfig.contact.subtext}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.a
            href={`mailto:${siteConfig.socials.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all group text-center"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <Mail className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-slate-400 text-sm">{siteConfig.socials.email}</p>
          </motion.a>

          <motion.a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all group text-center"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
              <Linkedin className="text-blue-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
            <p className="text-slate-400 text-sm">Connect with me</p>
          </motion.a>

          <motion.a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all group text-center"
          >
            <div className="w-12 h-12 bg-slate-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-500/20 transition-colors">
              <Github className="text-slate-300" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-1">GitHub</h3>
            <p className="text-slate-400 text-sm">Check my code</p>
          </motion.a>

          <motion.a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all group text-center"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
              <Download className="text-purple-400" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-1">Resume</h3>
            <p className="text-slate-400 text-sm">Download PDF</p>
          </motion.a>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-8 sm:p-12 border border-emerald-500/20 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how I can help bring your ideas to life. I&apos;m always excited to work on new and challenging projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${siteConfig.socials.email}`}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <MessageCircle size={20} />
              Send Message
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 border border-slate-700"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>
          <p className="text-emerald-400 text-sm mt-6">
            {siteConfig.contact.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
