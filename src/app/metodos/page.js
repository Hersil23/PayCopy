"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import MethodCard from "@/components/MethodCard";
import { getMethods, deleteMethod } from "@/utils/storage";
import { useToast } from "@/components/Toast";

export default function MetodosPage() {
  const router = useRouter();
  const toast = useToast();
  const [methods, setMethods] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setMounted(true);
    setMethods(getMethods());
  }, []);

  function handleDelete(id) {
    if (deleteConfirm === id) {
      deleteMethod(id);
      setMethods(getMethods());
      setDeleteConfirm(null);
      toast("Método eliminado");
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  }

  if (!mounted) return null;

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Mis Métodos de Pago</h1>

      {methods.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">💳</p>
          <p className="text-[#a1a1a1] text-sm mb-2">No tienes métodos de pago</p>
          <p className="text-[#737373] text-xs">Agrega tu primer método para empezar a cobrar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {methods.map((method) => (
            <div key={method.id}>
              <MethodCard method={method} onDelete={handleDelete} />
              {deleteConfirm === method.id && (
                <p className="text-red-400 text-xs mt-1 ml-2 animate-fade-in">
                  Toca eliminar de nuevo para confirmar
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/metodos/nuevo")}
        className="w-full py-3.5 rounded-2xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#fb923c] transition-colors mt-6 active:scale-[0.98]"
      >
        ➕ Agregar Método
      </button>
    </div>
  );
}
