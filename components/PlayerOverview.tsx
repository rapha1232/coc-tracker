import { Main } from "@/types";
import Image from "next/image";

const PlayerOverview = ({ playerData }: { playerData: Main }) => {
  return (
    <div className="bg-gray-900/80 p-6 rounded-lg border border-purple-800/50 flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">
        Player Overview
      </h2>
      <Image
        priority
        src={`/images/resource/Townhall/Town_Hall${playerData.townHallLevel}${
          playerData.townHallWeaponLevel
            ? `L${playerData.townHallWeaponLevel}`
            : ""
        }.png`}
        alt="Townhall Image"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">Name:</span>
          <span className="font-semibold text-purple-400">
            {playerData.name}
          </span>
        </div>
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">TH Level:</span>
          <span className="font-semibold text-purple-400">
            {playerData.townHallLevel}
            {playerData.townHallWeaponLevel
              ? ` (${playerData.townHallWeaponLevel})`
              : ""}
          </span>
        </div>
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">EXP Level:</span>
          <span className="font-semibold text-purple-400">
            {playerData.expLevel}
          </span>
        </div>
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">Trophies:</span>
          <span className="font-semibold text-purple-400">
            {playerData.trophies}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverview;
