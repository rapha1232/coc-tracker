// Search and Filter Bar Component
export function SearchFilterBar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortOrder,
  setSortOrder,
  categories,
}: {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string | null;
  setTypeFilter: (value: string | null) => void;
  sortOrder: "lh" | "hl";
  setSortOrder: (value: "lh" | "hl") => void;
  categories: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 bg-gray-900 px-3 py-2 rounded-lg border border-green-700">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-2 py-1 rounded bg-gray-800 text-sm text-purple-100 border border-gray-700 focus:outline-none focus:ring focus:ring-green-700"
        style={{ minWidth: 120 }}
      />
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-2 py-0.5 rounded text-xs border transition font-semibold ${
            typeFilter === cat
              ? "bg-green-700 text-white border-green-700"
              : "bg-gray-800 text-green-300 border-green-700 hover:bg-green-800"
          }`}
          onClick={() => setTypeFilter(typeFilter === cat ? null : cat)}
        >
          {cat}
        </button>
      ))}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "lh" | "hl")}
        className="ml-auto px-2 py-1 rounded bg-gray-800 text-xs text-green-200 border border-green-700"
        style={{ minWidth: 90 }}
      >
        <option value="lh">Cost (low -&gt; high)</option>
        <option value="hl">Cost (high -&gt; low)</option>
      </select>
    </div>
  );
}
