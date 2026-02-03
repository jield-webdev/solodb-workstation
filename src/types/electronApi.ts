export interface ElectronAPI {
  isElectronActive: () => Promise<boolean>;
  getRefreshToken: () => Promise<string | null>;
  setRefreshToken: (token: string) => Promise<void>;
}
