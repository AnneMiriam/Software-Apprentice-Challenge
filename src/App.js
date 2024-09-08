import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
// import AdCard from './AdCard';
import AdContainer from './AdContainer';
import SearchBar from './SearchBar';

const fakeAPI = "http://localhost:3000/fakeDataSet"
// const mockAdvert = {
//                 "campaign_name": "Back to School",
//                 "media_buy_name": "Social Media Ads",
//                 "ad_name": "Classroom Essentials",
//                 "spend": 850,
//                 "impressions": 16000,
//                 "clicks": 720,
//                 "results": 45
//               }

function App() {
  const [ads, setAds] = useState([])
  // new state for ads to show
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("Ascending")
console.log(ads);
  
function formatAds(ads) {
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

    const adsNoResults = [...formattedFbAds, ...formattedTwAds, ...formattedScAds]; 

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

  useEffect(() => {
    fetch(fakeAPI)
    .then(res => res.json())
    .then((res)=> {
      const formattedAds = formatAds(res)
      setAds(formattedAds)
    })
  }, [])

  return (
    <div className="App">
      <header className="h-16 p-4" style={{backgroundColor: "#1e2f50"}}>
        <SearchBar handleChange={setSearch} setSortBy={setSortBy} sortBy={sortBy} />
      </header>
        <AdContainer ads={ads.filter(ad => ad.campaign.startsWith(search))}/>
      
    </div>
  );
}

export default App;
