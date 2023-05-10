import { getSupabase } from '@/api/supabaseClient';

async function signOut(callback: () => void) {
  const supabase = getSupabase();
  await supabase.auth.signOut();
  callback();
}

export { signOut };
