import React, { useState } from "react";

function SearchBar({search, setSortBy, sortBy, setSearch}) {
    const [isAscendingChecked, setIsAscendingChecked] = useState(false);
    const [isDescendingChecked, setIsDescendingChecked] = useState(false);

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    // Enable Ascending sorting if checked
    function handleAscendingSort(e) {
        setIsAscendingChecked(e.target.checked); 
        if (e.target.checked) {
            setSortBy("Ascending");
            // Uncheck Descending if Ascending is checked
            setIsDescendingChecked(false); 
        } else {
            // Reset sortBy if unchecked
            setSortBy("") 
        }
    }
    // Enable Descending sorting if checked
    function handleDescendingSort(e) {
        setIsDescendingChecked(e.target.checked); 
        if (e.target.checked) {
            setSortBy("Descending");
            // Uncheck Ascending if Descending is checked
            setIsAscendingChecked(false); 
        } else {
            setSortBy(""); 
        }
    }

    // clear button event listener
    // reset sorting to no sort
    function handleClear(e) {
        setSearch("");
        setSortBy("");
        setIsAscendingChecked(false);
        setIsDescendingChecked(false)
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-lg"> 
            <div className="flex flex-col">
                <label htmlFor="search" className="text-sm font-semibold text-gray-700">
                    Search Campaigns:
                    <input 
                        type="text"
                        id="search"
                        placeholder="Search campaign name"
                        value={search}
                        onChange={handleSearchChange}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
            </div>  
            <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1"> 
                    Sort Spend by: 
                    <input 
                        type="checkbox"
                        id="sort-ascending"
                        checked={isAscendingChecked}
                        onChange={handleAscendingSort}
                    /> 
                    <span className="text-sm text-gray-700">Ascending</span> 
                </label>
                <label className="flex items-center space-x-1">
                    <input 
                        type="checkbox"
                        id="sort-descending"
                        checked={isDescendingChecked}
                        onChange={handleDescendingSort}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                    /> 
                    <span className="text-sm text-gray-700">Descending</span>
                </label>
            </div>
            
            <button 
                onClick={handleClear}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                >Clear
            </button>
        </div>
    )
};

export default SearchBar;