import './App.css';
import { useState, useEffect } from 'react';
// import AdCard from './AdCard';
import AdContainer from './AdContainer';
import SearchBar from './SearchBar';

const fakeAPI = "http://localhost:3000/fakeDataSet"

function App() {
  const [ads, setAds] = useState([]);
  // new state for ads to show
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
// console.log(ads);
  
  function formatAds(ads) {
    // Format properties to standardized data types
    const formattedFbAds = ads.facebook_ads.map(ad => {
      return {
        campaign: ad.campaign_name,
        adset: ad.media_buy_name,
        creative: ad.ad_name,
        spend: ad.spend,
        impressions: ad.impressions,
        clicks: ad.clicks
      }
    })
    const formattedTwAds = ads.twitter_ads.map(ad => {
      return {
        campaign: ad.campaign,
        adset: ad.ad_group,
        creative: ad.image_name,
        spend: ad.spend,
        impressions: ad.impressions,
        clicks: ad.post_clicks
      }
    })
    const formattedScAds = ads.snapchat_ads.map(ad => {
      return {
        campaign: ad.campaign_name,
        adset: ad.ad_squad_name,
        creative: ad.creative_name,
        spend: ad.cost,
        impressions: ad.impressions,
        clicks: ad.post_clicks
      }
    })
    // new array of all ads
    const adsNoResults = [...formattedFbAds, ...formattedTwAds, ...formattedScAds]; 
    
    // find all analytics that match adds, add up the results, in no results post 0
    return adsNoResults.map(ad => {
      const matchingAnalytics = ads.google_analytics.filter(analytic => {
        return ad.campaign === analytic.utm_campaign && ad.adset === analytic.utm_medium && ad.creative === analytic.utm_content
      })
      if(matchingAnalytics.length === 0) {
        return {...ad, results: 0}
      }
      let results = 0;
      matchingAnalytics.forEach(analytic => {
        results += analytic.results
      })
      return {...ad, results: results}
    })
  }

  // fetch the API
  useEffect(() => {
    fetch(fakeAPI)
    .then(res => res.json())
    .then((res)=> {
      const formattedAds = formatAds(res)
      setAds(formattedAds);
    })
  }, [])

  // Conditionally sorting ads only when sortBy is not empty
  const sortedAds = sortBy === "" ? ads : [...ads].sort((a, b) => {
    if (sortBy === "Ascending") {
      return a.spend - b.spend;
    } else if (sortBy === "Descending") {
      return b.spend - a.spend;
    }
    return 0
  });

  // Filtering ads based on search input
  const filteredAds = sortedAds.filter(ad => ad.campaign.toLowerCase().startsWith(search.toLowerCase()));

  return (
    <div className="App">
      <header className="h-30 p-4" style={{backgroundColor: "#1e2f50"}}>
        <SearchBar setSortBy={setSortBy} sortBy={sortBy} search={search} setSearch={setSearch}/>
      </header>
        <AdContainer ads={filteredAds}/>
      
    </div>
  );
}

export default App;
