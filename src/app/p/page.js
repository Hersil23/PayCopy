"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import PaymentView from "@/components/PaymentView";
import { decodePayment } from "@/utils/encoder";

function PaymentContent() {
  const searchParams = useSearchParams();
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const d = searchParams.get("d");
    if (d) {
      const decoded = decodePayment(d);
      if (decoded && decoded.n && decoded.t && decoded.d) {
        setPayment(decoded);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <Logo size="medium" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh py-8">
        <Logo size="medium" />
        <div className="text-center mt-8">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="text-[#fafafa] font-bold text-lg mb-2">Enlace inválido</h2>
          <p className="text-[#a1a1a1] text-sm">
            Este enlace de cobro no es válido o está incompleto.
          </p>
          <p className="text-[#737373] text-xs mt-2">
            Pide a quien te cobró que genere un nuevo enlace.
          </p>
        </div>
      </div>
    );
  }

  if (!payment) return null;

  return (
    <div className="py-8 animate-fade-in">
      <div className="flex justify-center mb-8">
        <Logo size="small" />
      </div>

      <PaymentView payment={payment} />

      <div className="mt-10 bg-[#1a1a1a] border border-[#262626] rounded-2xl p-5 text-center">
        <p className="text-[#fafafa] font-semibold text-sm mb-1">¿Tú también cobras?</p>
        <p className="text-[#a1a1a1] text-xs mb-4">Crea tu enlace de cobro gratis con PayCopy</p>
        <a
          href="/"
          className="inline-block w-full py-3 rounded-2xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#fb923c] transition-colors active:scale-[0.98]"
        >
          💰 Crear mi cobro
        </a>
      </div>

      <footer className="text-center mt-6 pb-4">
        <p className="text-[#737373] text-xs">
          Creado por{" "}
          <a
            href="https://herasi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a1a1a1] hover:text-[#ea580c] transition-colors"
          >
            @herasi.dev
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-dvh">
          <Logo size="medium" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
