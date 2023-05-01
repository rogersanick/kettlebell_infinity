import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Loading from '@/components/Loading';

import { getSupabase } from '@/api/supabaseClient';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for auth
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Check for auth on page load
  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then((session) => {
        if (!session.data.session) {
          void router.replace('/');
        } else {
          setLoading(false);
        }
      });
  }, [router]);

  // Listen for future changes for auth
  useEffect(() => {
    getSupabase().auth.onAuthStateChange((_, session) => {
      if (!session) {
        void router.replace('/');
      } else {
        setLoading(false);
      }
    });
  });

  return <Layout>{loading ? <Loading /> : children}</Layout>;
}
