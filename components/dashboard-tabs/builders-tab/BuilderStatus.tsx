import { FaHammer } from "react-icons/fa";

// Builder Status Component
export function BuilderStatus({
  freeBuilders,
  totalBuilders,
}: {
  freeBuilders: number;
  totalBuilders: number;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-700/60 to-green-400/30 backdrop-blur-md border border-green-400 shadow-lg text-green-100 font-semibold text-base">
      <FaHammer className="text-yellow-300 drop-shadow-md" />
      {freeBuilders}/{totalBuilders}
    </span>
  );
}
