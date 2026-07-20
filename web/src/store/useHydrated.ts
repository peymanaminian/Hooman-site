import { useSyncExternalStore } from "react";

type PersistApi = {
  onFinishHydration: (callback: () => void) => () => void;
  hasHydrated: () => boolean;
};

// Persisted (localStorage-backed) Zustand stores only have real data in the
// browser; this reports whether a store has finished reading localStorage so
// components can avoid a hydration mismatch between server- and client-rendered markup.
export function useHydrated(persistApi: PersistApi): boolean {
  return useSyncExternalStore(
    (callback) => persistApi.onFinishHydration(callback),
    () => persistApi.hasHydrated(),
    () => false
  );
}
