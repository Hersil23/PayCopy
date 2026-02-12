"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import PaymentView from "@/components/PaymentView";
import { buildPaymentUrl } from "@/utils/encoder";
import { useToast } from "@/components/Toast";

export default function PreviewPage() {
  const router = useRouter();
  const toast = useToast();
  const [payment, setPayment] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [showFullUrl, setShowFullUrl] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const data = sessionStorage.getItem("paycopy_payment");
      if (data) {
        const parsed = JSON.parse(data);
        setPayment(parsed);
        setPaymentUrl(buildPaymentUrl(parsed));
      } else {
        router.push("/cobrar");
      }
    } catch {
      router.push("/cobrar");
    }
  }, [router]);

  function handleWhatsApp() {
    if (!payment) return;
    const currencyNames = { Bs: "Bs.", USD: "USD", EUR: "EUR", USDT: "USDT" };
    const text = `Hola! Aquí están mis datos de pago por ${payment.m} ${currencyNames[payment.c] || payment.c}: ${paymentUrl}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(paymentUrl);
      if (navigator.vibrate) navigator.vibrate(50);
      toast("¡Enlace copiado!");
    } catch {
      toast("No se pudo copiar el enlace", "error");
    }
  }

  if (!mounted || !payment) return null;

  const urlDisplay = showFullUrl
    ? paymentUrl
    : paymentUrl.length > 60
    ? paymentUrl.slice(0, 60) + "..."
    : paymentUrl;

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/cobrar" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Tu Cobro</h1>

      <PaymentView payment={payment} />

      <div className="mt-6 space-y-3">
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-3">
          <p className="text-[#737373] text-xs mb-1">Enlace de cobro</p>
          <p className="text-[#a1a1a1] text-xs break-all font-mono">{urlDisplay}</p>
          {paymentUrl.length > 60 && (
            <button
              onClick={() => setShowFullUrl(!showFullUrl)}
              className="text-[#ea580c] text-xs mt-1"
            >
              {showFullUrl ? "Ver menos" : "Ver completo"}
            </button>
          )}
        </div>

        <button
          onClick={handleWhatsApp}
          className="w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors active:scale-[0.98]"
        >
          📱 Compartir por WhatsApp
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full py-3.5 rounded-2xl border border-[#ea580c] text-[#ea580c] font-semibold text-sm hover:bg-[#ea580c]/10 transition-colors active:scale-[0.98]"
        >
          📋 Copiar Enlace
        </button>

        <button
          onClick={() => router.push("/cobrar")}
          className="w-full py-3 text-[#a1a1a1] text-sm hover:text-[#fafafa] transition-colors"
        >
          🔄 Nuevo Cobro
        </button>
      </div>
    </div>
  );
}
