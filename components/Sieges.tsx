import { TH13_LABS } from "@/constants/buildings";
import { Main } from "../types";
import { TroopCard } from "./UnitCard";

const Sieges = ({
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
        onClick={() => toggleDropdown("sieges")}
        className="w-full flex justify-between items-center p-4 bg-gray-900/80 hover:bg-gray-800/70 rounded-lg border border-purple-800/50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-purple-300">
          Sieges (
            {playerData.troops.some(t => TH13_LABS.find(s => s.name === t.name)?.category === "Siege Machine") ? 
            playerData.troops.filter(t => TH13_LABS.find(s => s.name === t.name)?.category === "Siege Machine").length : 0}
         )
        </h2>
        <svg
          className={`w-5 h-5 text-purple-400 transition-transform ${
            activeDropdown === "spells" ? "rotate-180" : ""
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
      {activeDropdown === "sieges" && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 bg-gray-900/50 rounded-lg">
          {playerData.troops.filter(t => TH13_LABS.find(s => s.name === t.name)?.category === "Siege Machine").map(t => (
            <TroopCard troop={t} key={t.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sieges;
