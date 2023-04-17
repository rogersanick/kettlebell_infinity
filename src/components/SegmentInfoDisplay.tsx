import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { type MediaPlayerElement } from 'vidstack';

import Button from '@/components/buttons/Button';

import { Exercises, SegmentJSONRepresentation } from '@/api/supabaseDB';

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
      <div className='flex h-full w-full flex-col items-end justify-start text-white'>
        <div className='border-grey-200 z-50 mt-16 w-72 w-full rounded-lg bg-zinc-900 p-2 opacity-70'>
          <div className='text-center font-serif transition-opacity duration-500'>
            Exercises
          </div>
          <div className='max-width-full flex flex-row items-center justify-center overflow-x-auto py-2 transition-opacity duration-500'>
            {segment.exerciseIds.map((id, index) => {
              const exercise = exercises.find((exercise) => exercise.id === id);
              return (
                exercise && (
                  <Button
                    className={`mx-1 truncate font-sans ${
                      selectedExercise === exercise.id
                        ? 'border border-4 border-red-500'
                        : ''
                    }`}
                    variant='light'
                    onClick={() => {
                      setSelectedExercise(exercise.id);
                    }}
                    onTouchStart={() => {
                      setSelectedExercise(exercise.id);
                    }}
                    key={index}
                  >{`${processExerciseName(exercise?.title)}`}</Button>
                )
              );
            })}
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
