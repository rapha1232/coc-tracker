import { UpgradableBuilding, Upgrade } from "@/types/upgrades";
import { Building } from "@prisma/client";
import { getCost, getMaxLevel } from "coc-info";
import { useMemo } from "react";

export function useUpgradableBuildings(
  buildings: Building[],
  upgrades: Upgrade[],
  townHallLevel: number,
  search: string,
  typeFilter: string | null,
  sortOrder: "lh" | "hl"
): UpgradableBuilding[] {
  return useMemo(() => {
    // Get building IDs that are in progress
    const inProgressIds = new Set(upgrades.map((u) => u.buildingId));
    const upgradableBuildings = buildings
      .filter(
        (b) =>
          getMaxLevel(b.name, townHallLevel) !== b.level &&
          !inProgressIds.has(b.id) &&
          b.category !== "walls"
      );
    return upgradableBuildings
      .filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) &&
          (!typeFilter || b.category === typeFilter)
      )
      .sort((a, b) => {
        const costA = getCost(a.name, a.level + 1) ?? 0;
        const costB = getCost(b.name, b.level + 1) ?? 0;
        return sortOrder === "lh" ? costA - costB : costB - costA;
      });
  }, [buildings, upgrades, townHallLevel, search, typeFilter, sortOrder]);
}
