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

const BlogPostForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          toast.error('Failed to fetch post details.');
          navigate('/admin/blogs');
        } else if (data) {
          setTitle(data.title);
          setContent(data.content);
          setExcerpt(data.excerpt || '');
          setCategory(data.category || '');
          setImageUrl(data.image_url || '');
          setPublished(data.published || false);
          setFeatured(data.featured || false);
        }
        setLoading(false);
      };
      fetchPost();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast.error("You must be logged in to create a post.");
        return;
    }
    setLoading(true);

    const postData = {
      title,
      content,
      excerpt,
      category,
      image_url: imageUrl,
      published,
      featured,
      author_id: user.id,
    };

    let error;

    if (isEditing) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert(postData);
      error = insertError;
    }

    if (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} post.`);
      console.error(error);
    } else {
      toast.success(`Post ${isEditing ? 'updated' : 'created'} successfully!`);
      navigate('/admin/blogs');
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
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Post Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="content">Content (Markdown supported)</Label>
                  <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
                  <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
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
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BlogPostForm;

