import { getCost, getMaxLevel, getTime } from "coc-info";

export function getTimeToMaxFromCurrent(
  name: string,
  currentLevel: number,
  townHallLevel: number
): number | null {
  const maxLevel = getMaxLevel(name, townHallLevel);
  let totalTime = 0;
  if (maxLevel === null || currentLevel >= maxLevel) return null;
  for (let level = currentLevel + 1; level <= maxLevel; level++) {
    const time = getTime(name, level);
    if (time === null) return null;
    totalTime += time;
  }
  return totalTime;
}

export function getCostToMaxFromCurrent(
  name: string,
  currentLevel: number,
  townHallLevel: number
): number | null {
  const maxLevel = getMaxLevel(name, townHallLevel);
  let totalCost = 0;
  if (maxLevel === null || currentLevel >= maxLevel) return null;
  for (let level = currentLevel + 1; level <= maxLevel; level++) {
    const cost = getCost(name, level);
    if (cost === null) return null;
    totalCost += cost;
  }
  return totalCost;
}

export function sortByCompletion(townHallLevel: number) {
  return (
    a: { name: string; level: number },
    b: { name: string; level: number }
  ) => {
    const aMaxLevel = getMaxLevel(a.name, townHallLevel) || 0;
    const bMaxLevel = getMaxLevel(b.name, townHallLevel) || 0;
    const aIsComplete = a.level === aMaxLevel;
    const bIsComplete = b.level === bMaxLevel;
    if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
    return aIsComplete ? -1 : 1;
  };
}
