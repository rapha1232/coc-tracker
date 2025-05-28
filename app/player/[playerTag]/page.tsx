"use client";
import Equipment from "@/components/Equipment";
import Heroes from "@/components/Heroes";
import PlayerClanOverview from "@/components/PlayerClanOverview";
import PlayerOverview from "@/components/PlayerOverview";
import Spells from "@/components/Spells";
import Troops from "@/components/Troops";
import { Main } from "@/types/index";
import { use, useCallback, useEffect, useState } from "react";
import { VscRefresh } from "react-icons/vsc";

interface TagProps {
  params: Promise<{
    playerTag: string;
  }>;
}

export default function PlayerInfo({ params }: TagProps) {
  const { playerTag } = use(params);
  const [playerData, setPlayerData] = useState<Main | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/player?playerTag=" + playerTag);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching player data:", error);
      setError("Failed to load player data");
    } finally {
      setIsLoading(false);
    }
  }, [playerTag]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleDropdown = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-purple-100 p-4 md:p-8 flex justify-center items-start">
      <main className="w-full max-w-4xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-300 text-lg">Loading player data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-purple-300 text-lg mb-6">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-purple-800 hover:bg-purple-700 rounded-md text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          playerData && (
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <PlayerOverview playerData={playerData} />

                {playerData.clan && (
                  <PlayerClanOverview playerData={playerData} />
                )}
              </div>
              <Troops
                activeDropdown={activeDropdown}
                playerData={playerData}
                toggleDropdown={toggleDropdown}
              />
              <Heroes
                activeDropdown={activeDropdown}
                playerData={playerData}
                toggleDropdown={toggleDropdown}
              />
              <Spells
                activeDropdown={activeDropdown}
                playerData={playerData}
                toggleDropdown={toggleDropdown}
              />
              <Equipment
                activeDropdown={activeDropdown}
                playerData={playerData}
                toggleDropdown={toggleDropdown}
              />
              <button
                onClick={fetchData}
                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2 mt-6"
              >
                <VscRefresh />
                Refresh Data
              </button>
            </div>
          )
        )}
      </main>
    </div>
  );
}
