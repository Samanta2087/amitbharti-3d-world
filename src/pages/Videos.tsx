import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Filter, Grid, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Videos");

  const categories = [
    "All Videos",
    "Tech Reviews", 
    "Health & Wellness",
    "Ayurveda Insights",
    "Online Earning"
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let query = supabase
          .from('videos')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (selectedCategory !== "All Videos") {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching videos:', error);
        } else {
          setVideos(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  const openVideo = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-4">
            Video Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of educational videos, tech reviews, and insights
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid size={16} className="mr-2" />
              Grid
            </Button>
            <Button variant="outline" size="sm">
              <List size={16} className="mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-3d p-6 rounded-xl animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="card-3d p-6 rounded-xl group cursor-pointer"
                onClick={() => openVideo(video.video_url)}
              >
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_url?.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="youtube-play">
                      <Play size={24} fill="white" className="ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {video.category || 'General'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {video.view_count || 0} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found in this category.</p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" className="btn-glow">
            Load More Videos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Videos;