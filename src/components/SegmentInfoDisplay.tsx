import { useEffect, useState } from 'react';

import { Exercises, SegmentJSONRepresentation } from '@/api/supabaseDB';

interface SegmentInfoDisplayProps {
  segmentTitle: string;
  segment: SegmentJSONRepresentation;
  exercises: Exercises;
  playing: boolean;
  currentTime: number;
}

const SegmentInfoDisplay = ({
  segmentTitle,
  segment,
  exercises,
  playing,
}: SegmentInfoDisplayProps) => {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  const [selectedExercise, setSelectedExercises] = useState(
    segment.exerciseIds[0]
  );

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center text-white ${
        playing ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <div
        className={`p-4 text-center font-serif text-2xl transition duration-500 ${
          hasStarted ? '-translate-y-8 transform' : ''
        }`}
      >
        {segmentTitle}
      </div>

      <div
        className={`py-2 font-serif text-xl transition-opacity duration-500 ${
          hasStarted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {segment.type}
      </div>
      <div
        className={`py-2 transition-opacity duration-500 ${
          hasStarted ? 'opacity-100' : 'opacity-0'
        }`}
      >
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
              >{`${selectedExercise === exercise?.id ? '> ' : ''}${
                exercise?.title
              }`}</div>
            )
          );
        })}
      </div>
    </div>
  );
};

export { SegmentInfoDisplay };
