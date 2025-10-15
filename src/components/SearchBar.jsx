import React, { useState } from "react";

export default function SearchBar({ initialCity = "", onSearch }) {
    const [q, setQ] = useState(initialCity);

    const submit = (e) => {
        e?.preventDefault?.();
        const trimmed = q.trim();
        if (!trimmed) return;
        onSearch(trimmed);
    };

    return (
        <form onSubmit={submit} className="weather-card">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search city</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="e.g. Addis Ababa"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                    type="submit"
                    onClick={submit}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>
            <div className="mt-3 text-xs text-gray-600">
                Example: London, New York, Tokyo. Use full city names for better accuracy.
            </div>
        </form>
    );
}
