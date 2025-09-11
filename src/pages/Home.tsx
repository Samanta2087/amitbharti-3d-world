import React, { useEffect } from 'react';
import { AdSlot } from '@/components/ads/AdSlot';
import Hero from "@/components/Hero";
import { YouTubeStats } from "@/components/realtime/YouTubeStats";
import { LiveBlogFeed } from "@/components/realtime/LiveBlogFeed";
import { UserPresence } from "@/components/realtime/UserPresence";


const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  return (
    <main className="min-h-screen w-full bg-white px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8 lg:py-16">
      <Hero />
      {/* Real-time Features Showcase */}
      <div className="max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
        {/* Reusable Ad Slot */}
        <div className="flex flex-col items-center gap-4 md:gap-6 my-4 md:my-8 w-full">
          <AdSlot type="banner-728x90" />
          <AdSlot type="banner-468x60" />
          <AdSlot type="nativebanner" />
          <AdSlot type="social-bar" />
          <AdSlot type="popunder" />
          <AdSlot type="smartlink" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 w-full">
          {/* YouTube Stats */}
          <div className="lg:col-span-1 w-full">
            <YouTubeStats />
          </div>
          {/* Live Blog Feed */}
          <div className="lg:col-span-2 w-full">
            <LiveBlogFeed maxPosts={3} />
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <UserPresence roomId="home" />
      </div>
    </main>
  );
};

export default Home;
