"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import { useLanguageStore } from "@/app/store/language";
import { translations } from "@/app/translations";

export default function About() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mission Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-cyan-900/20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              {t.about.title}
            </h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {t.about.intro.text1}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {t.about.intro.text2}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.about.intro.text3}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              {t.about.vision.title}
            </h2>
            <p className="text-2xl font-medium text-gray-200 leading-relaxed">
              {t.about.vision.text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Credo Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.about.credo.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {t.about.credo.items.map((credo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                  {index + 1}. {credo.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {credo.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.about.team.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.about.team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={index === 0 ? "/oya.jpg" : "/yui.jpg"}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-cyan-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.about.achievements.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            {t.about.achievements.items.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-400 font-semibold">{achievement.year}</span>
                    <h3 className="text-lg font-medium">{achievement.title}</h3>
                  </div>
                  <span className="text-purple-400 font-semibold">{achievement.award}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}