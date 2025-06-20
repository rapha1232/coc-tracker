import { Main } from "@/types";
import { Building as PrismaBuilding } from "@prisma/client";
import { getCost, getMaxLevel, getTime } from "coc-info";
import Image from "next/image";
import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface BuildingStatsProps {
  buildings: PrismaBuilding[];
  playerData: Main;
}

function formatTime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  return `${d > 0 ? `${d}d ` : ""}${h}h`;
}

export default function BuildingStats({ buildings, playerData }: BuildingStatsProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  // Group buildings by name
  const buildingsByName = buildings.reduce((acc, building) => {
    if (!acc[building.name]) acc[building.name] = [];
    acc[building.name].push(building);
    return acc;
  }, {} as Record<string, PrismaBuilding[]>);

  // Filter out fully completed building groups if showCompleted is false
  const filteredEntries = Object.entries(buildingsByName).filter(([name, group]) => {
    const maxLevel = getMaxLevel(name, playerData.townHallLevel) || 0;
    if (showCompleted) return true;
    // Only hide if all instances are maxed
    return group.some(b => b.level < maxLevel);
  });

  return (
    <div className="space-y-10">
      <div className="flex items-center mb-2 gap-2">
        <Switch
          id="show/hide"
          checked={showCompleted}
          onCheckedChange={e => setShowCompleted(e.valueOf())}
          className="data-[state=unchecked]:bg-gray-900/80 data-[state=checked]:bg-purple-600 border border-purple-800"
        />
        <Label htmlFor="show/hide">Show completed</Label>
      </div>
      {filteredEntries.map(([name, group]) => {
        const maxLevel = getMaxLevel(name, playerData.townHallLevel) || 0;
        const imageSrc = `/images/${group[0].category}/${name}/${name}_${group[0].level}.png`;
        // Calculate totals for this building type
        let totalCost = 0;
        let totalTime = 0;
        group.forEach((b) => {
          for (let lvl = b.level + 1; lvl <= maxLevel; lvl++) {
            totalCost += getCost(name, lvl) || 0;
            totalTime += getTime(name, lvl) || 0;
          }
        });
        return (
          <div key={name} className="bg-gray-900/80 rounded-xl p-4 border border-purple-900/30">
            <div className="flex items-center gap-6 mb-4">
              <div className="flex flex-col items-center min-w-[120px]">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={64}
                  height={64}
                  className="object-contain w-16 h-16"
                />
                <span className="text-lg font-semibold text-purple-200 mt-2">{name}</span>
                {/* Totals section under image */}
                <div className="mt-3 bg-gray-800/80 rounded-lg px-3 py-2 text-center text-xs text-purple-300 w-full">
                  <div className="font-bold text-purple-200 mb-1">Totals</div>
                  <div className="text-yellow-300 font-bold text-base">
                    {totalCost > 0 ? `${(totalCost / 1_000_000).toFixed(1)}M` : "-"}
                  </div>
                  <div className="text-purple-400 mt-1">
                    {totalTime > 0 ? formatTime(totalTime) : "-"}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2 table-fixed">
                  <colgroup>
                    <col style={{ width: '120px' }} />
                    <col style={{ width: '80px' }} />
                    <col style={{ minWidth: '200px', maxWidth: '320px' }} />
                  </colgroup>
                  <thead>
                    <tr className="text-purple-400 text-sm">
                      <th className="px-2 py-1 w-[120px]">Building</th>
                      <th className="px-2 py-1 w-[80px]">Level</th>
                      <th className="px-2 py-1 min-w-[200px] max-w-[320px]">Upgrades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((b, idx) => {
                      const upgrades = [] as { lvl: number; cost: number; time: number }[];
                      for (let lvl = b.level + 1; lvl <= maxLevel; lvl++) {
                        upgrades.push({
                          lvl,
                          cost: getCost(name, lvl) || 0,
                          time: getTime(name, lvl) || 0,
                        });
                      }
                      return (
                        <tr key={idx} className="bg-gray-800/70 hover:bg-gray-800/90 rounded-lg">
                          <td className="px-2 py-2 text-purple-200 font-medium w-[120px] truncate">
                            {name}
                          </td>
                          <td className="px-2 py-2 text-purple-200 w-[80px]">
                            {b.level}/{maxLevel}
                          </td>
                          <td className="px-2 py-2 min-w-[200px] max-w-[320px]">
                            {upgrades.length === 0 ? (
                              <span className="text-green-400">Max</span>
                            ) : (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 max-w-xs">
                                {upgrades.map((u, i) => (
                                  <div
                                    key={i}
                                    className="bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded text-[10px] flex flex-col items-start min-w-0"
                                    style={{ minWidth: 0 }}
                                  >
                                    <span className="font-semibold whitespace-nowrap">Lvl {u.lvl}</span>
                                    <span className="whitespace-nowrap">{(u.cost / 1_000_000).toFixed(1)}M</span>
                                    <span className="text-purple-300 whitespace-nowrap">{formatTime(u.time)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
