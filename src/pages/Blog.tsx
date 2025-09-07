import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { LiveBlogFeed } from "@/components/realtime/LiveBlogFeed";
import { CommentSystem } from "@/components/realtime/CommentSystem";
import { UserPresence } from "@/components/realtime/UserPresence";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const staticBlogPosts = [
    {
      id: 1,
      title: "Top 10 Online Earning Strategies for 2024",
      excerpt: "Discover proven methods to generate income online with these practical strategies that anyone can implement.",
      category: "Online Earning",
      author: "Amit Bharti",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "The Science Behind Ayurvedic Practices",
      excerpt: "Explore how ancient Ayurvedic wisdom is backed by modern scientific research and its benefits for modern health.",
      category: "Ayurveda",
      author: "Amit Bharti",
      date: "2024-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Best Tech Gadgets Under ₹10,000",
      excerpt: "Comprehensive review of the most value-for-money tech gadgets that won't break your budget.",
      category: "Tech Reviews",
      author: "Amit Bharti",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop"
    }
  ];

  const categories = ["All Posts", "Tech Reviews", "Online Earning", "Ayurveda", "Health & Wellness"];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            profiles(display_name)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (selectedCategory !== "All Posts") {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching blog posts:', error);
          setBlogPosts(staticBlogPosts); // Fallback to static posts
        } else {
          // Combine database posts with static posts
          const combinedPosts = [...(data || []), ...staticBlogPosts];
          setBlogPosts(combinedPosts);
        }
      } catch (error) {
        console.error('Error:', error);
        setBlogPosts(staticBlogPosts); // Fallback to static posts
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [selectedCategory]);

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dive deep into educational content, tech insights, and practical tips for personal and professional growth.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 focus:border-primary focus:outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        </div>

        {/* Featured Post */}
        {filteredPosts.filter(post => post.featured).map((post) => (
          <div key={post.id} className="card-3d rounded-2xl overflow-hidden mb-12 group cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(post.date || post.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.read_time ? `${post.read_time} min read` : (post.readTime || '5 min read')}
                  </span>
                  {(post.profiles?.display_name || post.author) && (
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {post.profiles?.display_name || post.author}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl lg:text-3xl font-poppins font-bold mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <Button variant="ghost" className="text-primary hover:text-accent">
                    Read More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Live Blog Feed */}
        <div className="mb-12">
          <LiveBlogFeed maxPosts={6} />
        </div>

        {/* User Presence */}
        <div className="mb-12">
          <UserPresence roomId="blog" className="text-center" />
        </div>

        {/* Global Comments Section */}
        <div className="mb-16">
          <CommentSystem className="max-w-4xl mx-auto" />
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 card-3d p-12 rounded-3xl text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest blog posts, insights, and educational content delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-card/50 focus:border-primary focus:outline-none"
            />
            <Button className="btn-glow px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;