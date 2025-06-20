import { Main } from "@/types";
import { Building } from "@prisma/client";
import { getMaxLevel } from "coc-info";
import Image from "next/image";
import { useMemo } from "react";

const WallStats = ({
  playerData,
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
    let wallMaxLevel = getMaxLevel("Wall", playerData.townHallLevel);
    if (!wallMaxLevel) wallMaxLevel = 1;
    // Aggregate wall segments by level
    const levelCounts: Record<number, number> = {};
    walls.forEach((wall) => {
      levelCounts[wall.level] = (levelCounts[wall.level] || 0) + 1;
    });
    // Return array of { level, count, maxLevel }
    return Array.from({ length: wallMaxLevel }, (_, i) => {
      const level = i + 1;
      return {
        level,
        count: levelCounts[level] || 0,
        maxLevel: wallMaxLevel,
      };
    });
  }, [buildings, playerData.townHallLevel]);

  const completeWalls = wallData.filter(
    (w: { level: number; count: number; maxLevel: number }) =>
      w.level === w.maxLevel && w.count > 0
  );
  const incompleteWalls = wallData.filter(
    (w: { level: number; count: number; maxLevel: number }) =>
      w.level < w.maxLevel && w.count > 0
  );

  return (
    <div className="space-y-6">
      {completeWalls.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-3">Complete</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completeWalls.map(
              (wall: { level: number; count: number; maxLevel: number }) => (
                <div
                  key={wall.level}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`/images/walls/Wall/Wall_${wall.level}.png`}
                        alt={`Wall Level ${wall.level}`}
                        width={48}
                        height={48}
                        className="object-contain w-auto h-auto max-w-full max-h-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-200 font-medium">
                          Wall
                        </span>
                        <span className="text-purple-400">x{wall.count}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-300">
                          Level {wall.level}
                        </span>
                        <span className="text-purple-400/80">
                          Max: {wall.maxLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
      {incompleteWalls.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-3">
            In Progress
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incompleteWalls.map(
              (wall: { level: number; count: number; maxLevel: number }) => (
                <div
                  key={wall.level}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`/images/walls/Wall/Wall_${wall.level}.png`}
                        alt={`Wall Level ${wall.level}`}
                        width={48}
                        height={48}
                        className="object-contain w-auto h-auto max-w-full max-h-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-200 font-medium">
                          Wall
                        </span>
                        <span className="text-purple-400">x{wall.count}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-300">
                          Level {wall.level}
                        </span>
                        <span className="text-purple-400/80">
                          Max: {wall.maxLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WallStats;
