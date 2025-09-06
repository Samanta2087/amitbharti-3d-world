import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRealtimeComments } from '@/hooks/useRealtime';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Reply, Send } from 'lucide-react';

interface CommentSystemProps {
  postId?: string;
  className?: string;
}

export const CommentSystem = ({ postId, className }: CommentSystemProps) => {
  const { comments, addComment } = useRealtimeComments(postId);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    const { error } = await addComment(newComment, postId);
    if (!error) {
      setNewComment('');
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !user) return;

    const { error } = await addComment(replyContent, postId, parentId);
    if (!error) {
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const rootComments = comments.filter(comment => !comment.parent_id);
  const getReplies = (commentId: string) => 
    comments.filter(comment => comment.parent_id === commentId);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Add new comment */}
      {user && (
        <Card className="p-4 mb-6">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-3"
          />
          <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </Card>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {rootComments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.profiles?.avatar_url} />
                <AvatarFallback>
                  {comment.profiles?.display_name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {comment.profiles?.display_name || 'Anonymous'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at))} ago
                  </span>
                </div>
                
                <p className="text-sm mb-2">{comment.content}</p>
                
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyTo(comment.id)}
                    className="h-6 px-2"
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                )}

                {/* Reply form */}
                {replyTo === comment.id && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Reply
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyTo(null);
                          setReplyContent('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {getReplies(comment.id).map((reply) => (
                  <div key={reply.id} className="mt-3 ml-4 border-l-2 border-border pl-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.profiles?.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {reply.profiles?.display_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs">
                            {reply.profiles?.display_name || 'Anonymous'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.created_at))} ago
                          </span>
                        </div>
                        <p className="text-xs">{reply.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!user && (
        <Card className="p-4 text-center">
          <p className="text-muted-foreground">
            Please sign in to post comments
          </p>
        </Card>
      )}
    </div>
  );
};