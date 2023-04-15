import React from 'react';
import { WorkoutOverview } from 'supabase/functions/generate_workout';

interface TimelineSegmentProps {
  durationPercentage: number;
  title: string;
  type: string;
  duration: number;
  selected?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

const TimelineSegment = ({
  durationPercentage,
  title,
  type,
  duration,
  selected,
  onClick,
  showDetails = true,
}: TimelineSegmentProps) => {
  const segmentWidth = `${durationPercentage}%`;
  return (
    <div
      onClick={onClick}
      style={{ width: segmentWidth }}
      className={`flex flex-col items-center justify-center ${
        selected ? 'border-gray-400 bg-gray-200' : 'bg-gray-100'
      } mx-1 ${
        showDetails ? 'h-32' : 'h-24'
      } min-w-[6rem] rounded-md border border-2 hover:bg-gray-200`}
    >
      <div
        className={`flex ${
          showDetails ? 'h-[50%]' : 'h-[75%]'
        } items-center justify-center`}
      >
        <div className='text-md font-semi-bold text-center align-middle'>{`${title}`}</div>
      </div>

      <div className='h-[25%] align-middle text-xs text-gray-800'>{`${type}`}</div>

      {showDetails && (
        <div className='h-[25%] align-middle text-xs text-gray-800'>{`${duration}: Minutes`}</div>
      )}
    </div>
  );
};

interface TimelineProps {
  workoutOverview: WorkoutOverview;
  selectedSegment?: string;
  setSelectedSegment: (segment: string) => void;
  showDetails?: boolean;
}

const SegmentTimeline = ({
  workoutOverview,
  selectedSegment,
  setSelectedSegment,
  showDetails = true,
}: TimelineProps) => {
  const segments = workoutOverview.segments;
  const totalDuration = segments.reduce(
    (acc, { duration }) => acc + duration,
    0
  );

  return (
    <div className='my-2 flex flex-row overflow-x-auto '>
      {segments.map((segment, index) => (
        <TimelineSegment
          key={index}
          title={segment.title}
          type={segment.type}
          duration={segment.duration}
          durationPercentage={(segment.duration / totalDuration) * 100}
          onClick={() => setSelectedSegment(segment.title)}
          selected={selectedSegment === segment.title}
          showDetails={showDetails}
        />
      ))}
    </div>
  );
};

export { SegmentTimeline };
