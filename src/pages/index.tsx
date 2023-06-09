import { Footer } from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  // TODO: Deployment to Vercel
  // TODO: Deploy to supabase
  // TODO: Auth
  // TODO: Saving workouts
  // TODO: Set / Rep
  // TODO: Workout Play View

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main className='h-full w-full'>
        <section className='h-full overflow-x-hidden bg-white'>
          <div className='relative flex h-full flex-col items-center justify-center py-12 text-center'>
            <div className='mt-16 flex flex-col'>
              <div className='font-sans text-7xl'>∞</div>
              <h1 className='mt-4 font-serif'>KettleBell Infinity</h1>
            </div>
            <ButtonLink
              className='mt-12 text-xl'
              href='/sign-in'
              variant='light'
            >
              Start
            </ButtonLink>
            <Footer />
          </div>
        </section>
      </main>
    </Layout>
  );
}
