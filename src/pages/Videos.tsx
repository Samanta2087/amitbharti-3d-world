import { Button } from "@/components/ui/button";
import { Play, Filter, Grid, List } from "lucide-react";

const Videos = () => {
  const categories = [
    "All Videos",
    "Tech Reviews", 
    "Health & Wellness",
    "Ayurveda Insights",
    "Online Earning"
  ];

  const videos = [
    {
      id: "ra5XCRWPh1M",
      title: "Latest Educational Content",
      description: "Learn something new with this comprehensive guide",
      category: "Educational",
      thumbnail: `https://img.youtube.com/vi/ra5XCRWPh1M/maxresdefault.jpg`
    },
    // More videos will be added dynamically
  ];

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
                variant="outline"
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="card-3d p-6 rounded-xl group cursor-pointer">
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
                <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {video.category}
                </span>
              </div>
            </div>
          ))}
        </div>

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