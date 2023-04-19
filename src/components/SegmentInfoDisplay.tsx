import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { type MediaPlayerElement } from 'vidstack';

import Button from '@/components/buttons/Button';

import { Exercises, SegmentJSONRepresentation } from '@/api/supabaseDB';
import calculateWeightAndReps from '@/weight_rep_selection';

interface SegmentInfoDisplayProps {
  videoRef: React.RefObject<MediaPlayerElement>;
  pausePlayback: () => void;
  exerciseURLs: { [key: string]: string };
  segmentTitle: string;
  segment: SegmentJSONRepresentation;
  exercises: Exercises;
  playing: boolean;
  currentTime: number;
}

const SegmentInfoDisplay = ({
  playing,
  videoRef,
  pausePlayback,
  exerciseURLs,
  segment,
  exercises,
}: SegmentInfoDisplayProps) => {
  const [selectedExercise, setSelectedExercise] = useState(
    segment.exerciseIds[0]
  );

  const getExerciseURL = (exerciseId: number) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    return exerciseURLs[exercise?.title_slug || ''];
  };

  useEffect(() => {
    setSelectedExercise(segment.exerciseIds[0]);
  }, [segment]);

  return (
    <div className='absolute inset-0'>
      <div className='flex w-full justify-center'>
        <div className='flex h-full w-full flex-col items-end justify-start text-white landscape:w-2/3'>
          <div className='border-grey-200 z-50 mt-16 w-72 w-full rounded-lg bg-zinc-900 p-1 opacity-70 landscape:mt-12 landscape:mt-4'>
            <div className='text-center font-serif transition-opacity duration-500 landscape:hidden'>
              Exercises
            </div>
            <div className='max-width-full flex flex-row items-center justify-center overflow-x-auto transition-opacity duration-500'>
              {segment.exerciseIds.map((id, index) => {
                const exercise = exercises.find(
                  (exercise) => exercise.id === id
                );
                if (!exercise) return null;
                const { reps, weight } = calculateWeightAndReps({
                  exerciseTitle: exercise.title,
                  bodyWeightKGs: 180 / 2.2,
                  maxBodyWeightPercentage: exercise.max_bodyweight_percentage,
                  minBodyWeightPercentage: exercise.min_bodyweight_percentage,
                  maxReps: exercise.max_recommended_reps || 0,
                  minReps: exercise.min_recommended_reps || 12,
                  skillLevel: 'Intermediate',
                  isBodyWeight: exercise.is_body_weight,
                  availableWeights: [
                    4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
                  ],
                });
                return (
                  <div
                    key={index}
                    className={`m-1 rounded-xl font-sans ${
                      selectedExercise === exercise.id
                        ? 'w-auto whitespace-nowrap'
                        : 'max-w-1/4 truncate'
                    }`}
                  >
                    <Button
                      className={`${
                        selectedExercise === exercise.id
                          ? 'border border-4 border-red-500 transition-all duration-300'
                          : ''
                      } h-8`}
                      variant='light'
                      onClick={() => {
                        setSelectedExercise(exercise.id);
                      }}
                      onTouchStart={() => {
                        setSelectedExercise(exercise.id);
                      }}
                      key={index}
                    >{`${processExerciseName(exercise?.title)}`}</Button>
                    <div className='mt-1 truncate text-center text-xs'>
                      Reps: {reps}
                    </div>
                    <div className='truncate text-center text-xs'>
                      {`${weight} KG`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={pausePlayback}
        className='w-max-screen fixed inset-0 flex w-full items-center justify-center'
      >
        <div className='absolute z-50 h-full w-screen bg-gradient-to-r from-zinc-900 via-transparent via-15%' />
        <div className='absolute z-50 h-full w-screen bg-gradient-to-l from-zinc-900 via-transparent via-15%' />
        {getExerciseURL(selectedExercise) && (
          <MediaPlayer
            loop
            className='z-10'
            autoplay={playing}
            onClick={pausePlayback}
            ref={videoRef}
            src={getExerciseURL(selectedExercise)}
            playsinline
            muted
          >
            {/* ^ remove `controls` attribute if you're designing a custom UI */}
            <MediaOutlet />
          </MediaPlayer>
        )}
      </div>
    </div>
  );
};

export { SegmentInfoDisplay };

const processExerciseName = (name: string) => {
  const split = name.split(' ');
  if (split[0] === 'Kettlebell') {
    // remove the first element of the array and then return the remainder joined with a space
    return split.slice(1).join(' ').toUpperCase();
  } else {
    return name.toUpperCase();
  }
};
