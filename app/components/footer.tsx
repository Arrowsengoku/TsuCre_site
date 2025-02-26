"use client";

import Link from 'next/link';
import { useLanguageStore } from '@/app/store/language';
import { translations } from '@/app/translations';

export default function Footer() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            {t.footer.rights}
          </div>
          <div className="flex gap-6">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}