import { entityNames, getCount, getMaxLevel, getType } from "coc-info";

export type BuildingCategory =
  | "defense"
  | "resource"
  | "army"
  | "trap"
  | "walls";

export interface Building {
  name: string;
  maxLevel: number;
  category: BuildingCategory;
}

// Returns an array of individual building instances for a given TH level
export const getBuildingsForTH = (townhallLevel: number): Building[] => {
  return entityNames
    .filter((name) => {
      const type = getType(name);
      return (
        type && ["defense", "resource", "army", "trap", "walls"].includes(type)
      );
    })
    .flatMap((name) => {
      const type = getType(name) as BuildingCategory;
      const count = getCount(name, townhallLevel) || 0;
      const maxLevel = getMaxLevel(name, townhallLevel) || 0;
      // Create an array of individual building objects
      return Array.from({ length: count }, () => ({
        name,
        maxLevel,
        category: type,
      }));
    });
};
