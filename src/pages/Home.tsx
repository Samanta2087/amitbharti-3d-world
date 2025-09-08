import React, { useEffect } from 'react';
import Hero from "@/components/Hero";
import { YouTubeStats } from "@/components/realtime/YouTubeStats";
import { LiveBlogFeed } from "@/components/realtime/LiveBlogFeed";
import { UserPresence } from "@/components/realtime/UserPresence";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Your Ad Container */}
        <div id="ad-container" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }} />

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
      </div>
    </main>
  );
};

export default Home;