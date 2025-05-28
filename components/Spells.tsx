import { Main, Village } from "../types";
import { SpellCard } from "./UnitCard";

const Spells = ({
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
        onClick={() => toggleDropdown("spells")}
        className="w-full flex justify-between items-center p-4 bg-gray-900/80 hover:bg-gray-800/70 rounded-lg border border-purple-800/50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-purple-300">
          Spells (
          {playerData.spells.filter((s) => s.village === Village.Home).length})
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
      {activeDropdown === "spells" && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 bg-gray-900/50 rounded-lg">
          {playerData.spells
            .filter((spell) => spell.village === Village.Home)
            .map((spell) => (
              <SpellCard spell={spell} key={spell.name} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Spells;
