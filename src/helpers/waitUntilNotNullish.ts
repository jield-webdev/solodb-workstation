/*
 * Wait until the value is not null or undefined
*/
export async function waitUntilNotNullish<T>(
  getter: () => T | null | undefined,
  { ttlMs = 5000, intervalMs = 50 }: { ttlMs?: number; intervalMs?: number } = {}
): Promise<T> {
  const start = Date.now();

  return new Promise<T>((resolve, reject) => {
    const check = () => {
      const value = getter();

      if (!(value === null || value === undefined)) {
        resolve(value);
        return;
      }

      if (Date.now() - start >= ttlMs) {
        reject(new Error("Timeout waiting for value"));
        return;
      }

      setTimeout(check, intervalMs);
    };

    check();
  });
}
