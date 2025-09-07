import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Video, 
  MessageSquare, 
  TrendingUp,
  Plus,
  BarChart3,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalVideos: number;
  totalMessages: number;
  recentActivity: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalVideos: 0,
    totalMessages: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, blogsRes, videosRes, messagesRes] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact' }),
          supabase.from('blog_posts').select('id', { count: 'exact' }),
          supabase.from('videos').select('id', { count: 'exact' }),
          supabase.from('contacts').select('id', { count: 'exact' })
        ]);

        // Fetch recent activity
        const { data: recentBlogs } = await supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalUsers: usersRes.count || 0,
          totalBlogs: blogsRes.count || 0,
          totalVideos: videosRes.count || 0,
          totalMessages: messagesRes.count || 0,
          recentActivity: recentBlogs || []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered users',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      icon: FileText,
      description: 'Published articles',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Videos',
      value: stats.totalVideos,
      icon: Video,
      description: 'Uploaded videos',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      description: 'Contact submissions',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const quickActions = [
    { title: 'Create Blog Post', href: '/admin/blogs/new', icon: FileText },
    { title: 'Upload Video', href: '/admin/videos/new', icon: Video },
    { title: 'View Messages', href: '/admin/messages', icon: MessageSquare },
    { title: 'User Management', href: '/admin/users', icon: Users }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back!</h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your website today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="btn-glow">
              <Link to="/admin/blogs/new">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="card-3d">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? '...' : stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks to manage your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link to={action.href}>
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.title}
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest blog posts and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
                    </div>
                  ))}
                </div>
              ) : stats.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentActivity.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Overview
            </CardTitle>
            <CardDescription>
              Website performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Site Uptime</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-success/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-success">2.4s</div>
                <div className="text-sm text-muted-foreground">Avg Load Time</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-accent">85</div>
                <div className="text-sm text-muted-foreground">Performance Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;