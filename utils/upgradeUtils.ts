import { Building } from "@prisma/client";
import { getTime } from "coc-info";
import { BuilderAvailability, Upgrade } from "../types/upgrades";

export async function startBuildingUpgrade(
  buildingId: string,
  buildingName: string,
  level: number
): Promise<void> {
  const duration = getTime(buildingName, level + 1) || 0;
  if (!duration) throw new Error("No upgrade available for this level");

  const res = await fetch("/api/buildings/upgrades", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buildingId, duration }),
  });

  if (!res.ok) throw new Error(await res.text());
}

export function getBuilderAvailability(
  buildings: Building[],
  upgrades: Upgrade[]
): BuilderAvailability {
  // Count the number of Builder Hut rows
  const totalBuilders = buildings.filter((b) => b.name === "Builder's Hut").length;
  const busyBuilders = upgrades.length;
  return {
    totalBuilders,
    busyBuilders,
    freeBuilders: Math.max(0, totalBuilders - busyBuilders),
  };
}

export function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return "Done";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0 || d > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}
