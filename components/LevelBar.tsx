const LevelBar = ({ level, maxLevel }: { level: number; maxLevel: number }) => {
  const percentage = (level / maxLevel) * 100;
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className={`bg-purple-600 h-2.5 rounded-full ${
          percentage === 100 ? "bg-green-500" : "bg-purple-600"
        }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default LevelBar;
