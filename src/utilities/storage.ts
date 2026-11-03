let available = true;
const listeners = new Set<() => void>();
export const storageSnapshot = () => available;
export const subscribeStorage = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
function reportAvailability(next: boolean) {
  if (available === next) return;
  available = next;
  listeners.forEach((listener) => listener());
}
export function readStorage(key: string, fallback: unknown = null): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    reportAvailability(true);
    return true;
  } catch {
    reportAvailability(false);
    return false;
  }
}
