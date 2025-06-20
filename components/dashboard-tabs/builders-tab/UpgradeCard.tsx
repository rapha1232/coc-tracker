import { Upgrade } from "@/types/upgrades";
import { formatTimeLeft } from "@/utils/upgradeUtils";
import Image from "next/image";

// Upgrade Card Component
export function UpgradeCard({
  upgrade,
  now,
  onCancel,
  onComplete,
  loading,
}: {
  upgrade: Upgrade;
  now: number;
  onCancel: (upgradeId: string) => void;
  onComplete: (upgradeId: string) => void;
  loading: boolean;
}) {
  const end = new Date(upgrade.endTime).getTime();
  const secondsLeft = Math.max(0, Math.floor((end - now) / 1000));
  const imgSrc = `/images/${
    upgrade.building.category?.toLowerCase() || "other"
  }/${upgrade.building.name.replace(
    / /g,
    "%20"
  )}/${upgrade.building.name.replace(/ /g, "%20")}_${
    upgrade.building.level + 1
  }.png`;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-amber-700 flex flex-col items-center p-4 min-h-[160px] shadow-md relative group transition-all hover:shadow-amber-700/30">
      <div className="flex items-center gap-3 w-full">
        <Image
          src={imgSrc}
          alt={`${upgrade.building.name} level ${upgrade.building.level}`}
          className="w-16 h-16 object-contain rounded border border-gray-700 bg-gray-900"
          onError={(e) => (e.currentTarget.style.display = "none")}
          width={64}
          height={64}
        />
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <span className="text-purple-200 font-semibold text-base truncate">
            {upgrade.building.name}
            <span className="font-normal text-sm ml-1">
              Lvl {upgrade.building.level}
            </span>
          </span>
          <span className="text-amber-400 text-base flex items-center gap-1 mt-1 font-mono">
            <span className="inline-block align-middle">↑</span>
            {formatTimeLeft(secondsLeft)}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-3 mt-4 w-full justify-end">
        <button
          className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg transition disabled:opacity-50 shadow border border-yellow-600"
          title="Cancel Upgrade"
          onClick={() => onCancel(upgrade.id)}
          disabled={loading}
        >
          <span role="img" aria-label="Cancel">
            ✖
          </span>
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg transition disabled:opacity-50 shadow border border-green-700"
          title="Instant Complete"
          onClick={() => onComplete(upgrade.id)}
          disabled={loading}
        >
          <span role="img" aria-label="Complete">
            ✔
          </span>
        </button>
      </div>
    </div>
  );
}
