import { Main, Troop } from "@/types";
import { getMaxLevel } from "coc-info";
import { useState } from "react";
import { TroopCard } from "../UnitCard";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface TroopsTabProps {
  troops: Troop[];
  playerData: Main;
}

export default function TroopsTab({ troops, playerData }: TroopsTabProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  const completedTroops = troops.filter((troop) => {
    const maxLevel = getMaxLevel(troop.name, playerData.townHallLevel) || 0;
    return troop.level === maxLevel;
  });

  const inProgressTroops = troops.filter((troop) => {
    const maxLevel = getMaxLevel(troop.name, playerData.townHallLevel) || 0;
    return troop.level < maxLevel;
  });

  // Filtered list based on checkbox
  const visibleCompleted = showCompleted ? completedTroops : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2 gap-2">
        <Switch
          id="show/hide"
          checked={showCompleted}
          onCheckedChange={e => setShowCompleted(e.valueOf())}
          className="data-[state=unchecked]:bg-gray-900/80 data-[state=checked]:bg-purple-600 border border-purple-800"
        />
        <Label htmlFor="show/hide">Show completed</Label>
      </div>
      {visibleCompleted.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Complete
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {visibleCompleted.map((troop) => (
              <TroopCard
                key={troop.name}
                troop={troop}
                playerData={playerData}
              />
            ))}
          </div>
        </div>
      )}
      {inProgressTroops.length > 0 && (
        <>
          {visibleCompleted.length > 0 && (
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-900/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-4 text-sm text-purple-400">
                  In Progress
                </span>
              </div>
            </div>
          )}
          <div>
            <h4 className="text-lg font-medium text-purple-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              In Progress
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {inProgressTroops.map((troop) => (
                <TroopCard
                  key={troop.name}
                  troop={troop}
                  playerData={playerData}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
