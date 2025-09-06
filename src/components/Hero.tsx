import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Video, Award, TrendingUp } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Users,
      number: "120K+",
      label: "YouTube Subscribers",
      color: "text-red-500"
    },
    {
      icon: Users,
      number: "30K+",
      label: "Instagram Followers",
      color: "text-pink-500"
    },
    {
      icon: Users,
      number: "20K+",
      label: "Community Members",
      color: "text-blue-500"
    },
    {
      icon: Video,
      number: "500+",
      label: "Videos Uploaded",
      color: "text-green-500"
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background/50 to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-poppins font-bold leading-tight">
                <span className="block text-foreground">Hi, I'm</span>
                <span className="block gradient-text animate-gradient">Amit Bharti</span>
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground font-medium">
                Welcome to My Website!
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                <span className="text-primary font-semibold">Educational.</span>
                <span className="text-accent font-semibold"> Online Earning.</span>
              </p>
            </div>

            {/* Featured Video Section */}
            <div className="card-3d p-6 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="youtube-play">
                  <Play size={24} fill="white" className="ml-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Latest Video</h3>
                  <p className="text-sm text-muted-foreground">Watch my newest content</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden bg-muted/20 h-48 md:h-64 group cursor-pointer">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ra5XCRWPh1M"
                  title="Featured YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-glow text-lg px-8 py-4 rounded-xl font-semibold"
                asChild
              >
                <a href="https://youtube.com/@amitbharti" target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2" size={20} />
                  Watch on YouTube
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 rounded-xl font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                asChild
              >
                <a href="https://t.me/amitbhartiofficial" target="_blank" rel="noopener noreferrer">
                  <Users className="mr-2" size={20} />
                  Join Community
                </a>
              </Button>
            </div>

          </div>

          {/* Right Column - Profile & Stats */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}>
            
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>
                <img
                  src="https://i.postimg.cc/FRL4NYJd/amitbharti027-20250809-0001.jpg"
                  alt="Amit Bharti - YouTuber & Content Creator"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-primary/20"
                />
                {/* Floating Icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <Play size={24} fill="white" className="ml-1" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <TrendingUp size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`card-3d p-6 rounded-xl text-center transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color} bg-current/10`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;