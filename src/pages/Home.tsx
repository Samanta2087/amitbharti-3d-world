import Hero from "@/components/Hero";
import { YouTubeStats } from "@/components/realtime/YouTubeStats";
import { LiveBlogFeed } from "@/components/realtime/LiveBlogFeed";
import { UserPresence } from "@/components/realtime/UserPresence";

const Home = () => {
  return (
    <main>
      <Hero />
      
      {/* Real-time Features Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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