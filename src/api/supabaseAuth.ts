import { getSupabase } from '@/api/supabaseClient';

const signUpWithEmail = async (email: string, password: string) => {
  const supabase = getSupabase();
  return await supabase.auth.signUp({
    email,
    password,
  });
};

async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabase();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

async function signOut() {
  const supabase = getSupabase();
  return await supabase.auth.signOut();
}

export { signInWithEmail, signOut, signUpWithEmail };
