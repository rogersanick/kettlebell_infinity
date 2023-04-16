import Layout from '@/components/layout/Layout';
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
      <main>
        <section className='overflow-x-hidden bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <div className='mt-16 flex flex-col'>
              <div className='font-sans text-7xl'>∞</div>
              <h1 className='mt-4 font-serif'>KettleBell Infinity</h1>
            </div>
            <div className='flex w-48 flex-row justify-between'>
              {/* <ButtonLink className='mt-24' href='/sign-in' variant='light'>
                Sign In
              </ButtonLink>
              <ButtonLink className='mt-24' href='/sign-up' variant='light'>
                Sign Up
              </ButtonLink> */}
            </div>
            {/* <Footer /> */}
          </div>
        </section>
      </main>
    </Layout>
  );
}
