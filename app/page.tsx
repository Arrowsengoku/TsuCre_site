"use client";

import { motion } from "framer-motion";
import { Wrench, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import Image from 'next/image';
import { useLanguageStore } from "@/app/store/language";
import { translations } from "@/app/translations";
import CircularProgress from "@/app/components/circular-progress";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("Received email:", email);

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export default function Home() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t.home.newsletter.validation);
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) throw new Error('API error');

      toast.success(t.home.newsletter.success);
      setEmail("");
    } catch (error) {
      toast.error(t.home.newsletter.error);
    }
  };

  const features = t.home.features.items.map((feature, index) => ({
    ...feature,
    icon: [Wrench, Zap, Timer][index],
  }));

  const benefits = t.home.benefits;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              T2411
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              {t.home.hero.subtitle}
            </p>
            <div className="max-w-md mx-auto mb-8">
              <ul className="text-left space-y-2 mb-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <span className="text-cyan-400">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={t.home.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20"
                  />
                  <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                    {t.home.newsletter.button}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Image Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Image
                src="./controller.png" 
                alt="T2411 Controller"
                width={1200}
                height={675}
                priority
                className="rounded-lg shadow-2xl mb-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.home.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-colors"
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {t.home.testimonials.title}
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <CircularProgress percentage={74} />
              </div>
              <p className="text-xl text-gray-300">
                {t.home.testimonials.stats}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              {t.home.cta.title}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t.home.cta.description}
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t.home.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20"
                />
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600">
                  {t.home.newsletter.button}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
