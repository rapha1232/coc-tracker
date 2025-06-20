import { Main } from "@/types";
import { sortByCompletion } from "@/utils/calculations";
import { Building } from "@prisma/client";
import { entityNames, getType, getUses } from "coc-info";
import { useState } from "react";
import BuildersTab from "./dashboard-tabs/builders-tab/builders-tab";
import BuildingStats from "./dashboard-tabs/BuildingStats";
import ComingSoonTab from "./dashboard-tabs/coming-soon";
import HeroesTab from "./dashboard-tabs/hero-tab";
import SiegesTab from "./dashboard-tabs/sieges-tab";
import SpellsTab from "./dashboard-tabs/spells-tab";
import TroopsTab from "./dashboard-tabs/troops-tab";
import EquipmentTab from "./EquipmentTab";
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

export default function DashboardTabs({
  buildings,
  playerData,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("defenses");
  const [currentBuildings, setCurrentBuildings] = useState(buildings);

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
    { id: "builders", label: "Builders" },
    { id: "lab", label: "Lab", isPrep: true },
    { id: "stats", label: "Stats", isPrep: true },
  ];

  const filterEntities = (category: string, resource?: string) => {
    return entityNames.filter((name) => {
      const type = getType(name);
      const uses = getUses(name);
      return type === category && (resource ? uses === resource : true);
    });
  };

  const regularTroops = filterEntities("troop", "elixir");
  const darkTroops = filterEntities("troop", "dark elixir");
  const siegeMachines = filterEntities("siege");
  const normalSpells = filterEntities("spell", "elixir");
  const darkSpells = filterEntities("spell", "dark elixir");

  const renderTabContent = () => {
    switch (activeTab) {
      case "defenses":
        return (
          <BuildingStats
            key="defenses"
            buildings={currentBuildings.filter((b) => b.category === "defense")}
            playerData={playerData}
          />
        );
      case "traps":
        return (
          <BuildingStats
            key="traps"
            buildings={currentBuildings.filter((b) => b.category === "trap")}
            playerData={playerData}
          />
        );
      case "army":
        return (
          <BuildingStats
            key="army"
            buildings={currentBuildings.filter((b) => b.category === "army")}
            playerData={playerData}
          />
        );
      case "resources":
        return (
          <BuildingStats
            key="resources"
            buildings={currentBuildings.filter(
              (b) => b.category === "resource"
            )}
            playerData={playerData}
          />
        );
      case "troops":
        const regularTroopsData = playerData.troops
          .filter(
            (troop) =>
              regularTroops.includes(troop.name) && troop.village === "home"
          )
          .sort(sortByCompletion(playerData.townHallLevel));

        return <TroopsTab troops={regularTroopsData} playerData={playerData} />;
      case "spells":
        const normalSpellsData = playerData.spells
          .filter(
            (spell) =>
              normalSpells.includes(spell.name) && spell.village === "home"
          )
          .sort(sortByCompletion(playerData.townHallLevel));

        const darkSpellsData = playerData.spells
          .filter(
            (spell) =>
              darkSpells.includes(spell.name) && spell.village === "home"
          )
          .sort(sortByCompletion(playerData.townHallLevel));

        return (
          <div className="space-y-8">
            <SpellsTab
              spells={normalSpellsData}
              title="Normal Spells"
              playerData={playerData}
            />
            <SpellsTab
              spells={darkSpellsData}
              title="Dark Spells"
              playerData={playerData}
            />
          </div>
        );
      case "darkTroops":
        const darkTroopsData = playerData.troops
          .filter(
            (troop) =>
              darkTroops.includes(troop.name) && troop.village === "home"
          )
          .sort(sortByCompletion(playerData.townHallLevel));

        return <TroopsTab troops={darkTroopsData} playerData={playerData} />;
      case "sieges":
        const siegesData = playerData.troops
          .filter(
            (troop) =>
              siegeMachines.includes(troop.name) && troop.village === "home"
          )
          .sort(sortByCompletion(playerData.townHallLevel));

        return <SiegesTab sieges={siegesData} playerData={playerData} />;
      case "heroes":
        const heroesData = playerData.heroes
          .filter((hero) => hero.village === "home")
          .sort(sortByCompletion(playerData.townHallLevel));

        return <HeroesTab heroes={heroesData} playerData={playerData} />;
      case "equipment":
        return <EquipmentTab playerData={playerData} />;
      case "walls":
        return (
          <WallStats
            buildings={currentBuildings.filter(
              (b) =>
                b.category === "Wall" || b.name.toLowerCase().includes("wall")
            )}
            playerData={playerData}
          />
        );
      case "builders":
        return (
          <BuildersTab
            buildings={currentBuildings}
            playerData={playerData}
            onBuildingsUpdate={setCurrentBuildings}
          />
        );
      default:
        if (tabs.find((tab) => tab.id === activeTab)?.isPrep) {
          return <ComingSoonTab />;
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
