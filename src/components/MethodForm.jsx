"use client";

import { useState } from "react";
import { banks } from "@/utils/banks";
import { getFieldsForType } from "@/utils/methods";
import { formatPhone, formatAccountNumber, formatCedula, validatePhone, validateAccountNumber, validateRequired } from "@/utils/validators";

export default function MethodForm({ type, initialData = {}, onSave }) {
  const fields = getFieldsForType(type);

  const defaults = {};
  fields.forEach((f) => {
    if (f.type === "cedula_prefix" && !initialData[f.key]) {
      defaults[f.key] = "V";
    }
  });

  const [data, setData] = useState({ ...defaults, ...initialData });
  const [customFields, setCustomFields] = useState(initialData.custom_fields || []);
  const [errors, setErrors] = useState({});

  function handleChange(key, value, fieldType) {
    let formatted = value;
    if (fieldType === "phone") formatted = formatPhone(value);
    if (fieldType === "account") formatted = formatAccountNumber(value);
    if (fieldType === "cedula") formatted = formatCedula(value);

    setData((prev) => ({ ...prev, [key]: formatted }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function addCustomField() {
    setCustomFields((prev) => [...prev, { label: "", value: "" }]);
  }

  function updateCustomField(index, key, value) {
    setCustomFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  }

  function removeCustomField(index) {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  }

  function validate() {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !validateRequired(data[field.key])) {
        newErrors[field.key] = "Campo requerido";
      }
      if (field.type === "phone" && data[field.key] && !validatePhone(data[field.key])) {
        newErrors[field.key] = "Formato: 04XX-XXXXXXX";
      }
      if (field.type === "account" && data[field.key] && !validateAccountNumber(data[field.key])) {
        newErrors[field.key] = "Debe tener 20 dígitos";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const saveData = { ...data };
    if (type === "otro" && customFields.length > 0) {
      saveData.custom_fields = customFields.filter((f) => f.label && f.value);
    }
    onSave(saveData);
  }

  function isFormValid() {
    return fields.every((f) => !f.required || validateRequired(data[f.key]));
  }

  function renderField(field) {
    const baseInput =
      "w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#737373]";
    const baseSelect =
      "w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors";

    switch (field.type) {
      case "bank_select":
        return (
          <select
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            className={baseSelect}
          >
            <option value="">Seleccionar banco</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        );
      case "cedula_prefix":
        return (
          <select
            value={data[field.key] || "V"}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            className={baseSelect}
          >
            <option value="V">V</option>
            <option value="E">E</option>
            <option value="J">J</option>
            <option value="G">G</option>
          </select>
        );
      case "cedula":
        return (
          <input
            type="text"
            inputMode="numeric"
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            placeholder="12345678"
            className={baseInput}
          />
        );
      case "phone":
        return (
          <input
            type="text"
            inputMode="tel"
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            placeholder="0412-1234567"
            className={baseInput}
          />
        );
      case "account":
        return (
          <input
            type="text"
            inputMode="numeric"
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            placeholder="01340000000000000000"
            className={baseInput}
          />
        );
      case "account_type":
        return (
          <select
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            className={baseSelect}
          >
            <option value="">Seleccionar tipo</option>
            <option value="Corriente">Corriente</option>
            <option value="Ahorro">Ahorro</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={data[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value, field.type)}
            placeholder={field.label}
            className={baseInput}
          />
        );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-[#a1a1a1] text-xs mb-1.5 font-medium">{field.label}</label>
          {renderField(field)}
          {errors[field.key] && (
            <p className="text-red-400 text-xs mt-1">{errors[field.key]}</p>
          )}
        </div>
      ))}

      {type === "otro" && (
        <div className="space-y-3">
          <p className="text-[#a1a1a1] text-xs font-medium">Campos adicionales</p>
          {customFields.map((cf, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input
                type="text"
                value={cf.label}
                onChange={(e) => updateCustomField(i, "label", e.target.value)}
                placeholder="Etiqueta"
                className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-3 py-2.5 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#737373]"
              />
              <input
                type="text"
                value={cf.value}
                onChange={(e) => updateCustomField(i, "value", e.target.value)}
                placeholder="Valor"
                className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-3 py-2.5 text-[#fafafa] text-sm focus:outline-none focus:border-[#ea580c] transition-colors placeholder-[#737373]"
              />
              <button
                type="button"
                onClick={() => removeCustomField(i)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#262626] hover:bg-red-500/20 transition-colors text-xs flex-shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomField}
            className="w-full py-2.5 rounded-xl border border-dashed border-[#262626] text-[#a1a1a1] text-sm hover:border-[#ea580c] hover:text-[#ea580c] transition-colors"
          >
            + Agregar campo
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid()}
        className="w-full py-3.5 rounded-2xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#fb923c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-6"
      >
        Guardar
      </button>
    </form>
  );
}
