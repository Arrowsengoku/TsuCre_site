"use client";

import { Toaster } from "sonner";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLanguageStore } from "@/app/store/language";
import { translations } from "@/app/translations";
import { useEffect, useState } from "react";

// Dynamically import non-critical components
const LanguageSwitcher = dynamic(() => import('./language-switcher'), {
  ssr: false,
  loading: () => <div className="w-8 h-8" />
});

const SocialLinks = dynamic(() => import('./social-links'), {
  ssr: false,
  loading: () => <div className="w-20 h-8" />
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="TsuCre Logo"
                width={200}
                height={200}
                className="-ml-4"
                priority
                loading="eager"
              />
            </Link>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex items-center gap-6">
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </div>
              <SocialLinks />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-24">
        {children}
      </main>
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              {t.footer.rights}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="md:hidden flex items-center gap-6">
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </div>
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
      <Toaster />
    </div>
  );
}