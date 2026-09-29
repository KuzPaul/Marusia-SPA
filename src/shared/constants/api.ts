const SKILLBOX_API = "https://cinemaguide.skillbox.cc";

export function apiUrl(path: string): string {
  const override = import.meta.env.VITE_API_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (override) {
    return `${override.replace(/\/$/, "")}${normalized}`;
  }

  if (import.meta.env.DEV) {
    return `/api${normalized}`;
  }

  return `${SKILLBOX_API}${normalized}`;
}
