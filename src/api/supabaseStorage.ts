import { createClient } from '@supabase/supabase-js';

import { Database } from '@/lib/database.types';

// Initialize Supabase Client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const getVideoURLs = async (videoSlugs: (string | undefined)[]) => {
  const results = await Promise.all(
    videoSlugs.map(async (videoSlug) => {
      if (!videoSlug) {
        return [videoSlug, null];
      }

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
