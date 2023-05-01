import { getSupabase } from '@/api/supabaseClient';

const getVideoURLs = async (videoSlugs: (string | undefined)[]) => {
  const results = await Promise.all(
    videoSlugs.map(async (videoSlug) => {
      if (!videoSlug) {
        return [videoSlug, null];
      }

      const supabase = getSupabase();
      const result = await supabase.storage
        .from('exercise-videos')
        .getPublicUrl(`${videoSlug}.mp4`);
      const { publicUrl } = result.data;
      return [videoSlug, publicUrl];
    })
  );
  return Object.fromEntries(results) as Record<string, string>;
};

export { getVideoURLs };
