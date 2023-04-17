import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import { useState } from 'react';
import React from 'react';
import { type MediaPlayerElement } from 'vidstack';

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
  videoRef,
  pausePlayback,
  exerciseURLs,
  segment,
  exercises,
}: SegmentInfoDisplayProps) => {
  const [selectedExercise, setSelectedExercises] = useState(
    segment.exerciseIds[0]
  );

  const getExerciseURL = (exerciseId: number) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    return exerciseURLs[exercise?.title_slug || ''];
  };

  return (
    <>
      <div className='flex h-full w-full flex-col items-end justify-start text-white'>
        <div className='border-grey-200 z-50 mt-12 w-72 rounded-lg bg-zinc-900 p-6 opacity-80'>
          <div className='py-2 transition-opacity duration-500'>
            {segment.exerciseIds.map((id, index) => {
              const exercise = exercises.find((exercise) => exercise.id === id);
              return (
                exercise && (
                  <div
                    className='text-lg'
                    onClick={() => {
                      setSelectedExercises(exercise.id);
                    }}
                    onTouchStart={() => {
                      setSelectedExercises(exercise.id);
                    }}
                    key={index}
                  >{`${
                    selectedExercise === exercise?.id ? '> ' : ''
                  }${processExerciseName(exercise?.title)}`}</div>
                )
              );
            })}
          </div>
          <div className='py-2 text-center font-serif transition-opacity duration-500'>
            {segment.type}
          </div>
        </div>
      </div>
      <div
        onClick={pausePlayback}
        className='w-max-screen fixed inset-0 flex w-full items-center justify-center'
      >
        <div className='relative z-10 h-full w-screen bg-gradient-to-r from-zinc-900 via-transparent via-20%' />
        <div className='relative z-10 h-full w-screen bg-gradient-to-l from-zinc-900 via-transparent via-20%' />
        {getExerciseURL(selectedExercise) && (
          <MediaPlayer
            onClick={pausePlayback}
            ref={videoRef}
            src={getExerciseURL(selectedExercise)}
          >
            {/* ^ remove `controls` attribute if you're designing a custom UI */}
            <MediaOutlet />
          </MediaPlayer>
        )}
      </div>
    </>
  );
};

export { SegmentInfoDisplay };

const processExerciseName = (name: string) => {
  const split = name.split(' ');
  if (split[0] === 'Kettlebell') {
    // remove the first element of the array and then return the remainder joined with a space
    return split.slice(1).join(' ');
  } else {
    return name;
  }
};
