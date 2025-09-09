import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useRealtimeBlogPosts } from '@/hooks/useRealtime';
import { formatDistanceToNow } from 'date-fns';
import { Clock, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialShare } from '@/components/SocialShare';

interface LiveBlogFeedProps {
  className?: string;
  maxPosts?: number;
  showSkeleton?: boolean;
}

export const LiveBlogFeed = ({ className, maxPosts = 10, showSkeleton = false }: LiveBlogFeedProps) => {
  const { blogPosts } = useRealtimeBlogPosts();
  
  const displayedPosts = blogPosts.slice(0, maxPosts);

  if (showSkeleton || (blogPosts.length === 0 && !showSkeleton)) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        <Badge variant="outline" className="animate-pulse">
          Live Updates
        </Badge>
      </div>

      {displayedPosts.length === 0 ? (
        <Card className="p-12 text-center bg-gradient-to-br from-muted/50 to-muted/30">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground">Be the first to know when new content drops!</p>
            </div>
            <Button variant="outline" className="mt-4">
              Get Notified
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedPosts.map((post, index) => (
            <Card key={post.id} className={`p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } ${post.featured ? 'ring-2 ring-primary/20' : ''}`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.profiles?.avatar_url} />
                      <AvatarFallback>
                        {post.profiles?.display_name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {post.profiles?.display_name || 'Anonymous'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(post.created_at))} ago
                        {post.read_time && (
                          <>
                            <span>•</span>
                            <span>{post.read_time} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {post.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {post.category && (
                      <Badge variant="outline">{post.category}</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  {post.image_url && (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                      Read More
                    </Button>
                    <SocialShare 
                      url={`${window.location.origin}/blog/${post.id}`}
                      title={post.title}
                      description={post.excerpt}
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                      <Eye className="h-3 w-3" />
                      <span>View Post</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};