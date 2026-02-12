export function encodePayment(data) {
  const json = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePayment(encoded) {
  try {
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad) base64 += "=".repeat(4 - pad);
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function buildPaymentUrl(data) {
  const encoded = encodePayment(data);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://paycopy.app";
  return `${baseUrl}/p?d=${encoded}`;
}
