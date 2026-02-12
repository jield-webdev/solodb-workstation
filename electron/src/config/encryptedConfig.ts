import {app, safeStorage} from "electron";
import * as path from "path";
import * as fs from "fs";

const CONF_FILE_NAME = "worksation.conf";

export interface EncryptedConfigInterface {
  refresh_token: string;
};

export async function saveConfiguration(conf: EncryptedConfigInterface) {
  const encryptedData = safeStorage.encryptString(JSON.stringify(conf));
  const filePath = path.join(app.getPath("userData"), CONF_FILE_NAME);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(filePath, encryptedData);
}

export async function getConfiguration(): Promise<EncryptedConfigInterface | null> {
  const filePath = path.join(app.getPath("userData"), CONF_FILE_NAME);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath);
    const parsedContent = JSON.parse(safeStorage.decryptString(content));
    return parsedContent;
  } catch (err) {
    console.error("Error reading refresh token:", err);
    return null;
  }
}
