"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguageStore } from '@/app/store/language';
import { translations } from '@/app/translations';
import LanguageSwitcher from './language-switcher';

export default function Header() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <header className="bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="TsuCre"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-8">
            <Link 
              href="/about"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link 
              href="/contact"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.contact}
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}