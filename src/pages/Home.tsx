import React, { useEffect } from 'react';
import Hero from "@/components/Hero";
import { YouTubeStats } from "@/components/realtime/YouTubeStats";
import { LiveBlogFeed } from "@/components/realtime/LiveBlogFeed";
import { UserPresence } from "@/components/realtime/UserPresence";
import { AdsterraAd } from "@/components/ads/AdsterraAd";
import { MontagAd } from "@/components/ads/MontagAd";
import { IntergradAd } from "@/components/ads/IntergradAd";


const Home = () => {
  useEffect(() => {
    // Check if the ad container already has scripts to prevent duplicates
    const adContainer = document.getElementById('ad-container');
    if (adContainer && adContainer.childElementCount === 0) {
      const atOptionsScript = document.createElement('script');
      atOptionsScript.type = 'text/javascript';
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '565710656c75f6dcace9eb21130676f4',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      adContainer.appendChild(atOptionsScript);

      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = "//www.highperformanceformat.com/565710656c75f6dcace9eb21130676f4/invoke.js";
      adContainer.appendChild(adScript);
    }
  }, []);

  return (
    <main>
      <Hero />
      
      {/* Real-time Features Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Ad Section */}
        <div className="space-y-8">
          {/* Adsterra Banner Ad */}
          <div className="flex justify-center">
            <AdsterraAd format="banner" width={728} height={90} />
          </div>
          
          {/* Monetag Ad */}
          <div className="flex justify-center">
            <MontagAd width={300} height={250} />
          </div>
          
          {/* Intergrad Ads */}
          <div className="flex justify-center">
            <IntergradAd type="banner-728x90" />
          </div>
          
          <div className="flex justify-center">
            <IntergradAd type="banner-468x60" />
          </div>
          
          <div className="flex justify-center">
            <IntergradAd type="native" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* YouTube Stats */}
          <div className="lg:col-span-1">
            <YouTubeStats />
          </div>
          
          {/* Live Blog Feed */}
          <div className="lg:col-span-2">
            <LiveBlogFeed maxPosts={3} />
          </div>
        </div>
        
        {/* User Presence */}
        <div className="mt-12 text-center">
          <UserPresence roomId="home" />
        </div>
        
        {/* Intergrad Popunder and Social Bar (loaded automatically) */}
        <IntergradAd type="popunder" />
        <IntergradAd type="social-bar" />
      </div>
    </main>
  );
};

export default Home;