"use client";

import BuildingLevelInput from "@/components/onboarding/BuildingLevelInput";
import { TH13_BUILDINGS } from "@/constants/buildings";
import { Building } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BuildingLevel {
  level: number;
  count: number;
  isGeared?: boolean;
}

type BuildingLevels = Record<string, BuildingLevel[]>;

export default function OnboardingPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [currentCategory, setCurrentCategory] = useState<string>("Defense");
  const [buildingLevels, setBuildingLevels] = useState<BuildingLevels>({});
  const [isLoading, setIsLoading] = useState(true);
  const categories = Array.from(new Set(TH13_BUILDINGS.map((b) => b.category)));

  // Fetch existing building levels when the component mounts
  useEffect(() => {
    const fetchBuildingLevels = async () => {
      try {
        const response = await fetch("/api/buildings/get");
        if (response.ok) {
          const buildings = await response.json();

          // Group buildings by name
          const groupedBuildings = buildings.reduce(
            (acc: BuildingLevels, building: Building) => {
              if (!acc[building.name]) {
                acc[building.name] = [];
              }
              // Find if we already have this level
              const existingLevel = acc[building.name].find(
                (b) =>
                  b.level === building.level && b.isGeared === building.isGeared
              );
              if (existingLevel) {
                existingLevel.count += building.count;
              } else {
                acc[building.name].push({
                  level: building.level,
                  count: building.count,
                  isGeared: building.isGeared,
                });
              }
              return acc;
            },
            {}
          );

          setBuildingLevels(groupedBuildings);
        }
      } catch (error) {
        console.error("Error fetching building levels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchBuildingLevels();
    }
  }, [status]);

  const handleLevelChange = (buildingName: string, levels: BuildingLevel[]) => {
    setBuildingLevels((prev) => ({
      ...prev,
      [buildingName]: levels,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/buildings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buildings: buildingLevels }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving building levels:", error);
    }
  };

  const isBuildingComplete = (building: (typeof TH13_BUILDINGS)[0]) => {
    const levels = buildingLevels[building.name] || [];
    const totalCount = levels.reduce((sum, l) => sum + l.count, 0);
    return totalCount === building.count;
  };

  const isComplete = TH13_BUILDINGS.every((building) =>
    isBuildingComplete(building)
  );

  const getCategoryProgress = (category: string) => {
    const buildings = TH13_BUILDINGS.filter((b) => b.category === category);
    const completed = buildings.filter((b) => isBuildingComplete(b)).length;
    return `${completed}/${buildings.length}`;
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-2xl text-purple-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-300">
            Update Your Buildings
          </h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-purple-200 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50 p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Building Levels
          </h2>
          <p className="text-purple-400 mb-6">
            Update your building levels and counts.
          </p>

          <div className="flex gap-4 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  currentCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700/50 text-purple-300 hover:bg-gray-700"
                }`}
              >
                <span>{category}</span>
                <span className="text-sm opacity-75">
                  {getCategoryProgress(category)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-purple-300">
              {currentCategory} Buildings
            </h3>
            <button
              onClick={() => {
                const categoryBuildings = TH13_BUILDINGS.filter(
                  (b) => b.category === currentCategory
                );
                const newBuildingLevels = { ...buildingLevels };

                categoryBuildings.forEach((building) => {
                  if (building.name === "Wall") {
                    // Special handling for walls - set all to max level
                    newBuildingLevels[building.name] = [
                      {
                        level: building.maxLevel,
                        count: building.count,
                      },
                    ];
                  } else if (
                    ["Cannon", "Archer Tower", "Mortar"].includes(building.name)
                  ) {
                    // Handle buildings that can be geared up
                    newBuildingLevels[building.name] = [
                      {
                        level: building.maxLevel,
                        count: building.count - 1,
                        isGeared: false,
                      },
                      {
                        level: building.maxLevel,
                        count: 1,
                        isGeared: true,
                      },
                    ];
                  } else {
                    // Regular buildings
                    newBuildingLevels[building.name] = [
                      {
                        level: building.maxLevel,
                        count: building.count,
                      },
                    ];
                  }
                });

                setBuildingLevels(newBuildingLevels);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
            >
              Set All to Max Level
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TH13_BUILDINGS.filter((b) => b.category === currentCategory).map(
              (building) => (
                <BuildingLevelInput
                  key={building.name}
                  building={building}
                  currentLevels={buildingLevels[building.name] || []}
                  onLevelChange={handleLevelChange}
                />
              )
            )}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-purple-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isComplete
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-700 text-purple-300 cursor-not-allowed"
              }`}
            >
              {isComplete ? "Save Changes" : "Please set all building levels"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
