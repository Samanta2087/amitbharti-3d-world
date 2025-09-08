-- Add foreign key constraints to establish relationships
ALTER TABLE public.blog_posts 
ADD CONSTRAINT blog_posts_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

ALTER TABLE public.comments 
ADD CONSTRAINT comments_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;