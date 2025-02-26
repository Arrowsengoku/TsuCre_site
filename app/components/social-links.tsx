"use client";

import { Twitter, Instagram } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://x.com/tsu_cre"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href="https://www.instagram.com/tsucre_ggc"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  );
}