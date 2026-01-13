import axios from "axios";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { initSolodbComponents } from "@jield/solodb-react-components";

vi.mock("@jield/solodb-react-components", () => ({
  initSolodbComponents: vi.fn(),
}));

const initComponentsMock = vi.mocked(initSolodbComponents);

describe("runtimeConfig", () => {
  beforeEach(() => {
    vi.resetModules();
    initComponentsMock.mockClear();
    axios.defaults.baseURL = "";
  });

  it("builds the API server uri and configures axios", async () => {
    const { initConfig, getServerUri } = await import("./runtimeConfig");

    initConfig({ serverUri: "http://localhost:3000" });

    expect(getServerUri()).toBe("http://localhost:3000/api");
    expect(axios.defaults.baseURL).toBe("http://localhost:3000/api");
    expect(initComponentsMock).toHaveBeenCalledWith({
      serverUri: "http://localhost:3000",
    });
  });
});
