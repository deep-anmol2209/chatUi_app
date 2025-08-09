import React from "react";

export function SearchBar({ value, onChange }) {
    return (
      <div className="px-3 py-2 bg-gray-50">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search or start new chat"
          className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm outline-none focus:bg-white transition"
        />
      </div>
    );
  }
  