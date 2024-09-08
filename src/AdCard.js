// import exp from "constants";
import React from "react";

function AdCard({ad}) {
    const {campaign, adset, creative, spend, impressions, clicks, results} = ad; 

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{campaign}</h2>
            <h3 className="text-lg font-semibold text-gray-700">{adset}</h3>
            <h3 className="text-lg text-gray-500">{creative}</h3>
            <div className="mt-4">
                <p className="text-gray-800">Spend: ${spend}</p>
                <p className="text-gray-800">Impressions: {impressions}</p>
                <p className="text-gray-800">Clicks: {clicks}</p>
                <p className="text-gray-800">Results: {results}</p>
            </div>
        </div>
    );
}

export default AdCard;