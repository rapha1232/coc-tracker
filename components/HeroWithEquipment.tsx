import { TH13_HEROES } from "@/constants/buildings";
import { HeroEquipment } from "@/types";
import Image from "next/image";
import LevelBar from "./LevelBar";
import { UnitCard } from "./UnitCard";

const HeroWithEquipment = ({ hero }: { hero: HeroEquipment }) => {
  const heroMaxLevelForTh = TH13_HEROES.find((h) => h.name === hero.name)?.maxLevel;
  return (
    <div
      key={hero.name}
      className="bg-gray-800/70 p-4 rounded-md hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0">
          <Image
            src={`/images/hero/${hero.name}.png`}
            alt={hero.name}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-medium text-purple-200 text-lg">
              {hero.name}
            </span>
            <span
          className={`font-semibold ${
            heroMaxLevelForTh && hero.level / heroMaxLevelForTh === 1
              ? "text-green-500"
              : "text-purple-400"
          }`}
        >
              Lvl {hero.level}/{heroMaxLevelForTh}
            </span>
          </div>
          <LevelBar level={hero.level} maxLevel={heroMaxLevelForTh || 0} />
        </div>
      </div>

      {hero.equipment && hero.equipment.length > 0 && (
        <div className="mt-3 pl-3 border-l-2 border-purple-800/50">
          <h4 className="text-sm font-medium text-purple-300 mb-2">
            Equipment:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hero.equipment.map((equip) => (
              <UnitCard key={equip.name} unit={equip} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroWithEquipment;
