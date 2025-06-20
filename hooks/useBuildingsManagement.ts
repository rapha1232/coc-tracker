import { Building } from "@prisma/client";
import { useCallback } from "react";

export function useBuildingsManagement(
  onBuildingsUpdate?: (buildings: Building[]) => void
) {
  const fetchBuildings = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/buildings/get");
      if (!res.ok) throw new Error("Failed to fetch buildings");
      const data = await res.json();
      if (onBuildingsUpdate) onBuildingsUpdate(data);
    } catch (e) {
      console.log("Error fetching buildings:", e);
    }
  }, [onBuildingsUpdate]);

  return { fetchBuildings };
}
