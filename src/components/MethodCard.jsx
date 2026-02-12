"use client";

import { useRouter } from "next/navigation";
import { getMethodType } from "@/utils/methods";

export default function MethodCard({ method, onDelete }) {
  const router = useRouter();
  const type = getMethodType(method.type);

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-4 flex items-center gap-3">
      <div className="text-2xl w-10 h-10 flex items-center justify-center bg-[#262626] rounded-xl flex-shrink-0">
        {type.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#fafafa] font-semibold text-sm truncate">{type.name}</p>
        <p className="text-[#a1a1a1] text-xs truncate">{method.data?.titular || "Sin titular"}</p>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => router.push(`/metodos/editar/${method.id}`)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#262626] hover:bg-[#333] transition-colors text-sm"
          aria-label="Editar"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(method.id)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#262626] hover:bg-red-500/20 transition-colors text-sm"
          aria-label="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
