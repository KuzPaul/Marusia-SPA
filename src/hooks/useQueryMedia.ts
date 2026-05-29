import { useSyncExternalStore } from "react";

const getSnapshot = (pattern: string) => window.matchMedia(pattern).matches;

const subscribe = (pattern: string, onChange: () => void) => {
  const media = window.matchMedia(pattern);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export const useQueryMedia = (pattern: string): boolean => {
  return useSyncExternalStore(
    (onChange) => subscribe(pattern, onChange),
    () => getSnapshot(pattern),
    () => false,
  );
};
