"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/app/store/language";
import { translations } from "@/app/translations";

export default function Privacy() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.privacy.title}
          </h1>
          <p>{t.privacy.sections.content}</p>
          <section className="mb-8">
            <h2>{t.privacy.sections.companyInfo.title}</h2>
            <ul>
              {t.privacy.sections.companyInfo.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
