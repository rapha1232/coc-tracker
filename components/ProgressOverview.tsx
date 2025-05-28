import { TH13_BUILDINGS, TH13_HEROES, TH13_LABS } from "@/constants/buildings";
import { Main } from "@/types";
import { Building } from "@prisma/client";

interface ProgressOverviewProps {
  buildings: Building[];
  playerData: Main;
}

export default function ProgressOverview({ buildings, playerData }: ProgressOverviewProps) {
  // Calculate building progress (excluding walls)
  const buildingProgress = buildings
    .filter(b => b.category !== "Walls" && b.category !== "Traps")
    .reduce((acc, building) => {
      return acc + (building.level * building.count);
    }, 0);

  const totalBuildingLevels = buildings
    .filter(b => b.category !== "Walls" && b.category !== "Traps")
    .reduce((acc, building) => {
      const buildingInfo = TH13_BUILDINGS.find(b => b.name === building.name);
      if (buildingInfo) {
        return acc + (buildingInfo.maxLevel * buildingInfo.count);
      }
      return acc;
    }, 0);

  const buildingPercentage = totalBuildingLevels > 0 ? (buildingProgress / totalBuildingLevels) * 100 : 0;

  // Calculate lab progress (troops, spells)
  const labUnits = [...playerData.troops, ...playerData.spells]
    .filter(unit => 
      unit.village === "home" && 
      TH13_LABS.some(lab => lab.name === unit.name)
    );

  const labProgress = labUnits.reduce((acc, unit) => {
    return acc + unit.level;
  }, 0);

  const labTotal = labUnits.reduce((acc, unit) => {
    const labInfo = TH13_LABS.find(l => l.name === unit.name);
    if (labInfo) {
      return acc + labInfo.maxLevel;
    }
    return acc;
  }, 0);

  const labPercentage = labTotal > 0 ? (labProgress / labTotal) * 100 : 0;

  // Calculate walls progress
  const walls = buildings.filter(b => b.name === "Wall");
  const wallMaxLevel = TH13_BUILDINGS.find(b => b.name === "Wall")?.maxLevel || 1;

  const wallProgress = walls.reduce((acc, wall) => {
    return acc + wall.level * wall.count;
  }, 0);

  const wallTotal = walls.reduce((acc, wall) => {
    return acc + wallMaxLevel * wall.count;
  }, 0);

  const wallPercentage = wallTotal > 0 ? (wallProgress / wallTotal) * 100 : 0;

  // Calculate heroes progress
  const homeHeroes = playerData.heroes.filter(hero => hero.village === "home");
  
  const heroProgress = homeHeroes.reduce((acc, hero) => {
    return acc + hero.level;
  }, 0);

  const heroTotal = homeHeroes.reduce((acc, hero) => {
    return acc + (TH13_HEROES.find(h => h.name === hero.name)?.maxLevel || 0);
  }, 0);

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
              style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 