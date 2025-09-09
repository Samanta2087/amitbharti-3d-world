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
) ON CONFLICT (channel_id) DO UPDATE SET
  subscriber_count = EXCLUDED.subscriber_count,
  view_count = EXCLUDED.view_count,
  video_count = EXCLUDED.video_count,
  last_updated = EXCLUDED.last_updated;