import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LanguageStore = {
  language: 'ja' | 'en';
  setLanguage: (language: 'ja' | 'en') => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'ja',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);