import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import { Footer } from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import { NewWorkoutModal } from '@/components/NewWorkoutModal/NewWorkoutModal';
import Seo from '@/components/Seo';
import WorkoutTable from '@/components/WorkoutTable';

import { Exercises, getExercises, WorkoutOverview } from '@/api/supabase';

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
  // Existing workouts and exercises
  const [workoutOverviews] = useState<WorkoutOverview[]>([]);
  const [exercises, setExercises] = useState<Exercises | undefined>();

  // Creating a new workout
  const [newWorkoutModalOpen, setNewWorkoutModalOpen] = useState(false);

  useEffect(() => {
    getExercises().then((exercises) => {
      setExercises(exercises);
    });
  }, []);

  const router = useRouter();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <NewWorkoutModal
          exercises={exercises || []}
          isOpen={newWorkoutModalOpen}
          onClose={() => setNewWorkoutModalOpen(!newWorkoutModalOpen)}
        />
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <div className='flex w-full flex-row justify-between self-start px-6'>
              <button type='button' onClick={() => router.back()}>
                {`< Go Back`}
              </button>
              <div className='text-5xl'>∞</div>
            </div>
            <div className='layout relative flex h-[80vh] flex-col items-center justify-between py-12 text-center'>
              <h1 className='mt-4'>Your Workouts</h1>
              <WorkoutTable workouts={workoutOverviews} />
              <Button
                className='mb-24 mt-6'
                onClick={() => {
                  setNewWorkoutModalOpen(true);
                }}
                variant='light'
              >
                Generate Workout
              </Button>
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </Layout>
  );
}

// Loading button
{
  /* <Button className='mt-6' onClick={() => { if (!loading) newWorkout() }} variant='light'>
{loading ? <><svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
</svg> Loading...</> : "New Workout"}
</Button> */
}
