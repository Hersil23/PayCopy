"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ href, label = "Volver" }) {
  const router = useRouter();

  function handleClick() {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 text-[#a1a1a1] hover:text-[#fafafa] transition-colors text-sm"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {label}
    </button>
  );
}
