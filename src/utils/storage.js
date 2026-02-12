const METHODS_KEY = "paycopy_methods";

export function getMethods() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(METHODS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getMethodById(id) {
  const methods = getMethods();
  return methods.find((m) => m.id === id) || null;
}

export function saveMethod(method) {
  const methods = getMethods();
  if (method.id) {
    const index = methods.findIndex((m) => m.id === method.id);
    if (index >= 0) {
      methods[index] = method;
    } else {
      methods.push(method);
    }
  } else {
    method.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    methods.push(method);
  }
  localStorage.setItem(METHODS_KEY, JSON.stringify(methods));
  return method;
}

export function deleteMethod(id) {
  const methods = getMethods().filter((m) => m.id !== id);
  localStorage.setItem(METHODS_KEY, JSON.stringify(methods));
}
