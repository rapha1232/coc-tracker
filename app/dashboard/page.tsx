"use client";

import DashboardTabs from "@/components/DashboardTabs";
import PlayerTagInput from "@/components/PlayerTagInput";
import ProgressOverview from "@/components/ProgressOverview";
import { Main } from "@/types";
import { Building } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<Main>({} as Main);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch buildings
        const buildingsResponse = await fetch("/api/buildings/get");
        if (buildingsResponse.ok) {
          const buildingsData = await buildingsResponse.json();
          setBuildings(buildingsData);
        }

        // Fetch player data
        const playerResponse = await fetch("/api/clash/player");
        if (playerResponse.ok) {
          const playerData = await playerResponse.json();
          setUserData(playerData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const handlePlayerTagSubmit = async (tag: string) => {
    try {
      const response = await fetch("/api/clash/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerTag: tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update player tag");
      }

      // Refresh the page to update data
      window.location.reload();
    } catch (error) {
      throw error;
    }
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
        {/* Player Stats Section */}
        {userData?.tag && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-purple-300">
                  {userData.name}&apos;s Village
                </h1>
                <h4 className="text-purple-400">
                  {userData.tag}
                </h4>
                  <Image src={`/images/townhall/Town_Hall${userData.townHallLevel}${userData.townHallWeaponLevel  ? `L${userData.townHallWeaponLevel}` : ""}.png`} alt="Town Hall" width={150} height={150} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-purple-400 text-sm">Town Hall</p>
                    <p className="text-xl font-semibold">{userData.townHallLevel}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-purple-400 text-sm">Trophies</p>
                    <p className="text-xl font-semibold">{userData.trophies}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-purple-400 text-sm">XP Level</p>
                    <p className="text-xl font-semibold">{userData.expLevel}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-purple-400 text-sm">League</p>
                    <p className="text-xl font-semibold">{userData.league?.name || "Unranked"}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/onboarding")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                Update Buildings
              </button>
            </div>
          </div>
        )}

        {!userData?.tag && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-300">
              Link Your Account
            </h2>
            <p className="text-purple-400 mb-6">
              Enter your Clash of Clans player tag to link your account.
            </p>
            <div className="max-w-md">
              <PlayerTagInput onSubmit={handlePlayerTagSubmit} />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-red-300">
            {error}
          </div>
        )}

        {userData?.tag && buildings.length > 0 ? (
          <>
            <div className="mb-8">
              <ProgressOverview buildings={buildings} playerData={userData} />
            </div>
            <DashboardTabs buildings={buildings} playerData={userData} />
          </>
        ) : (
          <div className="text-center py-8 text-purple-400">
            <p className="mb-4">
              No buildings found. Start by adding your buildings!
            </p>
            <button
              onClick={() => router.push("/onboarding")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            >
              Add Buildings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
