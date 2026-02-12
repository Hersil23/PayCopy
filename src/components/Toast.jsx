"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-[440px] px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-xl text-sm font-medium text-center animate-slide-up ${
              toast.type === "success"
                ? "bg-[#05df72]/20 text-[#05df72] border border-[#05df72]/30"
                : toast.type === "error"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/30"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
