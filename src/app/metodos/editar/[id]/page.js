"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import MethodForm from "@/components/MethodForm";
import { getMethodById, saveMethod } from "@/utils/storage";
import { methodTypes } from "@/utils/methods";
import { useToast } from "@/components/Toast";

export default function EditarMetodoPage() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const [method, setMethod] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const m = getMethodById(params.id);
    if (m) {
      setMethod(m);
    } else {
      router.push("/metodos");
    }
  }, [params.id, router]);

  function handleSave(data) {
    saveMethod({ ...method, data });
    toast("Método actualizado");
    router.push("/metodos");
  }

  if (!mounted || !method) return null;

  const type = methodTypes.find((m) => m.id === method.type);

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <BackButton href="/metodos" />
      </div>

      <h1 className="text-xl font-bold text-[#fafafa] mb-6">Editar Método</h1>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">{type?.icon}</span>
        <span className="text-[#fafafa] font-semibold">{type?.name}</span>
      </div>

      <MethodForm
        type={method.type}
        initialData={method.data}
        onSave={handleSave}
      />
    </div>
  );
}
