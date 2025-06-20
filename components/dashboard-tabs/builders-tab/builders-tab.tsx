import { useBuildingsManagement } from "@/hooks/useBuildingsManagement";
import { useUpgradableBuildings } from "@/hooks/useUpgradableBuilding";
import { useUpgradesManagement } from "@/hooks/useUpgradesManagements";
import {
  BuildersTabProps,
  SortOrder,
  UpgradableBuilding,
} from "@/types/upgrades";
import {
  getBuilderAvailability,
  startBuildingUpgrade,
} from "@/utils/upgradeUtils";
import { useEffect, useMemo, useState } from "react";
import { FaSync } from "react-icons/fa";
import { toast } from "sonner";
import { BuilderStatus } from "./BuilderStatus";
import { SearchFilterBar } from "./SearchFilterBar";
import { UpgradableBuildingCard } from "./UpgradableBuildingCard";
import { UpgradeCard } from "./UpgradeCard";

export default function BuildersTab({
  buildings,
  playerData,
  onBuildingsUpdate,
}: BuildersTabProps) {
  const [now, setNow] = useState<number>(Date.now());
  const [search, setSearch] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("lh");

  // Hooks
  const {
    upgrades,
    loading,
    error,
    fetchUpgrades,
    cancelUpgrade,
    completeUpgrade,
  } = useUpgradesManagement();
  const { fetchBuildings } = useBuildingsManagement(onBuildingsUpdate);
  const filteredUpgradable = useUpgradableBuildings(
    buildings,
    upgrades,
    playerData.townHallLevel,
    search,
    typeFilter,
    sortOrder
  );
  const { freeBuilders, totalBuilders } = getBuilderAvailability(
    buildings,
    upgrades
  );

  // Effects
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    upgrades.forEach(async (upgrade) => {
      const end = new Date(upgrade.endTime).getTime();
      if (end <= now) {
        await completeUpgrade(upgrade.id);
        fetchBuildings();
      }
    });
  }, [now, upgrades, completeUpgrade, fetchBuildings]);

  // Handlers
  const handleStartUpgrade = async (building: UpgradableBuilding) => {
    try {
      await startBuildingUpgrade(building.id, building.name, building.level);
      await fetchUpgrades();
      toast.success("Successfully started upgrade");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    }
  };

  const categories = useMemo(
    () => Array.from(new Set(buildings.map((b) => b.category))).filter(Boolean),
    [buildings]
  );

  const handleRefresh = async () => {
    try {
      await Promise.all([fetchUpgrades(), fetchBuildings()]);
      toast.success("Data refreshed successfully");
    } catch {
      toast.error("Failed to refresh data");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between gap-2 mb-2">
        <h2></h2>
        <div className="flex items-center gap-2">
          <BuilderStatus
            freeBuilders={freeBuilders}
            totalBuilders={totalBuilders}
          />
          <button
            onClick={handleRefresh}
            className="text-gray-400 hover:text-green-400 p-1"
          >
            <FaSync className={`text-sm ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {/* In Progress Upgrades */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-tight">
          In Progress
        </h3>
        {upgrades.length === 0 && (
          <div className="text-purple-400">No upgrades in progress.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {upgrades.map((upgrade) => (
            <UpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              now={now}
              onCancel={cancelUpgrade}
              onComplete={completeUpgrade}
              loading={loading}
            />
          ))}
        </div>
      </div>

      {/* Upgradable Buildings */}
      <div>
        <h3 className="text-lg font-semibold text-green-400 mb-3 tracking-tight">
          Available to Upgrade
        </h3>
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
        />
        {filteredUpgradable.length === 0 && (
          <div className="text-purple-400">
            No buildings available for upgrade.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUpgradable.map((building) => (
            <UpgradableBuildingCard
              key={`${building.id}-${building._instance}`}
              building={building}
              onUpgrade={handleStartUpgrade}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
