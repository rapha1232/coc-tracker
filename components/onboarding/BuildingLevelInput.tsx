import { BuildingCategory } from "@/types";
import { getCount } from "coc-info";
import { useEffect, useState } from "react";

interface BuildingLevelInputProps {
  building: {
    name: string;
    maxLevel: number;
    category: BuildingCategory;
  };
  currentInstances: {
    level: number;
    isGeared?: boolean;
  }[];
  onInstancesChange: (
    instances: {
      level: number;
      isGeared?: boolean;
    }[]
  ) => void;
  townhallLevel: number;
}

export default function BuildingLevelInput({
  building,
  currentInstances,
  onInstancesChange,
  townhallLevel,
}: BuildingLevelInputProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLevel, setNewLevel] = useState("1");
  const [newCount, setNewCount] = useState("1");
  const [isGearUp, setIsGearUp] = useState(false);

  const canGearUp = ["Cannon", "Archer Tower", "Mortar"].includes(
    building.name
  );
  const hasGearedUp = currentInstances.some((l) => l.isGeared);

  // Get max allowed for this building
  const maxCount = getCount(building.name, townhallLevel) || 0;
  const remaining = maxCount - currentInstances.length;
  const atMax = remaining <= 0;

  // Wall state hooks always declared
  const maxWallCount = getCount("Wall", townhallLevel) || 0;
  // Initialize wallCounts state: { [level]: count }
  const initialWallCounts = () => {
    const counts: Record<number, number> = {};
    for (let lvl = 1; lvl <= building.maxLevel; lvl++) {
      counts[lvl] = currentInstances.filter(w => w.level === lvl).length;
    }
    return counts;
  };
  const [wallCounts, setWallCounts] = useState<Record<number, number>>(initialWallCounts);

  // Keep parent in sync when wallCounts change
  useEffect(() => {
    const newWalls = Object.entries(wallCounts).flatMap(([level, count]) =>
      Array.from({ length: count }, () => ({ level: Number(level) }))
    );
    onInstancesChange(newWalls);
    // eslint-disable-next-line
  }, [wallCounts]);

  // When gear up is checked, always set count to 1
  const handleGearUpChange = (checked: boolean) => {
    setIsGearUp(checked);
    if (checked) setNewCount("1");
  };

  const handleAddInstance = () => {
    const level = Math.min(
      Math.max(parseInt(newLevel) || 1, 1),
      building.maxLevel
    );
    const count = isGearUp ? 1 : Math.min(Math.max(parseInt(newCount) || 1, 1), remaining);
    // Prevent adding more than one geared up instance
    if (isGearUp && hasGearedUp) return;
    // Add 'count' separate instances
    const newInstances = [
      ...currentInstances,
      ...Array.from({ length: count }, () => ({ level, isGeared: isGearUp })),
    ];
    onInstancesChange(newInstances);
    setNewLevel("1");
    setNewCount("1");
    setIsGearUp(false);
    setIsAdding(false);
  };

  const handleRemoveInstance = (index: number) => {
    const newInstances = currentInstances.filter((_, i) => i !== index);
    onInstancesChange(newInstances);
  };

  // Special handling for walls
  if (building.name === "Wall") {
    const totalPlaced = Object.values(wallCounts).reduce((a, b) => a + b, 0);
    const handleWallLevelChange = (level: number, value: number) => {
      // Clamp value so total does not exceed maxWallCount
      const otherTotal = totalPlaced - wallCounts[level];
      const allowed = Math.max(0, Math.min(value, maxWallCount - otherTotal));
      setWallCounts((prev) => ({ ...prev, [level]: allowed }));
    };
    return (
      <div className="bg-gray-900/80 p-4 rounded-lg border border-purple-800/50 hover:border-purple-700/50 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-purple-200">{building.name}</span>
          <span className="text-sm text-purple-400">
            {totalPlaced} / {maxWallCount} placed
          </span>
        </div>
        <div className="space-y-3">
          {Array.from({ length: building.maxLevel }, (_, i) => {
            const level = i + 1;
            return (
              <div key={level} className="flex items-center gap-3">
                <span className="text-sm text-purple-300 w-16">Level {level}</span>
                <input
                  type="number"
                  value={wallCounts[level] || 0}
                  onChange={e => handleWallLevelChange(level, Math.max(0, parseInt(e.target.value) || 0))}
                  min="0"
                  max={maxWallCount - (totalPlaced - (wallCounts[level] || 0))}
                  className="w-24 px-2 py-1 bg-gray-800/70 border border-purple-700 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="range"
                  value={wallCounts[level] || 0}
                  onChange={e => handleWallLevelChange(level, Number(e.target.value))}
                  min="0"
                  max={maxWallCount - (totalPlaced - (wallCounts[level] || 0))}
                  className="flex-1"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 p-4 rounded-lg border border-purple-800/50 hover:border-purple-700/50 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-purple-200">{building.name}</span>
        <span className="text-sm text-purple-400">
          {currentInstances.length} / {maxCount} placed
        </span>
      </div>

      {currentInstances.length > 0 && (
        <div className="mb-4 space-y-2">
          {currentInstances.map((instance, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-800/50 p-2 rounded"
            >
              <span className="text-purple-300">
                Level {instance.level} {instance.isGeared ? "(Geared Up)" : ""}
              </span>
              <button
                onClick={() => handleRemoveInstance(index)}
                className="ml-auto text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {isAdding ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div>
                <label className="block text-sm text-purple-400 mb-1">
                  Level
                </label>
                <input
                  type="number"
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  min="1"
                  max={building.maxLevel}
                  className="w-20 px-2 py-1 bg-gray-800/70 border border-purple-700 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {!isGearUp && (
                <div>
                  <label className="block text-sm text-purple-400 mb-1">
                    Count
                  </label>
                  <input
                    type="number"
                    value={newCount}
                    onChange={(e) => setNewCount(e.target.value)}
                    min="1"
                    max={remaining}
                    className="w-20 px-2 py-1 bg-gray-800/70 border border-purple-700 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={atMax}
                  />
                  <div className="text-xs text-purple-400 mt-1">
                    Remaining: {remaining}
                  </div>
                </div>
              )}
              {canGearUp && !hasGearedUp && (
                <div className="flex flex-col justify-end">
                  <label className="block text-sm text-purple-400 mb-1">
                    Gear Up
                  </label>
                  <input
                    type="checkbox"
                    checked={isGearUp}
                    onChange={(e) => handleGearUpChange(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddInstance}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-1 rounded"
                disabled={atMax || parseInt(newCount) > remaining}
              >
                Add
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-700 hover:bg-gray-600 text-purple-200 px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
            {atMax && (
              <div className="text-xs text-red-400 mt-1">
                You have reached the maximum allowed for this building.
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-purple-800 hover:bg-purple-700 text-purple-200 px-4 py-1 rounded"
            disabled={atMax}
          >
            Add Instance
          </button>
        )}
        {atMax && !isAdding && (
          <div className="text-xs text-red-400 mt-1">
            You have reached the maximum allowed for this building.
          </div>
        )}
      </div>
    </div>
  );
}
