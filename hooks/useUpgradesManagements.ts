import { useCallback, useState } from "react";
import { Upgrade } from "../types/upgrades";

export function useUpgradesManagement(initialUpgrades: Upgrade[] = []) {
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpgrades = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/buildings/upgrades");
      if (!res.ok) throw new Error("Failed to fetch upgrades");
      const data = await res.json();
      setUpgrades(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelUpgrade = useCallback(
    async (upgradeId: string): Promise<void> => {
      setError(null);
      try {
        await fetch("/api/buildings/upgrades", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ upgradeId }),
        });
        await fetchUpgrades();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [fetchUpgrades]
  );

  const completeUpgrade = useCallback(
    async (upgradeId: string): Promise<void> => {
      setError(null);
      try {
        await fetch("/api/buildings/upgrades", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ upgradeId, force: true }),
        });
        await fetchUpgrades();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [fetchUpgrades]
  );

  return {
    upgrades,
    loading,
    error,
    fetchUpgrades,
    cancelUpgrade,
    completeUpgrade,
    setUpgrades,
  };
}
