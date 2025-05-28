import { siegeMachines, superTroops } from "@/constants";
import { Main, Village } from "../types";
import { TroopCard } from "./UnitCard";

const Troops = ({
  toggleDropdown,
  playerData,
  activeDropdown,
}: {
  toggleDropdown: (section: string) => void;
  playerData: Main;
  activeDropdown: string | null;
}) => {
  return (
    <div className="mb-6">
      <button
        onClick={() => toggleDropdown("troops")}
        className="w-full flex justify-between items-center p-4 bg-gray-900/80 hover:bg-gray-800/70 rounded-lg border border-purple-800/50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-purple-300">
          Troops (
          {playerData.troops.filter((t) => t.village === Village.Home).length})
        </h2>
        <svg
          className={`w-5 h-5 text-purple-400 transition-transform ${
            activeDropdown === "troops" ? "rotate-180" : ""
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
      {activeDropdown === "troops" && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 bg-gray-900/50 rounded-lg">
          {playerData.troops
            .filter(
              (troop) =>
                troop.village === Village.Home &&
                !superTroops.find((st) => st === troop.name) &&
                !siegeMachines.find((sm) => sm === troop.name)
            )
            .map((troop) => (
              <TroopCard key={troop.name} troop={troop} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Troops;
