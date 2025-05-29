import { TH13_LABS } from "@/constants/buildings";
import { HeroEquipment, Spell, Troop } from "@/types";
import Image from "next/image";
import LevelBar from "./LevelBar";

const SpellCard = ({ spell }: { spell: Spell }) => {
  const spellMaxLevelForTh = TH13_LABS.find(
    (s) => s.name === spell.name
  )?.maxLevel;
  return (
    <div
      key={spell.name}
      className="bg-gray-800/70 p-3 rounded-md hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex justify-between items-center mb-1">
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
            spellMaxLevelForTh && spell.level / spellMaxLevelForTh === 1
              ? "text-green-500"
              : "text-purple-400"
          }`}
        >
          Lvl {spell.level}/{spellMaxLevelForTh}
        </span>
      </div>
      <LevelBar level={spell.level} maxLevel={spellMaxLevelForTh || 0} />
    </div>
  );
};

const TroopCard = ({ troop }: { troop: Troop }) => {
  const troopMaxLevelForTh = TH13_LABS.find(
    (t) => t.name === troop.name
  )?.maxLevel;
  return (
    <div
      key={troop.name}
      className="bg-gray-800/70 p-3 rounded-md hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex justify-between items-center mb-1">
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
            troopMaxLevelForTh && troop.level / troopMaxLevelForTh === 1
              ? "text-green-500"
              : "text-purple-400"
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

const SiegeCard = ({ siege }: { siege: Troop }) => {
  const troopMaxLevelForTh = TH13_LABS.find(
    (t) => t.name === siege.name
  )?.maxLevel;
  return (
    <div
      key={siege.name}
      className="bg-gray-800/70 p-3 rounded-md hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex justify-between items-center mb-1">
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
            troopMaxLevelForTh && siege.level / siege.maxLevel === 1
              ? "text-green-500"
              : "text-purple-400"
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
