import { TH13_BUILDINGS } from "@/constants/buildings";
import { Main } from "@/types";
import { Building as PrismaBuilding } from "@prisma/client";
import Image from "next/image";

interface BuildingStatsProps {
  buildings: PrismaBuilding[];
  playerData: Main;
}

interface ExtendedBuilding extends PrismaBuilding {
  maxLevel: number;
}

// Category order for display
const CATEGORY_ORDER = [
  "Defense",
  "Resource",
  "Army",
  "Other",
  "Walls",
  "Trap",
];

// Category display names (for UI)
const CATEGORY_NAMES: Record<string, string> = {
  Defense: "Defenses",
  Resource: "Resources",
  Army: "Army",
  Other: "Others",
  Walls: "Walls",
  Trap: "Traps",
};

export default function BuildingStats({
  buildings,
  playerData,
}: BuildingStatsProps) {
  // Group buildings by category first
  const buildingsByCategory = buildings.reduce((acc, building) => {
    const category = building.category || "Other";
    if (!acc[category]) {
      acc[category] = new Map();
    }
    
    const categoryMap = acc[category];
    // For each building name, maintain an array of instances
    if (!categoryMap.has(building.name)) {
      categoryMap.set(building.name, []);
    }
    const buildingArray = categoryMap.get(building.name);
    if (buildingArray) {
      // Find the max level for this building from constants
      const maxLevel = TH13_BUILDINGS.find(b => b.name === building.name)?.maxLevel || building.level;
      buildingArray.push({
        ...building,
        maxLevel,
      } as ExtendedBuilding);
    }
    return acc;
  }, {} as Record<string, Map<string, ExtendedBuilding[]>>);

  // Sort buildings within each category by name
  Object.values(buildingsByCategory).forEach((categoryMap) => {
    // Convert Map entries to array and sort by name
    const sortedEntries = Array.from(categoryMap.entries()).sort((a, b) => 
      a[0].localeCompare(b[0])
    );
    // Clear the map and re-insert in sorted order
    categoryMap.clear();
    sortedEntries.forEach(([name, buildings]) => {
      categoryMap.set(name, buildings);
    });
  });

  return (
    <div className="space-y-8">
      {CATEGORY_ORDER.map((category) => {
        const categoryBuildings = buildingsByCategory[category];
        if (!categoryBuildings?.size) return null;

        return (
          <div key={category} className="space-y-6">
            <h3 className="text-xl font-semibold text-purple-300 border-b border-purple-900/30 pb-2">
              {CATEGORY_NAMES[category]}
            </h3>
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Complete</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from(categoryBuildings.entries()).map(([name, buildings]) => {
                  const maxLevelBuildings = buildings.filter(b => b.level === b.maxLevel);
                  if (maxLevelBuildings.length === 0) return null;

                  return (
                    <div
                      key={name}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-900/20"
                    >
                      <h3 className="text-lg font-semibold text-purple-200 mb-4 border-b border-purple-900/30 pb-2">
                        {name}
                      </h3>

                      <div className="space-y-3">
                        {maxLevelBuildings.map((building, idx) => (
                          <div
                            key={idx}
                            className="group relative flex items-center gap-4 bg-gray-800/70 hover:bg-gray-800/90 p-4 rounded-lg border border-purple-800/20 hover:border-purple-500/30 transition-all duration-300"
                          >
                            <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative w-14 h-14 flex items-center justify-center">
                                <Image
                                  src={
                                    name === "Giga Inferno"
                                      ? `/images/${
                                          CATEGORY_NAMES[building.category]
                                        }/${name}/${name}_${playerData.townHallLevel}L${
                                          building.level
                                        }.png`
                                      : `/images/${
                                          CATEGORY_NAMES[building.category]
                                        }/${name}/${name}_${building.isGeared ? "Geared_" : ""}${
                                          building.level
                                        }.png`
                                  }
                                  alt={`${name} Level ${building.level}`}
                                  width={48}
                                  height={48}
                                  className="object-contain w-auto h-auto max-w-full max-h-full transform group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            </div>
                            <div className="flex-grow flex items-center justify-between">
                              <div className="space-y-1">
                                <span className="text-purple-200 font-medium block">
                                  Level {building.level}
                                </span>
                                {building.isGeared && (
                                  <span className="text-xs text-purple-400/80 block">
                                    Geared Up
                                  </span>
                                )}
                              </div>
                              <div className="bg-purple-900/30 px-3 py-1.5 rounded-lg">
                                <span className="text-purple-300 font-medium">
                                  x{building.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">In Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from(categoryBuildings.entries()).map(([name, buildings]) => {
                  const inProgressBuildings = buildings.filter(b => b.level < b.maxLevel);
                  if (inProgressBuildings.length === 0) return null;

                  return (
                    <div
                      key={name}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-900/20"
                    >
                      <h3 className="text-lg font-semibold text-purple-200 mb-4 border-b border-purple-900/30 pb-2">
                        {name}
                      </h3>

                      <div className="space-y-3">
                        {inProgressBuildings.map((building, idx) => (
                          <div
                            key={idx}
                            className="group relative flex items-center gap-4 bg-gray-800/70 hover:bg-gray-800/90 p-4 rounded-lg border border-purple-800/20 hover:border-purple-500/30 transition-all duration-300"
                          >
                            <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative w-14 h-14 flex items-center justify-center">
                                <Image
                                  src={
                                    name === "Giga Inferno"
                                      ? `/images/${
                                          CATEGORY_NAMES[building.category]
                                        }/${name}/${name}_${playerData.townHallLevel}L${
                                          building.level
                                        }.png`
                                      : `/images/${
                                          CATEGORY_NAMES[building.category]
                                        }/${name}/${name}_${building.isGeared ? "Geared_" : ""}${
                                          building.level
                                        }.png`
                                  }
                                  alt={`${name} Level ${building.level}`}
                                  width={48}
                                  height={48}
                                  className="object-contain w-auto h-auto max-w-full max-h-full transform group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            </div>
                            <div className="flex-grow flex items-center justify-between">
                              <div className="space-y-1">
                                <span className="text-purple-200 font-medium block">
                                  Level {building.level}
                                </span>
                                {building.isGeared && (
                                  <span className="text-xs text-purple-400/80 block">
                                    Geared Up
                                  </span>
                                )}
                              </div>
                              <div className="bg-purple-900/30 px-3 py-1.5 rounded-lg">
                                <span className="text-purple-300 font-medium">
                                  x{building.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
