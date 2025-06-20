"use client";

import BuildingLevelInput from "@/components/onboarding/BuildingLevelInput";
import { BuildingCategory, Main } from "@/types";
import { entityNames, getCount, getMaxLevel, getType } from "coc-info";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Building {
  name: string;
  maxLevel: number;
  category: BuildingCategory;
  count: number;
}

interface BuildingInstance {
  level: number;
  isGeared?: boolean;
}

type BuildingInstances = Record<string, BuildingInstance[]>;

export default function OnboardingPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [townhallLevel, setTownhallLevel] = useState(13);
  const [buildingInstances, setBuildingInstances] = useState<BuildingInstances>({});
  const [, setPlayerData] = useState<Main>({} as Main);
  const [currentCategory, setCurrentCategory] =
    useState<BuildingCategory>("defense");

  // Get all possible categories from your package
  const categories = Array.from(
    new Set(
      entityNames
        .map((name) => getType(name))
        .filter(
          (type): type is BuildingCategory =>
            type !== null &&
            ["defense", "resource", "army", "trap", "walls", "other"].includes(
              type
            )
        )
    )
  );

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch("/api/clash/player");
        if (response.ok) {
          const data = await response.json();
          setPlayerData(data);
          // Set town hall level from player data
          if (data.townHallLevel) {
            setTownhallLevel(data.townHallLevel);
          }
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchPlayerData();
    }
  }, [status]);

  // Fetch buildings with proper typing
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBuildings = async () => {
      try {
        const response = await fetch("/api/buildings/get");
        if (response.ok) {
          const buildings: Array<{
            name: string;
            level: number;
            isGeared: boolean;
          }> = await response.json();

          const grouped: BuildingInstances = {};
          buildings.forEach((building) => {
            if (!grouped[building.name]) {
              grouped[building.name] = [];
            }

            grouped[building.name].push({
              level: building.level,
              isGeared: building.isGeared,
            });
          });

          setBuildingInstances(grouped);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuildings();
  }, [status, townhallLevel]);

  // Get current TH buildings from your package
  const buildings = entityNames
    .filter((name) => {
      const type = getType(name) as BuildingCategory | undefined;
      return type && categories.includes(type);
    })
    .map((name) => ({
      name,
      maxLevel: getMaxLevel(name, townhallLevel) || 0,
      category: (getType(name) as BuildingCategory) || "other",
      count: getCount(name, townhallLevel) || 0,
    }))
    .filter((b) => b.count > 0);

  const handleInstancesChange = (buildingName: string, instances: BuildingInstance[]) => {
    setBuildingInstances((prev) => ({
      ...prev,
      [buildingName]: instances,
    }));
  };

  const handleSubmit = async () => {
    // Flatten all building instances into a single array
    const allInstances = Object.entries(buildingInstances).flatMap(
      ([name, instances]) =>
        instances.map((instance) => ({
          name,
          level: instance.level,
          isGeared: instance.isGeared || false,
        }))
    );
    try {
      const response = await fetch("/api/buildings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buildings: allInstances }),
      });
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving building levels:", error);
    }
  };

  const isBuildingComplete = (building: Building) => {
    const instances = buildingInstances[building.name] || [];
    return instances.length === building.count;
  };

  const isComplete = buildings.every((building) => isBuildingComplete(building));

  const getCategoryProgress = (category: BuildingCategory) => {
    const categoryBuildings = buildings.filter((b) => b.category === category);
    const completed = categoryBuildings.filter((b) =>
      isBuildingComplete(b)
    ).length;
    return `${completed}/${categoryBuildings.length}`;
  };

  const handleMaxAll = () => {
    const newBuildingInstances: BuildingInstances = {};
    buildings.forEach((building) => {
      const maxCount = getCount(building.name, townhallLevel) || 0;
      if (["Cannon", "Archer Tower", "Mortar"].includes(building.name) && maxCount > 0) {
        // Add one geared up instance, rest normal
        newBuildingInstances[building.name] = [
          ...Array.from({ length: maxCount - 1 }, () => ({ level: building.maxLevel })),
          { level: building.maxLevel, isGeared: true },
        ];
      } else if (maxCount > 0) {
        newBuildingInstances[building.name] = Array.from({ length: maxCount }, () => ({ level: building.maxLevel }));
      }
    });
    setBuildingInstances(newBuildingInstances);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-2xl text-purple-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-purple-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-300">
              Update Your Village
            </h1>
            <p className="text-purple-400 mt-1">
              Configure your buildings, traps, and walls
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-purple-200 rounded-lg transition-colors text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50 p-4 md:p-6">
          {/* Category Tabs */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-purple-300">
              Building Categories
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-sm whitespace-nowrap ${
                    currentCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700/50 text-purple-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="capitalize">{category}</span>
                  <span className="text-xs opacity-75">
                    {getCategoryProgress(category)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Building List Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-purple-300 capitalize">
              {currentCategory} Buildings
            </h3>
            <button
              onClick={handleMaxAll}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
            >
              Max All
            </button>
          </div>

          {/* Buildings Grid */}
          {buildings.filter((b) => b.category === currentCategory).length >
          0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {buildings
                .filter((b) => b.category === currentCategory)
                .map((building) => (
                  <BuildingLevelInput
                  townhallLevel={townhallLevel}
                    key={building.name}
                    building={building}
                    currentInstances={buildingInstances[building.name] || []}
                    onInstancesChange={(instances) => handleInstancesChange(building.name, instances)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-purple-400">
              <p>
                No {currentCategory} buildings at Town Hall {townhallLevel}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-5 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-purple-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                isComplete
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-700 text-purple-300 cursor-not-allowed"
              }`}
            >
              {isComplete
                ? "Save Configuration"
                : "Complete All Buildings First"}
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 text-center text-sm text-purple-400">
          <p>
            Progress: {buildings.filter((b) => isBuildingComplete(b)).length} /{" "}
            {buildings.length} buildings configured
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{
                width: `${
                  (buildings.filter((b) => isBuildingComplete(b)).length /
                    buildings.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
