// All types in this file are now provided by coc-info. Use coc-info types directly.
// Example:
// import type { EntityType, ResourceType, GearUpData, DataStructure } from "coc-info";

export interface Building {
  name: string;
  maxLevel: number;
  category: "defense" | "resource" | "army" | "trap" | "other" | "walls";
}

export type BuildingCategory =
  | "defense"
  | "resource"
  | "army"
  | "trap"
  | "walls";

export type LabCategory = "troop" | "spell" | "siege";
export type LabUses = "elixir" | "dark elixir";

export interface Lab {
  name: string;
  maxLevel: number;
  category: LabCategory;
  uses: LabUses;
}

export interface Hero {
  name: string;
  maxLevel: number;
  category: "hero";
  uses: LabUses;
}