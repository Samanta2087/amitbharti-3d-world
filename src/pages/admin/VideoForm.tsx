import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const VideoForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchVideo = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('videos').select('*').eq('id', id).single();
        if (error) {
          toast.error('Failed to fetch video details.');
          navigate('/admin/videos');
        } else if (data) {
          setTitle(data.title);
          setDescription(data.description || '');
          setVideoUrl(data.video_url || '');
          setThumbnailUrl(data.thumbnail_url || '');
          setCategory(data.category || '');
          setPublished(data.published || false);
          setFeatured(data.featured || false);
        }
        setLoading(false);
      };
      fetchVideo();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast.error("You must be logged in to manage videos.");
        return;
    }
    setLoading(true);

    const videoData = {
      title,
      description,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      category,
      published,
      featured,
      author_id: user.id,
    };

    const { error } = isEditing
      ? await supabase.from('videos').update(videoData).eq('id', id)
      : await supabase.from('videos').insert(videoData);

    if (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} video.`);
    } else {
      toast.success(`Video ${isEditing ? 'updated' : 'added'} successfully!`);
      navigate('/admin/videos');
    }
    setLoading(false);
  };
  
  if (loading && isEditing) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Video' : 'Add New Video'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Video Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="videoUrl">YouTube URL</Label>
                  <Input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch id="published" checked={published} onCheckedChange={setPublished} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                </div>
                 <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
                  <Input id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
                </div>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Video' : 'Add Video'}
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default VideoForm;