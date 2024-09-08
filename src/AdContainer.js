import React from "react";
import AdCard from "./AdCard";

function AdContainer({ads}) {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => <AdCard ad={ad} />)}
        </div>
    )
};

export default AdContainer;