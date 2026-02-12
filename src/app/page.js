"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { getMethods } from "@/utils/storage";

export default function Home() {
  const router = useRouter();
  const [hasMethods, setHasMethods] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasMethods(getMethods().length > 0);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh">
        <Logo size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh py-8 animate-fade-in">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Logo size="large" />
        <p className="text-[#a1a1a1] text-sm mt-3 mb-12">Cobra y paga fácil</p>

        <div className="w-full space-y-3">
          <button
            onClick={() => {
              if (hasMethods) {
                router.push("/cobrar");
              } else {
                router.push("/metodos");
              }
            }}
            className="w-full py-4 rounded-2xl bg-[#ea580c] text-white font-semibold text-base hover:bg-[#fb923c] transition-colors active:scale-[0.98]"
          >
            💰 Cobrar
          </button>

          <button
            onClick={() => router.push("/metodos")}
            className="w-full py-4 rounded-2xl border border-[#ea580c] text-[#ea580c] font-semibold text-base hover:bg-[#ea580c]/10 transition-colors active:scale-[0.98]"
          >
            ⚙️ Mis Métodos de Pago
          </button>
        </div>

        {!hasMethods && (
          <p className="text-[#737373] text-xs text-center mt-6 px-4">
            Configura tu primer método de pago para empezar a cobrar
          </p>
        )}
      </div>

      <footer className="mt-auto pt-8">
        <p className="text-[#737373] text-xs">
          Hecho por{" "}
          <a
            href="https://herasi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a1a1a1] hover:text-[#ea580c] transition-colors"
          >
            herasi.dev
          </a>
        </p>
      </footer>
    </div>
  );
}
