"use client";

export default function Logo({ size = "large" }) {
  const sizes = {
    small: { icon: "w-8 h-8", text: "text-lg" },
    medium: { icon: "w-10 h-10", text: "text-xl" },
    large: { icon: "w-14 h-14", text: "text-3xl" },
  };

  const s = sizes[size] || sizes.large;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className={`${s.icon} relative`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="36" height="48" rx="4" fill="#1a1a1a" stroke="#ea580c" strokeWidth="3" />
          <line x1="16" y1="16" x2="36" y2="16" stroke="#a1a1a1" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="24" x2="32" y2="24" stroke="#a1a1a1" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="32" x2="34" y2="32" stroke="#a1a1a1" strokeWidth="2" strokeLinecap="round" />
          <rect x="28" y="28" width="28" height="32" rx="4" fill="#1a1a1a" stroke="#05df72" strokeWidth="3" />
          <path d="M36 44l4 4 8-8" stroke="#05df72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className={`${s.text} font-bold text-[#fafafa]`}>
        Pay<span className="text-[#ea580c]">Copy</span>
      </span>
    </div>
  );
}
