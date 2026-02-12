"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { getMethods } from "@/utils/storage";
import { getMethodType, currencies } from "@/utils/methods";
import { useToast } from "@/components/Toast";

export default function CobrarPage() {
  const router = useRouter();
  const toast = useToast();
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [monto, setMonto] = useState("");
  const [moneda, setMoneda] = useState("");
  const [concepto, setConcepto] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const m = getMethods();
    setMethods(m);
    if (m.length === 0) {
      router.push("/metodos");
    }
  }, [router]);

  function handleSelectMethod(method) {
    setSelectedMethod(method);
    const type = getMethodType(method.type);
    setMoneda(type.defaultCurrency);
  }

  function handleMonto(value) {
    const clean = value.replace(/[^0-9.]/g, "");
    const parts = clean.split(".");
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setMonto(clean);
  }

  function handleGenerar() {
    if (!selectedMethod || !monto) {
      toast("Selecciona un método y escribe el monto", "error");
      return;
    }

    const paymentData = {
      n: selectedMethod.data.titular,
      t: selectedMethod.type,
      d: { ...selectedMethod.data },
      m: monto,
      c: moneda,
      co: concepto || undefined,
    };
    delete paymentData.d.titular;

    sessionStorage.setItem("paycopy_payment", JSON.stringify(paymentData));
    router.push("/cobrar/preview");
  }

  if (!mounted) return null;

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Nuevo Cobro</h1>

      <div className="space-y-6">
        <div>
          <p className="text-[#a1a1a1] text-xs font-medium mb-3">Método de pago</p>
          <div className="space-y-2">
            {methods.map((method) => {
              const type = getMethodType(method.type);
              const isSelected = selectedMethod?.id === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => handleSelectMethod(method)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#ea580c]/10 border-[#ea580c]"
                      : "bg-[#1a1a1a] border-[#262626] hover:border-[#ea580c]/50"
                  }`}
                >
                  <span className="text-xl w-9 h-9 flex items-center justify-center bg-[#262626] rounded-xl">
                    {type.icon}
                  </span>
                  <div>
                    <p className="text-[#fafafa] font-medium text-sm">{type.name}</p>
                    <p className="text-[#737373] text-xs">{method.data?.titular}</p>
                  </div>
                  {isSelected && (
                    <span className="ml-auto text-[#ea580c]">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[#a1a1a1] text-xs font-medium mb-1.5">Monto</p>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={monto}
              onChange={(e) => handleMonto(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-[#fafafa] text-lg font-semibold focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#737373]"
            />
            <select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
              className="bg-[#141414] border border-[#262626] rounded-xl px-3 py-3 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors w-24"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-[#a1a1a1] text-xs font-medium mb-1.5">
            Concepto <span className="text-[#737373]">(opcional)</span>
          </p>
          <input
            type="text"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value.slice(0, 100))}
            placeholder="Ej: Corte de cabello"
            className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#737373]"
          />
          <p className="text-[#737373] text-xs mt-1 text-right">{concepto.length}/100</p>
        </div>

        <button
          onClick={handleGenerar}
          disabled={!selectedMethod || !monto}
          className="w-full py-4 rounded-2xl bg-[#ea580c] text-white font-semibold text-base hover:bg-[#fb923c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Generar Cobro
        </button>
      </div>
    </div>
  );
}
