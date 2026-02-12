export function validatePhone(phone) {
  const clean = phone.replace(/\D/g, "");
  return /^04\d{9}$/.test(clean);
}

export function validateCedula(cedula) {
  return /^\d{5,10}$/.test(cedula.replace(/\D/g, ""));
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateAccountNumber(account) {
  return /^\d{20}$/.test(account.replace(/\D/g, ""));
}

export function validateRequired(value) {
  return value && value.trim().length > 0;
}

export function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 4) return digits;
  return digits.slice(0, 4) + "-" + digits.slice(4);
}

export function formatAccountNumber(value) {
  return value.replace(/\D/g, "").slice(0, 20);
}

export function formatCedula(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}
