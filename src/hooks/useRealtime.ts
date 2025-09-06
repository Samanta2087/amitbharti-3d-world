import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  blog_post_id?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name?: string;
    avatar_url?: string;
  } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_id: string;
  category?: string;
  featured: boolean;
  published: boolean;
  image_url?: string;
  read_time?: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name?: string;
    avatar_url?: string;
  } | null;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message?: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export interface YoutubeStats {
  id: string;
  channel_id: string;
  subscriber_count: number;
  view_count: number;
  video_count: number;
  last_updated: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  is_online: boolean;
  last_seen: string;
  created_at: string;
  updated_at: string;
}

export const useRealtimeComments = (postId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      const query = supabase
        .from('comments')
        .select(`
          *,
          profiles!comments_author_id_fkey (display_name, avatar_url)
        `)
        .order('created_at', { ascending: true });

      if (postId) {
        query.eq('blog_post_id', postId);
      }

      const { data } = await query;
      if (data) setComments(data as any);
    };

    fetchComments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          ...(postId && { filter: `blog_post_id=eq.${postId}` })
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments(prev => [...prev, payload.new as Comment]);
          } else if (payload.eventType === 'UPDATE') {
            setComments(prev => prev.map(comment => 
              comment.id === payload.new.id ? payload.new as Comment : comment
            ));
          } else if (payload.eventType === 'DELETE') {
            setComments(prev => prev.filter(comment => comment.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const addComment = async (content: string, blogPostId?: string, parentId?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('comments')
      .insert({
        content,
        author_id: user.id,
        blog_post_id: blogPostId,
        parent_id: parentId
      });

    return { error };
  };

  return { comments, addComment };
};

export const useRealtimeBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch initial blog posts
    const fetchBlogPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!blog_posts_author_id_fkey (display_name, avatar_url)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data) setBlogPosts(data as any);
    };

    fetchBlogPosts();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('blog-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts',
          filter: 'published=eq.true'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBlogPosts(prev => [payload.new as BlogPost, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBlogPosts(prev => prev.map(post => 
              post.id === payload.new.id ? payload.new as BlogPost : post
            ));
          } else if (payload.eventType === 'DELETE') {
            setBlogPosts(prev => prev.filter(post => post.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { blogPosts };
};

export const useRealtimeNotifications = (userId?: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Fetch initial notifications
    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data) setNotifications(data);
    };

    fetchNotifications();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications(prev => [payload.new as Notification, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setNotifications(prev => prev.map(notif => 
              notif.id === payload.new.id ? payload.new as Notification : notif
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    return { error };
  };

  return { notifications, markAsRead };
};

export const useRealtimeYoutubeStats = () => {
  const [youtubeStats, setYoutubeStats] = useState<YoutubeStats | null>(null);

  useEffect(() => {
    // Fetch initial YouTube stats
    const fetchYoutubeStats = async () => {
      const { data } = await supabase
        .from('youtube_stats')
        .select('*')
        .order('last_updated', { ascending: false })
        .limit(1)
        .single();

      if (data) setYoutubeStats(data);
    };

    fetchYoutubeStats();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('youtube-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'youtube_stats'
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setYoutubeStats(payload.new as YoutubeStats);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { youtubeStats };
};

export const useUserPresence = (roomId: string) => {
  const [onlineUsers, setOnlineUsers] = useState<Profile[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const presenceChannel = supabase.channel(`presence-${roomId}`);

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = presenceChannel.presenceState();
        const users: Profile[] = [];
        
        Object.keys(presenceState).forEach((key) => {
          const presences = presenceState[key];
          if (presences && presences.length > 0) {
            const presence = presences[0] as any;
            if (presence.user_id) {
              users.push(presence);
            }
          }
        });
        
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', user.id)
              .single();

            if (profile) {
              await presenceChannel.track({
                user_id: user.id,
                display_name: profile.display_name,
                avatar_url: profile.avatar_url,
                online_at: new Date().toISOString(),
              });
            }
          }
        }
      });

    setChannel(presenceChannel);

    return () => {
      if (presenceChannel) {
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [roomId]);

  return { onlineUsers, channel };
};