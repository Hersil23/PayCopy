"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "COPIAR" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      if (navigator.vibrate) navigator.vibrate(50);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 min-w-[90px] ${
        copied
          ? "bg-[#05df72]/20 text-[#05df72] border border-[#05df72]/30"
          : "bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30 hover:bg-[#ea580c]/30 active:scale-95"
      }`}
    >
      {copied ? "✅ ¡Copiado!" : label}
    </button>
  );
}
