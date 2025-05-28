import { heroEquipmentPerHero } from "@/constants";
import { Main, Village } from "@/types";
import { EquipmentCard } from "./UnitCard";

const EquipmentTab = ({ playerData }: { playerData: Main }) => {
  // Create a Set of unlocked equipment names for quick lookup
  const unlockedEquipment = new Set(
    playerData.heroEquipment
      ?.filter((equip) => equip.village === "home")
      .map((equip) => equip.name) || []
  );

  // Group all possible equipment by hero, marking unlocked status
  const heroEquipmentGroups = Object.entries(heroEquipmentPerHero).map(
    ([heroName, equipmentNames]) => {
      const equipment = equipmentNames.map((name) => {
        const isUnlocked = unlockedEquipment.has(name);
        return {
          name,
          isLocked: !isUnlocked,
        };
      });

      // Sort equipment by unlock status
      const sortedEquipment = [...equipment].sort((a, b) => {
        if (a.isLocked === b.isLocked) return a.name.localeCompare(b.name);
        return a.isLocked ? 1 : -1;
      });

      const unlockedItems = sortedEquipment.filter(item => !item.isLocked);
      const lockedItems = sortedEquipment.filter(item => item.isLocked);

      return {
        heroName,
        unlockedItems,
        lockedItems,
      };
    }
  );

  return (
    <div className="space-y-8">
      {heroEquipmentGroups.map(({ heroName, unlockedItems, lockedItems }) => (
        <div key={heroName} className="space-y-6">
          <h3 className="text-xl font-semibold text-purple-300 border-b border-purple-900/30 pb-2">
            {heroName}
          </h3>
          {unlockedItems.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Unlocked</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedItems.map((item) => (
                  <EquipmentCard
                    key={item.name}
                    equipment={{
                      name: item.name,
                      level: playerData.heroEquipment.find(e => e.name === item.name)?.level || 1,
                      maxLevel: playerData.heroEquipment.find(e => e.name === item.name)?.maxLevel || 1,
                      village: Village.Home,
                    }}
                    isLocked={false}
                  />
                ))}
              </div>
            </div>
          )}
          {lockedItems.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-purple-300 mb-3">Locked</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedItems.map((item) => (
                  <EquipmentCard
                    key={item.name}
                    equipment={{
                      name: item.name,
                      level: 0,
                      maxLevel: 1,
                      village: Village.Home,
                    }}
                    isLocked={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EquipmentTab; 