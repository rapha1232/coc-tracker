import { useState } from 'react';

interface PlayerTagInputProps {
  onSubmit: (tag: string) => Promise<void>;
  initialValue?: string;
  disabled?: boolean;
}

export default function PlayerTagInput({ onSubmit, initialValue = '', disabled = false }: PlayerTagInputProps) {
  const [tag, setTag] = useState(initialValue.startsWith('#') ? initialValue : `#${initialValue}`);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await onSubmit(tag);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save player tag');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setTag(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="playerTag" className="block text-sm font-medium text-purple-300 mb-1">
          Clash of Clans Player Tag
        </label>
        <div className="relative">
          <input
            type="text"
            id="playerTag"
            value={tag}
            onChange={handleChange}
            disabled={disabled || isLoading}
            placeholder="#XXXXXX"
            className="w-full px-4 py-2 bg-gray-800/70 border border-purple-700 rounded text-purple-200 
                     placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled || isLoading || tag.length < 2}
        className={`w-full px-4 py-2 rounded font-medium transition-colors ${
          disabled || isLoading
            ? 'bg-gray-700 text-purple-300 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isLoading ? 'Saving...' : 'Save Player Tag'}
      </button>
    </form>
  );
} 