'use client';

import { useState } from 'react';

interface SearchProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

export default function Search({ onSearch, isLoading = false }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 pt-4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            className="w-full bg-white border border-gray-700 rounded-lg p-4 pr-24 text-lg text-gray-900 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for flights, airlines, or flight numbers..."
            disabled={isLoading}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 border border-gray-700 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching...</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </form>
      
      {/* Search suggestions */}
      <div className="mt-3 text-sm text-gray-600 text-center">
        <p>Try searching: "RJ734", "Royal Jordanian", "AMM to RUH", or "Flight AA123"</p>
      </div>
    </div>
  );
}
