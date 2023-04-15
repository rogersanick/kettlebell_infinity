import { Exercises, SegmentJSONRepresentation } from '@/api/supabaseDB';

interface SegmentInfoDisplayProps {
  segmentTitle: string;
  segment: SegmentJSONRepresentation;
  exercises: Exercises;
}

const SegmentInfoDisplay = ({
  segmentTitle,
  segment,
  exercises,
}: SegmentInfoDisplayProps) => {
  return (
    <div className='mb-32 flex flex-col items-center justify-center text-white'>
      <div className='p-4 text-center font-serif text-2xl'>{segmentTitle}</div>
      <div className='p-4 font-serif'>{segment.type}</div>
      <div className='p-4'>
        {segment.exerciseIds.map((id, index) => {
          const exercise = exercises.find((exercise) => exercise.id === id);
          return <div key={index}>{`${exercise?.title}, `}</div>;
        })}
      </div>
    </div>
  );
};

export { SegmentInfoDisplay };
