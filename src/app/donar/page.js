"use client";

import Logo from "@/components/Logo";
import CopyButton from "@/components/CopyButton";

const methods = [
  {
    type: "Pago Móvil",
    icon: "🏦",
    fields: [
      { label: "Banco", value: "Banesco", copyValue: "Banesco" },
      { label: "Cédula", value: "V-13313482", copyValue: "13313482" },
      { label: "Teléfono", value: "0414-5116337", copyValue: "04145116337" },
    ],
  },
  {
    type: "Zelle",
    icon: "💵",
    fields: [
      { label: "Teléfono", value: "+1 (956) 510-4300", copyValue: "+19565104300" },
    ],
  },
  {
    type: "Binance Pay",
    icon: "🪙",
    fields: [
      { label: "Correo", value: "herasisilva@gmail.com", copyValue: "herasisilva@gmail.com" },
    ],
  },
  {
    type: "PayPal",
    icon: "💳",
    fields: [
      { label: "Correo", value: "herasisilva@gmail.com", copyValue: "herasisilva@gmail.com" },
    ],
  },
];

export default function DonarPage() {
  return (
    <div className="py-8 animate-fade-in">
      <div className="flex justify-center mb-6">
        <Logo size="small" />
      </div>

      <div className="text-center mb-8">
        <p className="text-4xl mb-3">☕</p>
        <h1 className="text-xl font-bold text-[#fafafa] mb-2">Invítame un cafecito</h1>
        <p className="text-[#a1a1a1] text-sm">
          Si <span className="text-[#fafafa] font-medium">PayCopy</span> te ha sido útil, puedes apoyar con lo que desees.
        </p>
        <p className="text-[#737373] text-xs mt-1">Cualquier monto es bienvenido 🧡</p>
      </div>

      <div className="space-y-4">
        {methods.map((method, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-[#262626] rounded-2xl overflow-hidden">
            <div className="p-4 pb-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{method.icon}</span>
                <span className="text-[#fafafa] font-semibold text-sm">{method.type}</span>
              </div>
              <div className="space-y-2.5">
                {method.fields.map((field, j) => (
                  <div key={j} className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[#737373] text-xs">{field.label}</p>
                      <p className="text-[#fafafa] text-sm font-medium truncate">{field.value}</p>
                    </div>
                    <CopyButton text={field.copyValue} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-[#a1a1a1] text-sm font-medium">Herasi Silva</p>
        <p className="text-[#737373] text-xs mt-0.5">¡Gracias por tu apoyo!</p>
      </div>

      <footer className="text-center mt-8 pb-4">
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
