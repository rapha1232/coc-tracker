import { Building } from "@prisma/client";
import Image from "next/image";

// Upgradable Building Card Component
export function UpgradableBuildingCard({
  building,
  onUpgrade,
  loading,
}: {
  building: Building & { _instance?: number };
  onUpgrade: (building: Building) => void;
  loading: boolean;
}) {
  const nextLevel = building.level + 1;
  const imgSrc = `/images/${
    building.category?.toLowerCase() || "other"
  }/${building.name.replace(/ /g, "%20")}/${building.name.replace(
    / /g,
    "%20"
  )}_${nextLevel}.png`;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 border border-green-700 shadow-sm hover:shadow-lg flex items-center gap-3 transition-all duration-150 min-h-[64px] group">
      <Image
        src={imgSrc}
        alt={`${building.name} level ${nextLevel}`}
        className="w-12 h-12 object-contain rounded border border-gray-700 bg-gray-900"
        onError={(e) => (e.currentTarget.style.display = "none")}
        width={48}
        height={48}
      />
      <div className="flex-1 min-w-0">
        <span className="text-purple-200 font-medium text-sm truncate block">
          {building.name}{" "}
          <span className="text-gray-400">
            (Lvl {building.level} → {nextLevel})
          </span>
        </span>
      </div>
      <button
        className="ml-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold transition shadow border border-green-700"
        onClick={() => onUpgrade(building)}
        disabled={loading}
      >
        Upgrade
      </button>
    </div>
  );
}
