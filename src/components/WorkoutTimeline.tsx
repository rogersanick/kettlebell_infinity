import React, { useEffect, useRef, useState } from 'react';

import {
  SegmentJSONRepresentation,
  Workout,
  WorkoutSegmentsJSONRepresentation,
} from '@/api/supabaseDB';

interface Props {
  workout: Workout;
  seconds: number;
  setCurrentSeconds: (duration: number) => void;
  segment: SegmentJSONRepresentation;
}

const WorkoutTimeline: React.FC<Props> = ({
  workout,
  seconds,
  setCurrentSeconds,
  segment,
}) => {
  const segments =
    workout.segments_with_exercises as WorkoutSegmentsJSONRepresentation;
  const segmentKeys = Object.keys(segments);
  const totalDuration = segmentKeys.reduce(
    (acc, seg) => acc + segments[seg].duration,
    0
  );
  const totalDurationSeconds = totalDuration * 60;

  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && timelineRef.current) {
      const timelineWidth = timelineRef.current.clientWidth;
      const timelineLeft = timelineRef.current.getBoundingClientRect().left;
      const x = (event.clientX - timelineLeft) / timelineWidth;
      setCurrentSeconds(Math.round(x * totalDurationSeconds));
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (isDragging && timelineRef.current) {
      const timelineWidth = timelineRef.current.clientWidth;
      const timelineLeft = timelineRef.current.getBoundingClientRect().left;
      const x = (event.touches[0].clientX - timelineLeft) / timelineWidth;
      setCurrentSeconds(Math.round(x * totalDurationSeconds));
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', () => setIsDragging(false));
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  });

  const leftPercentage = Math.min(
    Math.max((seconds / totalDurationSeconds) * 100, 0),
    100
  );
  const leftPosition = `calc(${leftPercentage}% - ${
    leftPercentage / 100
  } * 3rem)`;

  return (
    <div
      ref={timelineRef}
      className='absolute bottom-6 z-40 flex w-full flex-col items-center opacity-70'
    >
      <div
        className='relative mb-2 flex min-w-fit flex-row flex-col items-center justify-end self-start rounded-lg border-slate-300'
        style={{
          left: leftPosition,
        }}
      >
        <div className='font-serif text-white'>{segment.type}</div>
        <button
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseDown={() => setIsDragging(true)}
          className='flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-900'
        >
          <div className='pointer-events-none text-center align-middle text-xl text-white'>
            ∞
          </div>
        </button>
      </div>
      <div className='flex h-12 w-full flex-row rounded-lg bg-slate-300 md:h-16 landscape:h-8'>
        {segmentKeys.map((segmentKey, index) => {
          const segment = segments[segmentKey];
          return (
            <div
              key={index}
              style={{ width: (segment.duration / totalDuration) * 100 + '%' }}
              className='flex items-center justify-center rounded-md border border-2'
            >
              <div className='font-semi-bold truncate text-center align-middle font-serif text-sm'>{`${segmentKey}`}</div>
            </div>
          );
        })}
      </div>
      <div className='mt-2 text-white'>{`${formatSeconds(
        seconds
      )}/${formatSeconds(totalDurationSeconds)}`}</div>
    </div>
  );
};

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

export default WorkoutTimeline;
