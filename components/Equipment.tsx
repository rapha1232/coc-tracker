import { heroEquipmentPerHero } from "@/constants";
import { Main, Village } from "@/types";
import { EquipmentCard } from "./UnitCard";

type HeroName = keyof typeof heroEquipmentPerHero;

const Equipment = ({
  playerData,
  activeDropdown,
  toggleDropdown,
}: {
  playerData: Main;
  activeDropdown: string | null;
  toggleDropdown: (section: string) => void;
}) => {
  // Create a Set of unlocked equipment names for quick lookup
  const unlockedEquipment = new Set(
    playerData.heroEquipment
      ?.filter((equip) => equip.village === Village.Home)
      .map((equip) => equip.name) || []
  );

  // Group all possible equipment by hero, marking unlocked status
  const heroEquipmentGroups = Object.entries(heroEquipmentPerHero).map(
    ([heroName, equipmentNames]) => {
      const equipment = equipmentNames.map((name) => {
        const isUnlocked = unlockedEquipment.has(name);
        return {
          name,
          isUnlocked,
          data:
            playerData.heroEquipment?.find(
              (e) => e.name === name && e.village === Village.Home
            ) || null,
        };
      });

      return {
        heroName: heroName as HeroName,
        equipment,
        unlockedCount: equipment.filter((e) => e.isUnlocked).length,
      };
    }
  );

  const totalUnlocked = heroEquipmentGroups.reduce(
    (sum, group) => sum + group.unlockedCount,
    0
  );

  return (
    <div className="mb-6">
      <button
        onClick={() => toggleDropdown("equipment")}
        className="w-full flex justify-between items-center p-4 bg-gray-900/80 hover:bg-gray-800/70 rounded-lg border border-purple-800/50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-purple-300">
          Hero Equipment ({totalUnlocked}/
          {Object.values(heroEquipmentPerHero).flat().length})
        </h2>
        <svg
          className={`w-5 h-5 text-purple-400 transition-transform ${
            activeDropdown === "equipment" ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {activeDropdown === "equipment" && (
        <div className="mt-3 space-y-4">
          {heroEquipmentGroups.map((group) => (
            <div key={group.heroName} className="bg-gray-900/50 rounded-lg p-3">
              <h3 className="text-lg font-medium text-purple-300 mb-2">
                {group.heroName.replace(/([A-Z])/g, " $1").trim()} (
                {group.unlockedCount}/{group.equipment.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.equipment.map((equip) => (
                  <div
                    key={`${group.heroName}-${equip.name}`}
                    className={!equip.isUnlocked ? "opacity-50" : ""}
                  >
                    <EquipmentCard
                      equipment={
                        equip.data || {
                          name: equip.name,
                          level: 0,
                          maxLevel: 1,
                          village: Village.Home,
                        }
                      }
                      isLocked={!equip.isUnlocked}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Equipment;
