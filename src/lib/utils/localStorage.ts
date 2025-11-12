const isBrowser = typeof window !== 'undefined';

export const getItem = <T>(key: string): T | null => {
  if (!isBrowser) return null;

  const raw = window.localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  if (!isBrowser) return;

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string): void => {
  if (!isBrowser) return;

  window.localStorage.removeItem(key);
};
