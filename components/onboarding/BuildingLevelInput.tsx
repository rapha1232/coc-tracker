import { Building } from '@/constants/buildings';
import { useState } from 'react';

interface BuildingLevel {
  level: number;
  count: number;
  isGeared?: boolean;
}

interface BuildingLevelInputProps {
  building: Building;
  currentLevels: BuildingLevel[];
  onLevelChange: (buildingName: string, levels: BuildingLevel[]) => void;
}

export default function BuildingLevelInput({
  building,
  currentLevels,
  onLevelChange,
}: BuildingLevelInputProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLevel, setNewLevel] = useState('1');
  const [newCount, setNewCount] = useState('1');
  const [isGearUp, setIsGearUp] = useState(false);
  const remainingCount = building.count - currentLevels.reduce((sum, l) => sum + l.count, 0);
  const canGearUp = ['Cannon', 'Archer Tower', 'Mortar'].includes(building.name);
  const hasGearedUp = currentLevels.some(l => l.isGeared);

  const handleAddLevel = () => {
    const level = Math.min(Math.max(parseInt(newLevel) || 0, 0), building.maxLevel);
    const count = Math.min(Math.max(parseInt(newCount) || 0, 0), remainingCount);
    
    if (count > 0) {
      const newLevels = [...currentLevels];
      if (isGearUp) {
        newLevels.push({ level, count: 1, isGeared: true });
      } else {
        const existingIndex = newLevels.findIndex(l => l.level === level && !l.isGeared);
        if (existingIndex >= 0) {
          newLevels[existingIndex].count = Math.min(
            newLevels[existingIndex].count + count,
            building.count
          );
        } else {
          newLevels.push({ level, count });
        }
      }
      
      onLevelChange(building.name, newLevels);
      setNewLevel('1');
      setNewCount('1');
      setIsGearUp(false);
      setIsAdding(false);
    }
  };

  const handleRemoveLevel = (index: number) => {
    const newLevels = currentLevels.filter((_, i) => i !== index);
    onLevelChange(building.name, newLevels);
  };

  // Special handling for walls
  if (building.name === 'Wall') {
    return (
      <div className="bg-gray-900/80 p-4 rounded-lg border border-purple-800/50 hover:border-purple-700/50 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-purple-200">{building.name}</span>
          <span className="text-sm text-purple-400">
            {currentLevels.reduce((sum, l) => sum + l.count, 0)}/{building.count} placed
          </span>
        </div>
        <div className="space-y-3">
          {Array.from({ length: building.maxLevel }, (_, i) => i + 1).map(level => {
            const wallCount = currentLevels.find(l => l.level === level)?.count || 0;
            return (
              <div key={level} className="flex items-center gap-3">
                <span className="text-sm text-purple-300 w-16">Level {level}</span>
                <input
                  type="number"
                  value={wallCount}
                  onChange={(e) => {
                    const count = Math.min(
                      Math.max(0, parseInt(e.target.value) || 0),
                      building.count - currentLevels.reduce((sum, l) => l.level !== level ? sum + l.count : sum, 0)
                    );
                    const newLevels = [...currentLevels.filter(l => l.level !== level)];
                    if (count > 0) {
                      newLevels.push({ level, count });
                    }
                    onLevelChange(building.name, newLevels);
                  }}
                  min="0"
                  max={building.count}
                  className="w-24 px-2 py-1 bg-gray-800/70 border border-purple-700 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${level === building.maxLevel ? 'bg-green-500' : 'bg-purple-600'}`}
                    style={{ width: `${(wallCount / building.count) * 100}%` }}
                  />
                </div>
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
          {currentLevels.reduce((sum, l) => sum + l.count, 0)}/{building.count} placed
        </span>
      </div>

      {currentLevels.length > 0 && (
        <div className="mb-4 space-y-2">
          {currentLevels.map((levelInfo, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-800/50 p-2 rounded">
              <span className="text-purple-300">
                Level {levelInfo.level} {levelInfo.isGeared ? '(Geared Up)' : ''}
              </span>
              <span className="text-purple-400">×{levelInfo.count}</span>
              <button
                onClick={() => handleRemoveLevel(index)}
                className="ml-auto text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {remainingCount > 0 && (
        <div className="space-y-3">
          {isAdding ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <div>
                  <label className="block text-sm text-purple-400 mb-1">Level</label>
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
                    <label className="block text-sm text-purple-400 mb-1">Count</label>
                    <input
                      type="number"
                      value={newCount}
                      onChange={(e) => setNewCount(e.target.value)}
                      min="1"
                      max={remainingCount}
                      className="w-20 px-2 py-1 bg-gray-800/70 border border-purple-700 rounded text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}
              </div>
              {canGearUp && !hasGearedUp && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="gearUp"
                    checked={isGearUp}
                    onChange={(e) => {
                      setIsGearUp(e.target.checked);
                      if (e.target.checked) {
                        setNewCount('1');
                      }
                    }}
                    className="rounded bg-gray-800/70 border-purple-700 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="gearUp" className="text-sm text-purple-300">
                    Gear Up this building
                  </label>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleAddLevel}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setIsGearUp(false);
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-purple-200 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
            >
              Add Level
            </button>
          )}
        </div>
      )}
    </div>
  );
} 