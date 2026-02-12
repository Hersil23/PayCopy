"use client";

import CopyButton from "./CopyButton";
import { getMethodType, getDisplayFields } from "@/utils/methods";

export default function PaymentView({ payment }) {
  const { n, t, d, m, c, co } = payment;
  const type = getMethodType(t);
  const fields = getDisplayFields(t, d);

  const currencySymbols = {
    Bs: "Bs.",
    USD: "$",
    EUR: "€",
    USDT: "USDT",
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl overflow-hidden">
      <div className="p-5 pb-4">
        <p className="text-[#a1a1a1] text-sm text-center">
          <span className="text-[#fafafa] font-semibold">{n}</span> te envía un cobro
        </p>

        {m && (
          <div className="text-center mt-4">
            <p className="text-[#ea580c] text-4xl font-bold">
              {currencySymbols[c] || c} {m}
            </p>
          </div>
        )}

        {co && (
          <p className="text-[#a1a1a1] text-sm text-center mt-2">
            {co}
          </p>
        )}
      </div>

      <div className="border-t border-[#262626] mx-5" />

      <div className="p-5 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{type.icon}</span>
          <span className="text-[#fafafa] font-semibold text-sm">{type.name}</span>
        </div>

        <div className="space-y-3">
          {fields.map((field, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[#737373] text-xs">{field.label}</p>
                <p className="text-[#fafafa] text-sm font-medium truncate">{field.value}</p>
              </div>
              <CopyButton text={field.copyValue || field.value} />
            </div>
          ))}

          {m && (
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#262626]">
              <div className="min-w-0 flex-1">
                <p className="text-[#737373] text-xs">Monto</p>
                <p className="text-[#fafafa] text-sm font-medium">{m}</p>
              </div>
              <CopyButton text={m} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
