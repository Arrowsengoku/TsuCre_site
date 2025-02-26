"use client";

import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/app/store/language";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <Button
      onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
    >
      <Globe className="w-4 h-4" />
      {language === 'ja' ? 'EN' : '日本語'}
    </Button>
  );
}