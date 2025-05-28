import { Main, Village } from "../types";
import HeroWithEquipment from "./HeroWithEquipment";

const Heroes = ({
  playerData,
  activeDropdown,
  toggleDropdown,
}: {
  playerData: Main; // Replace with actual type if available
  activeDropdown: string | null;
  toggleDropdown: (section: string) => void;
}) => {
  return (
    <div className="mb-6">
      <button
        onClick={() => toggleDropdown("heroes")}
        className="w-full flex justify-between items-center p-4 bg-gray-900/80 hover:bg-gray-800/70 rounded-lg border border-purple-800/50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-purple-300">
          Heroes (
          {playerData.heroes.filter((h) => h.village === Village.Home).length})
        </h2>
        <svg
          className={`w-5 h-5 text-purple-400 transition-transform ${
            activeDropdown === "heroes" ? "rotate-180" : ""
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
      {activeDropdown === "heroes" && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-900/50 rounded-lg">
          {playerData.heroes
            .filter((hero) => hero.village === Village.Home)
            .map((hero) => (
              <HeroWithEquipment hero={hero} key={hero.name} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Heroes;
