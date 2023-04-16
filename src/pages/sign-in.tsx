import { useRouter } from 'next/router';

import { Footer } from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  const router = useRouter();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center text-center'>
            <div className='flex w-full flex-row justify-between self-start px-6'>
              <button type='button' onClick={() => router.back()}>
                {`< Go Back`}
              </button>
              <div className='text-5xl'>∞</div>
            </div>
            <div className='flex h-[80vh] flex-row items-center justify-center'>
              <ButtonLink className='mt-24' href='/sign-up' variant='light'>
                Sign Up
              </ButtonLink>
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </Layout>
  );
}
