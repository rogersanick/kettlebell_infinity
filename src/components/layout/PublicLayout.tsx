import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Loading from '@/components/Loading';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for auth
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const user = useUser();

  // Check for auth on page load
  useEffect(() => {
    setLoading(true);
    if (user) {
      void router.replace('/workouts');
    }
    setLoading(false);
  }, [user, router]);

  return <Layout>{loading ? <Loading /> : children}</Layout>;
}
