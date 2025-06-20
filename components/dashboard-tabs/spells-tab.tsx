import { Main, Spell } from "@/types";
import { getMaxLevel } from "coc-info";
import { useState } from "react";
import { SpellCard } from "../UnitCard";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface SpellsTabProps {
  spells: Spell[];
  title?: string;
  playerData: Main;
}

export default function SpellsTab({
  spells,
  playerData,
  title,
}: SpellsTabProps) {
  const [showCompleted, setShowCompleted] = useState(true);
  const completedSpells = spells.filter((spell) => {
    const maxLevel = getMaxLevel(spell.name, playerData.townHallLevel) || 0;
    return spell.level === maxLevel;
  });
  const inProgressSpells = spells.filter((spell) => {
    const maxLevel = getMaxLevel(spell.name, playerData.townHallLevel) || 0;
    return spell.level < maxLevel;
  });
  // Filtered list based on checkbox
  const visibleCompleted = showCompleted ? completedSpells : [];

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
      <h3 className="text-lg font-medium text-purple-300 mb-3">{title}</h3>
      {visibleCompleted.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-purple-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Complete
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {visibleCompleted.map((spell) => (
              <SpellCard key={spell.name} spell={spell} />
            ))}
          </div>
        </div>
      )}
      {inProgressSpells.length > 0 && (
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
            <h4 className="text-md font-medium text-purple-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              In Progress
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {inProgressSpells.map((spell) => (
                <SpellCard key={spell.name} spell={spell} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
