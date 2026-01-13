import axios from "axios";
import { initSolodbComponents } from "@jield/solodb-react-components";

type RuntimeConfig = {
  serverUri: string;
};

const cfg: RuntimeConfig = {
  serverUri: "",
};

export function initConfig(partial: Partial<RuntimeConfig>) {
  initSolodbComponents({
    serverUri: partial.serverUri,
  });
  if (partial.serverUri !== undefined) cfg.serverUri = partial.serverUri;
  if (cfg.serverUri) axios.defaults.baseURL = getServerUri();
}

export function getServerUri() {
  return cfg.serverUri + "/api";
}
