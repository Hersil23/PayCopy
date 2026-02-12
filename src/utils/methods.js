export const methodTypes = [
  { id: "pago_movil", name: "Pago Móvil", icon: "🏦", defaultCurrency: "Bs" },
  { id: "zelle", name: "Zelle", icon: "💵", defaultCurrency: "USD" },
  { id: "binance", name: "Binance Pay", icon: "🪙", defaultCurrency: "USDT" },
  { id: "transferencia", name: "Transferencia Bancaria", icon: "🏛️", defaultCurrency: "Bs" },
  { id: "otro", name: "Otro", icon: "📋", defaultCurrency: "USD" },
];

export const currencies = ["Bs", "USD", "EUR", "USDT"];

export function getMethodType(typeId) {
  return methodTypes.find((m) => m.id === typeId) || methodTypes[4];
}

export function getFieldsForType(typeId) {
  switch (typeId) {
    case "pago_movil":
      return [
        { key: "banco", label: "Banco", type: "bank_select", required: true },
        { key: "cedula_type", label: "Tipo", type: "cedula_prefix", required: true },
        { key: "cedula", label: "Cédula", type: "cedula", required: true },
        { key: "telefono", label: "Teléfono", type: "phone", required: true },
        { key: "titular", label: "Nombre del titular", type: "text", required: true },
      ];
    case "zelle":
      return [
        { key: "contacto", label: "Correo electrónico o teléfono", type: "text", required: true },
        { key: "titular", label: "Nombre del titular", type: "text", required: true },
      ];
    case "binance":
      return [
        { key: "contacto", label: "Correo, teléfono o Binance ID", type: "text", required: true },
        { key: "titular", label: "Nombre del titular", type: "text", required: true },
      ];
    case "transferencia":
      return [
        { key: "banco", label: "Banco", type: "bank_select", required: true },
        { key: "cuenta", label: "Número de cuenta (20 dígitos)", type: "account", required: true },
        { key: "tipo_cuenta", label: "Tipo de cuenta", type: "account_type", required: true },
        { key: "cedula_type", label: "Tipo", type: "cedula_prefix", required: true },
        { key: "cedula", label: "Cédula o RIF", type: "cedula", required: true },
        { key: "titular", label: "Nombre del titular", type: "text", required: true },
      ];
    case "otro":
      return [
        { key: "nombre_metodo", label: "Nombre del método", type: "text", required: true },
        { key: "titular", label: "Nombre del titular", type: "text", required: true },
      ];
    default:
      return [];
  }
}

export function getDisplayFields(typeId, data) {
  switch (typeId) {
    case "pago_movil":
      return [
        { label: "Banco", value: data.banco },
        { label: "Cédula", value: `${data.cedula_type || "V"}-${data.cedula}`, copyValue: data.cedula },
        { label: "Teléfono", value: data.telefono, copyValue: (data.telefono || "").replace(/-/g, "") },
      ];
    case "zelle":
      return [
        { label: "Correo / Teléfono", value: data.contacto },
      ];
    case "binance":
      return [
        { label: "Contacto / ID", value: data.contacto },
      ];
    case "transferencia":
      return [
        { label: "Banco", value: data.banco },
        { label: "Cuenta", value: data.cuenta },
        { label: "Tipo de cuenta", value: data.tipo_cuenta },
        { label: "Cédula / RIF", value: `${data.cedula_type || "V"}-${data.cedula}`, copyValue: data.cedula },
      ];
    case "otro": {
      const fields = [{ label: "Método", value: data.nombre_metodo }];
      if (data.custom_fields) {
        data.custom_fields.forEach((f) => {
          fields.push({ label: f.label, value: f.value });
        });
      }
      return fields;
    }
    default:
      return [];
  }
}
