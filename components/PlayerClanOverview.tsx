import { Main } from "@/types";

const PlayerClanOverview = ({ playerData }: { playerData: Main }) => {
  return (
    <div className="bg-gray-900/80 p-6 rounded-lg border border-purple-800/50 flex-1">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">
        Clan Info
      </h2>
      <div className="flex items-center gap-4 mb-3">
        <div>
          <h3 className="font-semibold text-purple-300">
            {playerData.clan.name}
          </h3>
          <p className="text-sm text-purple-400">
            Level {playerData.clan.clanLevel}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">Role:</span>
          <span className="font-semibold text-purple-400 capitalize">
            {playerData.role.toLowerCase()}
          </span>
        </div>
        <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-md">
          <span className="font-medium text-purple-200">War Pref:</span>
          <span className="font-semibold text-purple-400 capitalize">
            {playerData.warPreference.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerClanOverview;
