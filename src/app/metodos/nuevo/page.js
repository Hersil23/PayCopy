"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import MethodForm from "@/components/MethodForm";
import { saveMethod } from "@/utils/storage";
import { methodTypes } from "@/utils/methods";
import { useToast } from "@/components/Toast";

export default function NuevoMetodoPage() {
  const router = useRouter();
  const toast = useToast();
  const [selectedType, setSelectedType] = useState(null);

  function handleSave(data) {
    saveMethod({ type: selectedType, data });
    toast("Método guardado correctamente");
    router.push("/metodos");
  }

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/metodos" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Agregar Método</h1>

      {!selectedType ? (
        <div className="space-y-3">
          <p className="text-[#a1a1a1] text-sm mb-4">Selecciona el tipo de método</p>
          {methodTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className="w-full flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#262626] rounded-2xl hover:border-[#ea580c] transition-colors text-left active:scale-[0.98]"
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center bg-[#262626] rounded-xl">
                {type.icon}
              </span>
              <span className="text-[#fafafa] font-medium text-sm">{type.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedType(null)}
            className="text-[#a1a1a1] text-sm mb-4 hover:text-[#fafafa] transition-colors flex items-center gap-1"
          >
            ← Cambiar tipo
          </button>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">
              {methodTypes.find((m) => m.id === selectedType)?.icon}
            </span>
            <span className="text-[#fafafa] font-semibold">
              {methodTypes.find((m) => m.id === selectedType)?.name}
            </span>
          </div>
          <MethodForm type={selectedType} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}
