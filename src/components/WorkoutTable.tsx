import Button from '@/components/buttons/Button';

import { WorkoutOverview } from '@/api/supabase';

interface WorkoutTableProps {
  workouts: WorkoutOverview[];
}

const WorkoutTable = (props: WorkoutTableProps) => {
  const { workouts } = props;
  return (
    <div className='relative max-h-[50vh] min-w-full overflow-x-auto overflow-y-auto'>
      <table className='w-full table-fixed text-left text-sm text-gray-500'>
        <thead className='sticky top-0 bg-gray-50 text-xs uppercase text-gray-700'>
          <tr className='sticky top-0'>
            <th scope='col' className='px-4 py-2 text-left'>
              Title
            </th>
            <th scope='col' className='px-4 py-2 text-left'>
              Description
            </th>
            <th scope='col' className='px-4 py-2 text-left'>
              Duration
            </th>
            <th scope='col' className='px-4 py-2 text-left'>
              Segments
            </th>
            <th scope='col' className='px-4 py-2 text-left'></th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => {
            return (
              <tr key={index} className='border-b bg-white hover:bg-gray-100'>
                <td className='border px-4 py-2'>{workout.title}</td>
                <td className='border px-4 py-2'>{workout.description}</td>
                <td className='border px-4 py-2'>{workout.duration}</td>
                <td className='whitespace-pre-wrap border px-4 py-2'>
                  {workout.segments.map(
                    (segment) => `${segment.title}: ${segment.duration} Mins\n`
                  )}
                </td>
                <td className='whitespace-pre-wrap border px-4 py-2 text-center'>
                  <Button>Start</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {workouts.length === 0 ? (
        <div className='py-8'>
          No Workouts Generated. Click "Generate Workout" to get started.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WorkoutTable;
