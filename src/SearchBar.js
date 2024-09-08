import React from "react";

function SearchBar({handleChange, setSortBy, sortBy}) {
    function handleSort(e) {
        setSortBy(e.target.value)
    }

    function handleClick(e) {

    }

    return (
        <div className="searchbar">   
            <label htmlFor="search">Search Campaigns:
                <input 
                    type="text"
                    id="search"
                    placeholder="Search for a campaign by name"
                    onChange={(e) => handleChange(e.target.value)}
                />
            </label>
            <label>
                <input 
                    type="radio"
                    value="Ascending"
                    name="sort"
                    checked={sortBy === "Ascending"}
                    onChange={handleSort}
                />
            </label>
            <button onClick={handleClick}>Clear</button>
        </div>
    )
};

export default SearchBar;