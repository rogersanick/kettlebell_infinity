import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Footer } from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import LoadingIndicator from '@/components/LoadingIndicator';
import PlayButton from '@/components/PlayButton';
import Seo from '@/components/Seo';
import WorkoutTimeline from '@/components/WorkoutTimeline';

import { Exercises, getExercises, getWorkout, Workout } from '@/api/supabaseDB';

export default function HomePage() {
  // Existing workouts and exercises
  const [isLoading, setIsLoading] = useState(true);
  const [_, setError] = useState<string | undefined>();
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [__, setExercises] = useState<Exercises>([]);
  const { query } = useRouter();

  // Timer
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Get workouts and exercises
  useEffect(() => {
    if (query.id && typeof query.id === 'string') {
      getWorkout(query.id).then((workout) => {
        setWorkout(workout);
      });
      getExercises().then((exercises) => {
        setExercises(exercises);
      });
      setIsLoading(false);
    } else {
      setError('No workout ID provided.');
      setIsLoading(false);
    }
  }, [query]);

  // Start the timer
  useEffect(() => {
    if (!playing) {
      return;
    }
    const interval = setInterval(() => {
      if (workout) {
        if (seconds < workout.duration * 60) {
          setSeconds((prevSeconds: number) => prevSeconds + 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const handleClientTimeChange = (newCurrentSeconds: number) => {
    if (!workout) {
      return;
    }
    if (newCurrentSeconds > 0 && newCurrentSeconds <= workout.duration * 60) {
      if (newCurrentSeconds < 45) {
        setSeconds(0);
      } else if (newCurrentSeconds > workout.duration * 60 - 45) {
        setSeconds(workout.duration * 60);
      } else {
        setSeconds(newCurrentSeconds);
      }
    }
  };

  const router = useRouter();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-black'>
          <div className='layout relative flex min-h-screen flex-col'>
            <div className='flex h-screen w-full flex-col justify-between'>
              <div className='flex w-full flex-row justify-between self-start px-6 text-white'>
                <button type='button' onClick={() => router.back()}>
                  {`< Go Back`}
                </button>
                <div className='text-5xl'>∞</div>
              </div>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                workout && (
                  <>
                    {!playing && (
                      <PlayButton onClick={() => setPlaying(true)} />
                    )}
                    <WorkoutTimeline
                      setCurrentSeconds={handleClientTimeChange}
                      seconds={seconds}
                      workout={workout}
                    />
                  </>
                )
              )}
              <Footer />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
