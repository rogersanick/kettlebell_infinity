import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/router';

import { Footer } from '@/components/Footer';
import PublicLayout from '@/components/layout/PublicLayout';
import Seo from '@/components/Seo';

import { getSupabase } from '@/api/supabaseClient';

export default function HomePage() {
  const supabaseClient = getSupabase();
  const router = useRouter();

  return (
    <PublicLayout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main className='h-full w-full'>
        <section className='h-full w-full bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center text-center'>
            <div className='flex w-full flex-row justify-between self-start px-6'>
              <button type='button' onClick={() => router.back()}>
                {`< Go Back`}
              </button>
              <div className='text-5xl'>∞</div>
            </div>
            <div className='flex h-[80vh] w-screen flex-col items-center justify-center py-24'>
              <Auth
                supabaseClient={supabaseClient}
                providers={['google']}
                appearance={{
                  theme: ThemeSupa,
                }}
              />
              <div className='absolute bottom-2 m-8 w-full font-serif text-xs'>
                <div className='m-2'>Just here for a demo?</div>
                <div className='m-2'>username: supabase@rocksmysocks.com</div>
                <div className='m-2'>password: forrealforreal</div>
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

// const getURL = () => {
//   let url =
//     process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
//     process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
//     'http://localhost:3000/';
//   // Make sure to include `https://` when not localhost.
//   url = url.includes('http') ? url : `https://${url}`;
//   // Make sure to including trailing `/`.
//   url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
//   return url;
// };
