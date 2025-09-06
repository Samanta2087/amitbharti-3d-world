import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRealtimeBlogPosts } from '@/hooks/useRealtime';
import { formatDistanceToNow } from 'date-fns';
import { Clock, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveBlogFeedProps {
  className?: string;
  maxPosts?: number;
}

export const LiveBlogFeed = ({ className, maxPosts = 10 }: LiveBlogFeedProps) => {
  const { blogPosts } = useRealtimeBlogPosts();
  
  const displayedPosts = blogPosts.slice(0, maxPosts);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
        <Badge variant="outline" className="animate-pulse">
          Live Updates
        </Badge>
      </div>

      {displayedPosts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No blog posts yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
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
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
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