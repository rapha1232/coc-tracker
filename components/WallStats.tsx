import { TH13_BUILDINGS } from "@/constants/buildings";
import { Main } from "@/types";
import { Building } from "@prisma/client";
import Image from "next/image";
import { useMemo } from "react";

interface ExtendedBuilding extends Building {
  maxLevel: number;
}

const WallStats = ({
  buildings,
}: {
  buildings: Building[];
  playerData: Main;
}) => {
  const wallData = useMemo(() => {
    // Get walls from buildings
    const walls = buildings.filter(
      (b) => b.category === "Wall" || b.name.toLowerCase().includes("wall")
    );

    // Get max level for walls from constants
    const wallMaxLevel = TH13_BUILDINGS.find(b => b.name === "Wall")?.maxLevel || 14;

    // Map the walls to include max level
    return walls.map((wall) => ({
      ...wall,
      maxLevel: wallMaxLevel,
    })) as ExtendedBuilding[];
  }, [buildings]);

  // Sort walls by completion status
  const sortedWalls = [...wallData].sort((a, b) => {
    const aIsComplete = a.level === a.maxLevel;
    const bIsComplete = b.level === b.maxLevel;
    if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
    return aIsComplete ? -1 : 1;
  });

  const completeWalls = sortedWalls.filter(wall => wall.level === wall.maxLevel);
  const incompleteWalls = sortedWalls.filter(wall => wall.level < wall.maxLevel);

  return (
    <div className="space-y-6">
      {completeWalls.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-3">Complete</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completeWalls.map((wall) => (
              <div
                key={wall.name}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={`/images/Walls/${wall.name}/${wall.name}_${wall.level}.png`}
                      alt={`${wall.name} Level ${wall.level}`}
                      width={48}
                      height={48}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-200 font-medium">{wall.name}</span>
                      <span className="text-purple-400">
                        x{wall.count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-purple-300">Level {wall.level}</span>
                      <span className="text-purple-400/80">Max: {wall.maxLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {incompleteWalls.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-3">In Progress</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incompleteWalls.map((wall) => (
              <div
                key={wall.name}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={`/images/walls/${wall.name}/${wall.name}_${wall.level}.png`}
                      alt={`${wall.name} Level ${wall.level}`}
                      width={48}
                      height={48}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-200 font-medium">{wall.name}</span>
                      <span className="text-purple-400">
                        x{wall.count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-purple-300">Level {wall.level}</span>
                      <span className="text-purple-400/80">Max: {wall.maxLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WallStats; 