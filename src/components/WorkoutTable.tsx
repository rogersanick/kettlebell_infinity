import { Workouts } from '@/api/supabaseDB';

interface WorkoutTableProps {
  workouts: Workouts;
}

const WorkoutTable = (props: WorkoutTableProps) => {
  const { workouts } = props;
  return (
    <div className='relative max-h-[50vh] min-w-full overflow-x-auto overflow-y-auto'>
      <table className='w-full table-fixed text-left text-sm text-gray-500'>
        <thead className='sticky top-0 bg-gray-50 text-xs uppercase text-gray-700'>
          <tr className='sticky top-0'>
            <th scope='col' className='w-1/3 px-4 py-2 text-left'>
              Title
            </th>
            <th scope='col' className='px-4 py-2 text-left'>
              Duration
            </th>
            <th scope='col' className='px-4 py-2 text-left'>
              Muscle Groups
            </th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => {
            return (
              <tr key={index} className='border-b bg-white hover:bg-gray-100'>
                <td className='border px-4 py-2 font-serif text-2xl text-black'>
                  {workout.title}
                </td>
                <td className='border px-4 py-2'>{workout.duration}</td>
                <td className='border px-4 py-2'>
                  {workout.muscles_targeted.join(', ')}
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
