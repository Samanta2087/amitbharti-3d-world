-- Add sample YouTube stats data
INSERT INTO public.youtube_stats (
  channel_id,
  subscriber_count,
  view_count,
  video_count,
  last_updated
) VALUES (
  'UCxxxxxxxxxxxxxx',
  120000,
  5200000,
  350,
  now()
);