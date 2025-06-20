import { Main } from "@/types";
import { Building } from "@prisma/client";

export interface Upgrade {
  id: string;
  buildingId: string;
  startTime: string;
  endTime: string;
  building: Building;
}

export interface BuildersTabProps {
  buildings: Building[];
  playerData: Main;
  onBuildingsUpdate?: (buildings: Building[]) => void;
}

export type SortOrder = "lh" | "hl";

export interface UpgradableBuilding extends Building {
  _instance?: number;
}

export interface BuilderAvailability {
  totalBuilders: number;
  busyBuilders: number;
  freeBuilders: number;
}
