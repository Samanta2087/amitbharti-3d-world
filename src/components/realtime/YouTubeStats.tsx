import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealtimeYoutubeStats } from '@/hooks/useRealtime';
import { formatDistanceToNow } from 'date-fns';
import { Users, Eye, Video, TrendingUp } from 'lucide-react';

interface YouTubeStatsProps {
  className?: string;
}

export const YouTubeStats = ({ className }: YouTubeStatsProps) => {
  const { youtubeStats } = useRealtimeYoutubeStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!youtubeStats) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="h-5 bg-muted rounded w-12"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center p-4 bg-accent/50 rounded-lg">
                <div className="h-6 w-6 bg-muted rounded mx-auto mb-2"></div>
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">YouTube Channel Stats</h3>
          <Badge variant="outline" className="animate-pulse">
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-all duration-300 hover:scale-105 group">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <p className="text-2xl font-bold">
              {formatNumber(youtubeStats.subscriber_count)}
            </p>
            <p className="text-sm text-muted-foreground">Subscribers</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-all duration-300 hover:scale-105 group">
            <Eye className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <p className="text-2xl font-bold">
              {formatNumber(youtubeStats.view_count)}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-all duration-300 hover:scale-105 group">
            <Video className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <p className="text-2xl font-bold">
              {youtubeStats.video_count}
            </p>
            <p className="text-sm text-muted-foreground">Videos</p>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-2 border-t">
          Last updated: {formatDistanceToNow(new Date(youtubeStats.last_updated))} ago
        </div>
      </div>
    </Card>
  );
};