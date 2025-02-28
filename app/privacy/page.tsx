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
          {/* プライバシーポリシーのタイトル */}
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.privacy.title}
          </h1>

          {/* イントロ (文字列なので直接表示) */}
          <p>{t.privacy.sections.intro}</p>

          {/* 各セクションをループで表示 */}
          {Object.entries(t.privacy.sections)
            .filter(([key]) => key !== "intro") // introはすでに表示済みなので除外
            .map(([key, section]) => {
              if (typeof section === "string") {
                // セクションが単一の文字列の場合はそのまま表示
                return (
                  <section key={key} className="mb-8">
                    <p>{section}</p>
                  </section>
                );
              } else {
                return (
                  <section key={key} className="mb-8">
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc pl-6">
                        {section.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </section>
                );
              }
            })}
        </motion.div>
      </div>
    </div>
  );
}
