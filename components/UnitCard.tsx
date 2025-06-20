import { HeroEquipment, Main, Spell, Troop } from "@/types";
import { getMaxLevel } from "coc-info";
import Image from "next/image";
import LevelBar from "./LevelBar";

const SpellCard = ({ spell }: { spell: Spell }) => {
  const sml = getMaxLevel(spell.name, 13);
  const isComplete = sml && spell.level === sml;

  return (
    <div
      key={spell.name}
      className={`${
        isComplete
          ? "bg-gradient-to-br from-green-900/20 to-gray-900/50 border-green-900/30 hover:border-green-500/50"
          : "bg-gradient-to-br from-amber-900/20 to-gray-900/50 border-amber-900/30 hover:border-amber-500/50"
      } p-3 rounded-md border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-900/20`}
    >
      <div className="flex justify-between items-center mb-2">
        <Image
          src={`/images/spell/${spell.name}.png`}
          alt={spell.name}
          width={50}
          height={50}
          className="w-8 h-8 m-2"
        />
        <span className="font-medium text-sm text-purple-200">
          {spell.name}
        </span>
        <span
          className={`font-semibold ${
            isComplete ? "text-green-500" : "text-amber-400"
          }`}
        >
          Lvl {spell.level}/{sml || 0}
        </span>
      </div>
      <LevelBar level={spell.level} maxLevel={sml || 0} />
    </div>
  );
};

const TroopCard = ({
  troop,
  playerData,
}: {
  troop: Troop;
  playerData: Main;
}) => {
  const troopMaxLevelForTh =
    getMaxLevel(troop.name, playerData.townHallLevel) || 0;
  const isComplete = troopMaxLevelForTh && troop.level === troopMaxLevelForTh;

  return (
    <div
      key={troop.name}
      className={`${
        isComplete
          ? "bg-gradient-to-br from-green-900/20 to-gray-900/50 border-green-900/30 hover:border-green-500/50"
          : "bg-gradient-to-br from-amber-900/20 to-gray-900/50 border-amber-900/30 hover:border-amber-500/50"
      } p-3 rounded-md border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-900/20`}
    >
      <div className="flex justify-between items-center mb-2">
        <Image
          src={`/images/troop/${troop.name}.webp`}
          alt={troop.name}
          width={50}
          height={50}
          className="w-8 h-8 m-2"
        />
        <span className="font-medium text-sm text-purple-200">
          {troop.name}
        </span>
        <span
          className={`font-semibold ${
            isComplete ? "text-green-500" : "text-amber-400"
          }`}
        >
          Lvl {troop.level}/{troopMaxLevelForTh}
        </span>
      </div>
      <LevelBar level={troop.level} maxLevel={troopMaxLevelForTh || 0} />
    </div>
  );
};

const EquipmentCard = ({
  equipment,
  isLocked = false,
}: {
  equipment: HeroEquipment;
  isLocked?: boolean;
}) => {
  return (
    <div
      className={`bg-gray-800/70 p-3 rounded-md transition-colors ${
        isLocked
          ? "border border-gray-700"
          : "hover:bg-gray-700/50 border border-purple-800/50"
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <Image
          src={`/images/equipment/${equipment.name}.png`}
          alt={equipment.name}
          width={50}
          height={50}
          className="w-8 h-8 m-2"
        />
        <span
          className={`font-medium ${
            isLocked ? "text-gray-500" : "text-purple-200"
          }`}
        >
          {equipment.name}
        </span>
        {!isLocked && (
          <span className="font-semibold text-purple-400">
            Lvl {equipment.level}/{equipment.maxLevel}
          </span>
        )}
        {isLocked && <span className="text-xs text-gray-500">Locked</span>}
      </div>
      {!isLocked && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full"
            style={{
              width: `${(equipment.level / equipment.maxLevel) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const SiegeCard = ({
  siege,
  playerData,
}: {
  siege: Troop;
  playerData: Main;
}) => {
  const troopMaxLevelForTh =
    getMaxLevel(siege.name, playerData.townHallLevel) || 0;
  const isComplete = troopMaxLevelForTh && siege.level === troopMaxLevelForTh;

  return (
    <div
      key={siege.name}
      className={`${
        isComplete
          ? "bg-gradient-to-br from-green-900/20 to-gray-900/50 border-green-900/30 hover:border-green-500/50"
          : "bg-gradient-to-br from-amber-900/20 to-gray-900/50 border-amber-900/30 hover:border-amber-500/50"
      } p-3 rounded-md border backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-900/20`}
    >
      <div className="flex justify-between items-center mb-2">
        <Image
          src={`/images/troop/${siege.name}.png`}
          alt={siege.name}
          width={50}
          height={50}
          className="w-8 h-8 m-2"
        />
        <span className="font-medium text-sm text-purple-200">
          {siege.name}
        </span>
        <span
          className={`font-semibold ${
            isComplete ? "text-green-500" : "text-amber-400"
          }`}
        >
          Lvl {siege.level}/{troopMaxLevelForTh}
        </span>
      </div>
      <LevelBar level={siege.level} maxLevel={troopMaxLevelForTh || 0} />
    </div>
  );
};

export { EquipmentCard, SiegeCard, SpellCard, TroopCard };
