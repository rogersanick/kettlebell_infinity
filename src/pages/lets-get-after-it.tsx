import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { type MediaPlayerElement } from 'vidstack';

import Layout from '@/components/layout/Layout';
import LoadingIndicator from '@/components/LoadingIndicator';
import PlayButton from '@/components/PlayButton';
import { SegmentInfoDisplay } from '@/components/SegmentInfoDisplay';
import Seo from '@/components/Seo';
import WorkoutTimeline from '@/components/WorkoutTimeline';

import {
  Exercises,
  getExercises,
  getWorkout,
  Workout,
  WorkoutSegmentsJSONRepresentation,
} from '@/api/supabaseDB';
import { getVideoURLs } from '@/api/supabaseStorage';

export default function DoTheWorkout() {
  // Existing workouts and exercises
  const [isLoading, setIsLoading] = useState(true);
  const [_, setError] = useState<string | undefined>();
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [exercises, setExercises] = useState<Exercises>([]);
  const { query } = useRouter();

  // Start to load video files for the workout
  const [videoURLs, setVideoURLs] = useState({} as { [key: string]: string });

  useEffect(() => {
    if (workout && exercises.length > 0) {
      const segments =
        workout.segments_with_exercises as WorkoutSegmentsJSONRepresentation;

      const allExercises = Object.keys(segments).flatMap((key) => {
        const segment = segments[key];
        return segment.exerciseIds.map((exerciseId: number) =>
          exercises.find((exercise) => exercise.id === exerciseId)
        );
      });

      allExercises.map((exercise) => exercise?.title_slug);

      getVideoURLs(allExercises.map((exercise) => exercise?.title_slug)).then(
        (retrievedURLs) => {
          const newVideoURLs = { ...videoURLs };
          for (const [key, value] of Object.entries(retrievedURLs)) {
            if (!newVideoURLs[key]) {
              newVideoURLs[key] = value;
            }
          }
          setVideoURLs(newVideoURLs);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workout, exercises]);

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

  // Current segment selection
  const [currentSegment, setCurrentSegment] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (workout) {
      const segments =
        workout.segments_with_exercises as WorkoutSegmentsJSONRepresentation;
      const segmentKeys = Object.keys(segments);
      const index = getCurrentDurationIndex(
        segmentKeys.map((seg) => {
          return segments[seg].duration;
        }),
        seconds
      );
      if (index !== null) {
        setCurrentSegment(segmentKeys[index]);
      }
    }
  }, [seconds, workout]);

  // Ref for video
  const vidRef = useRef<MediaPlayerElement | null>(null);
  const router = useRouter();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-black'>
          <div className='layout relative flex min-h-screen flex-col'>
            <div className='flex h-full w-full flex-col justify-between'>
              <div className='z-40 flex w-full flex-row justify-between self-start px-6 text-white'>
                <button type='button' onClick={() => router.back()}>
                  {`< Go Back`}
                </button>
                <div className='text-5xl'>∞</div>
              </div>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                workout &&
                currentSegment && (
                  <>
                    <WorkoutTimeline
                      setCurrentSeconds={handleClientTimeChange}
                      seconds={seconds}
                      workout={workout}
                      segment={
                        (
                          workout.segments_with_exercises as WorkoutSegmentsJSONRepresentation
                        )[currentSegment]
                      }
                    />
                    {!playing && (
                      <PlayButton
                        onClick={() => {
                          setPlaying(true);
                          vidRef.current?.play();
                        }}
                      />
                    )}
                    <SegmentInfoDisplay
                      pausePlayback={async () => {
                        if (playing) {
                          setPlaying(false);
                          try {
                            vidRef.current?.pause();
                          } catch (err) {
                            // eslint-disable-next-line no-console
                            console.log(err);
                          }
                        } else {
                          setPlaying(true);
                          try {
                            vidRef.current?.play();
                          } catch (err) {
                            // eslint-disable-next-line no-console
                            console.log(err);
                          }
                        }
                      }}
                      videoRef={vidRef}
                      exerciseURLs={videoURLs}
                      currentTime={seconds}
                      playing={playing}
                      segmentTitle={currentSegment}
                      segment={
                        (
                          workout.segments_with_exercises as WorkoutSegmentsJSONRepresentation
                        )[currentSegment]
                      }
                      exercises={exercises}
                    />
                  </>
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function getCurrentDurationIndex(
  durationsInMinutes: number[],
  targetInSeconds: number
): number | null {
  if (durationsInMinutes.length === 0 || targetInSeconds < 0) {
    return null;
  }

  let elapsedSeconds = 0;

  for (let index = 0; index < durationsInMinutes.length; index++) {
    const durationInSeconds = durationsInMinutes[index] * 60;
    elapsedSeconds += durationInSeconds;

    if (targetInSeconds < elapsedSeconds) {
      return index;
    }
  }

  return null;
}
