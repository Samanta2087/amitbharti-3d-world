-- Drop existing foreign key constraints that point to auth.users
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;
ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_author_id_fkey;

-- Add new foreign key constraints that point to profiles.user_id
ALTER TABLE public.blog_posts 
ADD CONSTRAINT blog_posts_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.comments 
ADD CONSTRAINT comments_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;