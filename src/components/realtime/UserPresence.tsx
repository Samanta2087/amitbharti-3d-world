import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUserPresence } from '@/hooks/useRealtime';
import { Users } from 'lucide-react';

interface UserPresenceProps {
  roomId: string;
  className?: string;
}

export const UserPresence = ({ roomId, className }: UserPresenceProps) => {
  const { onlineUsers } = useUserPresence(roomId);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4" />
        <span className="text-sm font-medium">
          Online ({onlineUsers.length})
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {onlineUsers.slice(0, 5).map((user) => (
          <div key={user.user_id} className="relative">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-xs">
                {user.display_name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
          </div>
        ))}
        
        {onlineUsers.length > 5 && (
          <Badge variant="secondary" className="text-xs">
            +{onlineUsers.length - 5}
          </Badge>
        )}
      </div>

      {onlineUsers.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No users online
        </p>
      )}
    </div>
  );
};