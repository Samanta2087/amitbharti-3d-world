import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VideoManagement = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, created_at, published, featured, category')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch videos.');
      console.error(error);
    } else {
      setVideos(data);
    }
    setLoading(false);
  };

  const deleteVideo = async (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video entry? This does not delete the video from YouTube.')) {
      const { error } = await supabase.from('videos').delete().eq('id', videoId);
      if (error) {
        toast.error('Failed to delete video entry.');
      } else {
        toast.success('Video entry deleted successfully.');
        fetchVideos();
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Video Management</h1>
        <Button asChild>
          <Link to="/admin/videos/new">
            <Plus className="mr-2 h-4 w-4" />
            New Video
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Videos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>{video.category}</TableCell>
                    <TableCell>
                      <Badge variant={video.published ? 'default' : 'secondary'}>
                        {video.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{video.featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{new Date(video.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/videos/edit/${video.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteVideo(video.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default VideoManagement;