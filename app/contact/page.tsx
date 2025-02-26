"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguageStore } from "@/app/store/language";
import { translations } from "@/app/translations";

export default function Contact() {
  const { language } = useLanguageStore();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.contact.validation);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('API error');

      toast.success(t.contact.success);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(t.contact.error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              {t.contact.title}
            </h1>
            <div className="p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.name.label}</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-white/20"
                    placeholder={t.contact.form.name.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.email.label}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20"
                    placeholder={t.contact.form.email.placeholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.form.message.label}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/10 border-white/20 min-h-[150px]"
                    placeholder={t.contact.form.message.placeholder}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600"
                >
                  {t.contact.form.submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}