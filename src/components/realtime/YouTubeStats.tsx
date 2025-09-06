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
        <div className="text-center text-muted-foreground">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No YouTube stats available</p>
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
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">
              {formatNumber(youtubeStats.subscriber_count)}
            </p>
            <p className="text-sm text-muted-foreground">Subscribers</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <Eye className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">
              {formatNumber(youtubeStats.view_count)}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>

          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
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