import {
  EncryptedConfigInterface,
  getConfiguration,
  saveConfiguration,
} from "./encryptedConfig";

export async function getRefreshToken(): Promise<string | null> {
  const conf = await getConfiguration();
  return conf?.refresh_token ?? null;
}

export async function setRefreshToken(token: string) {
  let conf = (await getConfiguration()) ?? ({} as EncryptedConfigInterface);
  conf.refresh_token = token;
  saveConfiguration(conf);
}
