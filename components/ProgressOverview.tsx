import { Main } from "@/types";
import { Building } from "@prisma/client";
import { getMaxLevel, getType } from "coc-info";

interface ProgressOverviewProps {
  buildings: Building[];
  playerData: Main;
}

export default function ProgressOverview({
  buildings,
  playerData,
}: ProgressOverviewProps) {
  const thLevel = playerData.townHallLevel;

  // Calculate building progress (excluding walls and traps)
  const { buildingProgress, totalBuildingLevels } = buildings.reduce(
    (acc, building) => {
      const type = getType(building.name);
      if (type === "Walls" || type === "Trap") {
        return acc;
      }
      const maxLevel = getMaxLevel(building.name, thLevel) || 0;
      return {
        buildingProgress: acc.buildingProgress + building.level,
        totalBuildingLevels: acc.totalBuildingLevels + maxLevel,
      };
    },
    { buildingProgress: 0, totalBuildingLevels: 0 }
  );

  const buildingPercentage = totalBuildingLevels > 0
    ? (buildingProgress / totalBuildingLevels) * 100
    : 0;

  // Calculate lab progress (troops and spells)
  const { labProgress, labTotal } = [...playerData.troops, ...playerData.spells]
    .filter((unit) => unit.village === "home")
    .reduce(
      (acc, unit) => {
        const maxLevel = getMaxLevel(unit.name, thLevel) || 0;
        if (maxLevel <= 0) return acc;

        return {
          labProgress: acc.labProgress + unit.level,
          labTotal: acc.labTotal + maxLevel,
        };
      },
      { labProgress: 0, labTotal: 0 }
    );

  const labPercentage = labTotal > 0 ? (labProgress / labTotal) * 100 : 0;

  // Calculate walls progress - FIXED VERSION
  const wallSegments = buildings.filter(
    (building) => getType(building.name) === "walls"
  );
  const { wallProgress, wallTotal } = wallSegments.reduce(
    (acc, wall) => {
      const maxLevel = getMaxLevel(wall.name, thLevel) || 1;
      return {
        wallProgress: acc.wallProgress + wall.level,
        wallTotal: acc.wallTotal + maxLevel,
      };
    },
    { wallProgress: 0, wallTotal: 0 }
  );

  const wallPercentage = wallTotal > 0 ? (wallProgress / wallTotal) * 100 : 50;

  // Calculate heroes progress
  const { heroProgress, heroTotal } = playerData.heroes
    .filter((hero) => hero.village === "home")
    .reduce(
      (acc, hero) => {
        const maxLevel = getMaxLevel(hero.name, thLevel) || 0;
        return {
          heroProgress: acc.heroProgress + hero.level,
          heroTotal: acc.heroTotal + maxLevel,
        };
      },
      { heroProgress: 0, heroTotal: 0 }
    );

  const heroPercentage = heroTotal > 0 ? (heroProgress / heroTotal) * 100 : 0;

  const progressItems = [
    {
      label: "Buildings",
      percentage: buildingPercentage,
      color: "from-blue-600 to-blue-400",
    },
    {
      label: "Laboratory",
      percentage: labPercentage,
      color: "from-purple-600 to-purple-400",
    },
    {
      label: "Walls",
      percentage: wallPercentage,
      color: "from-amber-600 to-amber-400",
    },
    {
      label: "Heroes",
      percentage: heroPercentage,
      color: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {progressItems.map((item) => (
        <div
          key={item.label}
          className="bg-gray-800/70 rounded-lg p-4 border border-purple-900/30"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200 font-medium">{item.label}</span>
            <span className="text-purple-300">
              {Math.min(100, Math.max(0, item.percentage)).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
              style={{
                width: `${Math.min(100, Math.max(0, item.percentage))}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
