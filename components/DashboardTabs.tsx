import { TH13_HEROES, TH13_LABS } from "@/constants/buildings";
import { Main } from "@/types";
import { Building } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import BuildingStats from "./BuildingStats";
import EquipmentTab from "./EquipmentTab";
import { SiegeCard, SpellCard, TroopCard } from "./UnitCard";
import WallStats from "./WallStats";

interface DashboardTabsProps {
  buildings: Building[];
  playerData: Main;
}

type TabType = 
  | "defenses"
  | "traps"
  | "army"
  | "resources"
  | "troops"
  | "spells"
  | "darkTroops"
  | "sieges"
  | "heroes"
  | "equipment"
  | "walls"
  | "forge"
  | "builders"
  | "lab"
  | "stats";

export default function DashboardTabs({ buildings, playerData }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("defenses");

  const tabs: { id: TabType; label: string; isPrep?: boolean }[] = [
    { id: "defenses", label: "Defenses" },
    { id: "traps", label: "Traps" },
    { id: "army", label: "Army" },
    { id: "resources", label: "Resources" },
    { id: "troops", label: "Troops" },
    { id: "spells", label: "Spells" },
    { id: "darkTroops", label: "Dark Troops" },
    { id: "sieges", label: "Sieges" },
    { id: "heroes", label: "Heroes" },
    { id: "equipment", label: "Equipment" },
    { id: "walls", label: "Walls" },
    { id: "forge", label: "Forge", isPrep: true },
    { id: "builders", label: "Builders", isPrep: true },
    { id: "lab", label: "Lab", isPrep: true },
    { id: "stats", label: "Stats", isPrep: true }
  ];

  // Get lists of troops by type from lab data
  const regularTroops = TH13_LABS.filter(t => t.category === "Troops" && t.uses === "Elixir").map(t => t.name);
  const darkTroops = TH13_LABS.filter(t => t.category === "Troops" && t.uses === "Dark Elixir").map(t => t.name);
  const siegeMachines = TH13_LABS.filter(t => t.category === "Siege Machine").map(t => t.name);
  const normalSpells = TH13_LABS.filter(t => t.category === "Spells" && t.uses === "Elixir").map(t => t.name);
  const darkSpells = TH13_LABS.filter(t => t.category === "Spells" && t.uses === "Dark Elixir").map(t => t.name);

  const renderTabContent = () => {
    switch (activeTab) {
      case "defenses":
        return <BuildingStats buildings={buildings.filter(b => b.category === "Defense")} playerData={playerData} />;
      case "traps":
        return <BuildingStats buildings={buildings.filter(b => b.category === "Trap")} playerData={playerData} />;
      case "army":
        return <BuildingStats buildings={buildings.filter(b => b.category === "Army")} playerData={playerData} />;
      case "resources":
        return <BuildingStats buildings={buildings.filter(b => b.category === "Resource")} playerData={playerData} />;
      case "troops":
        const regularTroopsData = playerData.troops
          .filter(troop => regularTroops.includes(troop.name) && troop.village === "home")
          .sort((a, b) => {
            const aMaxLevel = TH13_LABS.find(t => t.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_LABS.find(t => t.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">Complete</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regularTroopsData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level === maxLevel;
                }).map(troop => (
                  <TroopCard key={troop.name} troop={troop} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">In Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regularTroopsData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level < maxLevel;
                }).map(troop => (
                  <TroopCard key={troop.name} troop={troop} />
                ))}
              </div>
            </div>
          </div>
        );
      case "spells":
        const normalSpellsData = playerData.spells
          .filter(spell => normalSpells.includes(spell.name))
          .sort((a, b) => {
            const aMaxLevel = TH13_LABS.find(t => t.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_LABS.find(t => t.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        const darkSpellsData = playerData.spells
          .filter(spell => darkSpells.includes(spell.name))
          .sort((a, b) => {
            const aMaxLevel = TH13_LABS.find(t => t.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_LABS.find(t => t.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-300 mb-3">Normal Spells</h3>
              <div>
                <h4 className="text-md font-medium text-purple-300 mb-3">Complete</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {normalSpellsData.filter(spell => {
                    const maxLevel = TH13_LABS.find(t => t.name === spell.name)?.maxLevel || 0;
                    return spell.level === maxLevel;
                  }).map(spell => (
                    <SpellCard key={spell.name} spell={spell} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-purple-300 mb-3">In Progress</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {normalSpellsData.filter(spell => {
                    const maxLevel = TH13_LABS.find(t => t.name === spell.name)?.maxLevel || 0;
                    return spell.level < maxLevel;
                  }).map(spell => (
                    <SpellCard key={spell.name} spell={spell} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-purple-300 mb-3">Dark Spells</h3>
              <div>
                <h4 className="text-md font-medium text-purple-300 mb-3">Complete</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {darkSpellsData.filter(spell => {
                    const maxLevel = TH13_LABS.find(t => t.name === spell.name)?.maxLevel || 0;
                    return spell.level === maxLevel;
                  }).map(spell => (
                    <SpellCard key={spell.name} spell={spell} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-purple-300 mb-3">In Progress</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {darkSpellsData.filter(spell => {
                    const maxLevel = TH13_LABS.find(t => t.name === spell.name)?.maxLevel || 0;
                    return spell.level < maxLevel;
                  }).map(spell => (
                    <SpellCard key={spell.name} spell={spell} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "darkTroops":
        const darkTroopsData = playerData.troops
          .filter(troop => darkTroops.includes(troop.name) && troop.village === "home")
          .sort((a, b) => {
            const aMaxLevel = TH13_LABS.find(t => t.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_LABS.find(t => t.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">Complete</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {darkTroopsData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level === maxLevel;
                }).map(troop => (
                  <TroopCard key={troop.name} troop={troop} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">In Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {darkTroopsData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level < maxLevel;
                }).map(troop => (
                  <TroopCard key={troop.name} troop={troop} />
                ))}
              </div>
            </div>
          </div>
        );
      case "sieges":
        const siegesData = playerData.troops
          .filter(troop => siegeMachines.includes(troop.name) && troop.village === "home")
          .sort((a, b) => {
            const aMaxLevel = TH13_LABS.find(t => t.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_LABS.find(t => t.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">Complete</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {siegesData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level === maxLevel;
                }).map(troop => (
                  <SiegeCard key={troop.name} siege={troop} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">In Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {siegesData.filter(troop => {
                  const maxLevel = TH13_LABS.find(t => t.name === troop.name)?.maxLevel || 0;
                  return troop.level < maxLevel;
                }).map(troop => (
                  <SiegeCard key={troop.name} siege={troop} />
                ))}
              </div>
            </div>
          </div>
        );
      case "heroes":
        const heroesData = playerData.heroes
          .filter(hero => hero.village === "home")
          .sort((a, b) => {
            const aMaxLevel = TH13_HEROES.find(h => h.name === a.name)?.maxLevel || 0;
            const bMaxLevel = TH13_HEROES.find(h => h.name === b.name)?.maxLevel || 0;
            const aIsComplete = a.level === aMaxLevel;
            const bIsComplete = b.level === bMaxLevel;
            if (aIsComplete === bIsComplete) return a.name.localeCompare(b.name);
            return aIsComplete ? -1 : 1;
          });

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">Complete</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {heroesData.filter(hero => {
                  const maxLevel = TH13_HEROES.find(h => h.name === hero.name)?.maxLevel || 0;
                  return hero.level === maxLevel;
                }).map(hero => (
                  <div
                    key={hero.name}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden">
                        <Image
                          src={`/images/hero/${hero.name}.png`}
                          alt={hero.name}
                          width={48}
                          height={48}
                          className="object-contain w-auto h-auto max-w-full max-h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-purple-200 font-medium">{hero.name}</h3>
                        <p className="text-purple-400">Level {hero.level}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-3">In Progress</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {heroesData.filter(hero => {
                  const maxLevel = TH13_HEROES.find(h => h.name === hero.name)?.maxLevel || 0;
                  return hero.level < maxLevel;
                }).map(hero => (
                  <div
                    key={hero.name}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg overflow-hidden">
                        <Image
                          src={`/images/hero/${hero.name}.png`}
                          alt={hero.name}
                          width={48}
                          height={48}
                          className="object-contain w-auto h-auto max-w-full max-h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-purple-200 font-medium">{hero.name}</h3>
                        <p className="text-purple-400">Level {hero.level}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "equipment":
        return <EquipmentTab playerData={playerData} />;
      case "walls":
        return <WallStats buildings={buildings.filter(b => b.category === "Wall" || b.name.toLowerCase().includes("wall"))} playerData={playerData} />;
      default:
        if (tabs.find(tab => tab.id === activeTab)?.isPrep) {
          return (
            <div className="text-center py-12 text-purple-400">
              <p className="text-xl">Coming Soon</p>
              <p className="mt-2 text-purple-300/60">This feature is under development</p>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1 border-b border-purple-900/30 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-purple-600 text-white"
                : "text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
            } ${tab.isPrep ? "opacity-70" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
} 