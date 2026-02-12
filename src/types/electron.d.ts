export {};

declare global {
  interface Window {
    electronAPI: {
      isElectronActive: () => Promise<boolean>;
      getRefreshToken: () => Promise<string | null>;
      setRefreshToken: (token: string) => Promise<void>;
    };
  }
}
