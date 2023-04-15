import { faEdit, faEnvelope, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import { deleteWorkout, Workouts } from '@/api/supabaseDB';

interface WorkoutTableProps {
  workouts: Workouts;
  refreshWorkouts: () => void;
  removeWorkoutFromTable: (workoutId: number) => void;
}

const WorkoutTable = (props: WorkoutTableProps) => {
  const router = useRouter();
  const { workouts, refreshWorkouts, removeWorkoutFromTable } = props;

  const handleDeleteWorkout = async (workoutId: number) => {
    removeWorkoutFromTable(workoutId);
    await deleteWorkout(workoutId);
    refreshWorkouts();
  };

  return (
    <div className='relative max-h-[70vh] min-w-full overflow-x-auto overflow-y-auto'>
      <table className='w-full table-auto text-left text-sm text-gray-500'>
        <thead className='sticky top-0 bg-gray-50 text-xs uppercase text-gray-700'>
          <tr className='sticky top-0'>
            <th scope='col' className='w-7/8 px-4 py-2 text-left'>
              Title
            </th>
            <th
              scope='col'
              className='hidden w-1/5 px-4 py-2 text-left md:table-cell'
            >
              Description
            </th>
            <th
              scope='col'
              className='hidden w-1/5 px-4 py-2 text-left md:table-cell '
            >
              Muscle Groups
            </th>
            <th
              scope='col'
              className='w-1/8 hidden px-4 py-2 text-left md:table-cell'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => {
            return (
              <tr
                key={index}
                className='h-min border-b bg-white hover:bg-gray-100'
              >
                <td className='border px-4 py-2 font-serif text-black'>
                  <div className='text-lg md:text-2xl'>{workout.title}</div>
                  <div className='text-md mt-2 md:text-xl'>
                    {`${workout.duration} minutes`}
                  </div>
                  <div className='display-block my-2 flex flex-row items-center justify-between md:hidden'>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        onClick={() =>
                          router.push(`/lets-get-after-it?id=${workout.id}`)
                        }
                        icon={faPlay}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        onClick={() => handleDeleteWorkout(workout.id)}
                        icon={faTrash}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                  </div>
                </td>
                <td className='hidden border px-4 py-2 md:table-cell'>
                  {truncate(workout.description, 110)}
                </td>
                <td className='hidden px-4 py-2 md:table-cell'>
                  <div className='flex flex-row flex-wrap'>
                    {workout.muscles_targeted
                      .slice(0, 10)
                      .map((muscle, index) => {
                        return (
                          <div
                            key={index}
                            className='m-1 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
                          >
                            {muscle}
                          </div>
                        );
                      })}
                  </div>
                </td>
                <td className='hidden border px-4 py-2 md:table-cell'>
                  <div className='my-2 flex flex-col items-center justify-between'>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        onClick={() =>
                          router.push(`/lets-get-after-it?id=${workout.id}`)
                        }
                        icon={faPlay}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                    <button className='m-2 flex h-12 w-12 items-center justify-center rounded-full border border'>
                      <FontAwesomeIcon
                        onClick={() => deleteWorkout(workout.id)}
                        icon={faTrash}
                        className='fa-xl h-10 w-10'
                      />
                    </button>
                  </div>
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

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}
