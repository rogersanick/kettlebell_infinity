import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useId, useState } from 'react';
import Select from 'react-select';

import {
  filteredExercisesForWorkoutOverview,
  getExercisesForWorkoutOverview,
  getRandomValueFromArray,
  replaceExerciseInSegment,
} from '@/data_utils';

import Button from '@/components/buttons/Button';
import SpinRefreshSVG from '@/components/buttons/RefreshButton';
import ExerciseLoadingIndicator from '@/components/ExerciseLoadingIndicator';
import LoadingIndicator from '@/components/LoadingIndicator';
import { NewWorkoutModalStepper } from '@/components/NewWorkoutModal/NewWorkoutModalStepper';
import { SegmentTimeline } from '@/components/NewWorkoutModal/SegmentTimeline';

import {
  Exercises,
  saveWorkout,
  WorkoutSegmentsJSONRepresentation,
} from '@/api/supabaseDB';
import { generateNewWorkout, WorkoutOverview } from '@/api/supabaseFunc';

interface NewWorkoutModalProps {
  isOpen: boolean;
  exercises: Exercises;
  closeModal: () => void;
}

export const NewWorkoutModal = (props: NewWorkoutModalProps) => {
  // Basic props
  const { isOpen, closeModal, exercises } = props;
  const id = useId();
  // const id1 = useId();
  const client = useSupabaseClient();

  // Form Progress
  const [formStep, setFormStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // New Workout Overview Input
  const [duration, setDuration] = useState(20);
  const [skillLevel, setSkillLevel] = useState<
    'Beginner' | 'Intermediate' | 'Advanced'
  >('Beginner');
  const [includeBodyWeight, setIncludeBodyWeight] = useState(false);
  const [includeExposive, setIncludeExposive] = useState(false);
  const [includeCarrying, setIncludeCarrying] = useState(false);
  const [includeDoubleBells, setIncludeDoubleBells] = useState(false);

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(
    [] as { value: string; label: string }[]
  );
  const [muscleGroups, setMuscleGroups] = useState(
    Array.from(
      new Set(
        exercises
          ?.flatMap((exercise) => exercise.muscles_targeted)
          .map((muscle) => muscle.trim().toLowerCase())
      )
    ).map((muscle) => ({ value: muscle, label: muscle }))
  );

  // const [selectedWeights, setSelectedWeights] = useState(
  //   [] as { value: number; label: string }[]
  // );
  // const [weights] = useState(
  //   [4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48].map((weight) => {
  //     return {
  //       value: weight,
  //       label: `${weight} KG, ${Math.round(2.2 * weight * 10) / 10} LB`,
  //     };
  //   })
  // );

  const [otherInput, setOtherInput] = useState('');

  useEffect(() => {
    setMuscleGroups(
      Array.from(
        new Set(
          exercises
            ?.flatMap((exercise) => exercise.muscles_targeted)
            .map((muscle) => muscle.trim().toLowerCase())
        )
      ).map((muscle) => ({ value: muscle, label: muscle }))
    );
  }, [exercises]);

  // New Workout Overview output
  const [newWorkoutOverview, setNewWorkoutOverview] =
    useState<WorkoutOverview>();

  // Exercise Selection input
  const [selectedSegment, setSelectedSegment] = useState<string | undefined>();
  const [selectedExercises, setSelectedExercises] = useState<
    WorkoutSegmentsJSONRepresentation | undefined
  >();
  const [filteredExercises, setFilteredExercises] = useState<Exercises>([]);
  useEffect(() => {
    if (!exercises) return;
    const filteredExercises = filteredExercisesForWorkoutOverview(
      exercises,
      selectedMuscleGroups,
      skillLevel,
      includeBodyWeight,
      includeExposive,
      includeCarrying,
      includeDoubleBells
    );
    setFilteredExercises(filteredExercises);
    const newselectedExercises =
      newWorkoutOverview &&
      getExercisesForWorkoutOverview(newWorkoutOverview, filteredExercises);
    newselectedExercises &&
      setSelectedExercises(Object.assign({}, ...newselectedExercises));
  }, [
    newWorkoutOverview,
    exercises,
    selectedMuscleGroups,
    skillLevel,
    includeBodyWeight,
    includeExposive,
    includeCarrying,
    includeDoubleBells,
  ]);

  // Reset state on close
  const resetState = () => {
    setFormStep(0);
    setDuration(20);
    setSkillLevel('Beginner');
    setIncludeBodyWeight(false);
    setIncludeExposive(false);
    setIncludeCarrying(false);
    setIncludeDoubleBells(false);
    setSelectedMuscleGroups([]);
    // setSelectedWeights([]);
    setNewWorkoutOverview(undefined);
    setSelectedSegment(undefined);
    setSelectedExercises(undefined);
    setFilteredExercises([]);
  };

  // Form Page 1
  const newWorkoutOverviewFormBlock = () => (
    <div className='m-2 flex flex-col p-2'>
      <label className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        How long do you want to workout for?
      </label>
      <select
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        id='duration'
        className='mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      >
        <option value={15}>15 Minutes</option>
        <option value={20}>20 Minutes</option>
        <option value={30}>30 Minutes</option>
        <option value={45}>45 Minutes</option>
        <option value={60}>60 Minutes</option>
        <option value={90}>90 Minutes</option>
      </select>
      <label
        htmlFor='skill-level'
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
      >
        What is your skill level?
      </label>
      <select
        value={skillLevel}
        onChange={(e) =>
          setSkillLevel(
            e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'
          )
        }
        id='skill-level'
        className='mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      >
        <option value='Beginner'>Beginner</option>
        <option value='Intermediate'>Intermediate</option>
        <option value='Advanced'>Advanced</option>
      </select>
      <label
        htmlFor='muscle-group'
        className='mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        What muscle groups would you like to target?
      </label>
      {muscleGroups && (
        <Select
          id='muscle-group'
          instanceId={id}
          className='mb-4'
          value={selectedMuscleGroups}
          onChange={(e) =>
            setSelectedMuscleGroups(e as { value: string; label: string }[])
          }
          isMulti
          name='colors'
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options={muscleGroups}
          classNamePrefix='select'
        />
      )}
      <label
        htmlFor='other-input'
        className='mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Do you have other input for our AI agent to consider? (e.g Make a Shrek
        themed workout)
      </label>
      <input
        className='dark:focus:ring-blue-500} mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500'
        value={otherInput}
        onChange={(e) => setOtherInput(e.target.value)}
        id='other-input'
      ></input>
      {/* <label
        htmlFor='weights'
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
      >
        What size kettlebells do you have?
      </label>
      {weights && (
        <Select
          id='weights'
          instanceId={id1}
          className='mb-4'
          value={selectedWeights}
          onChange={(e) =>
            setSelectedWeights(e as { value: number; label: string }[])
          }
          isMulti
          name='colors'
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options={weights}
          classNamePrefix='select'
        />
      )} */}

      <label className='relative mb-4 mt-4 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          onChange={(e) =>
            setIncludeBodyWeight(e.target.value === 'true' ? false : true)
          }
          value={includeBodyWeight.toString().toLowerCase()}
          className='peer sr-only'
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          Include Bodyweight Exercises
        </span>
      </label>
      <label className='relative mb-4 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          onChange={(e) =>
            setIncludeExposive(e.target.value === 'true' ? false : true)
          }
          value={includeExposive.toString().toLowerCase()}
          className='peer sr-only'
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          Include Explosive Exercises
        </span>
      </label>
      <label className='relative mb-4 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          onChange={(e) =>
            setIncludeCarrying(e.target.value === 'true' ? false : true)
          }
          value={includeCarrying.toString().toLowerCase()}
          className='peer sr-only'
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          Include Carrying Exercises
        </span>
      </label>
      <label className='relative mb-4 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          onChange={(e) =>
            setIncludeDoubleBells(e.target.value === 'true' ? false : true)
          }
          value={includeDoubleBells.toString().toLowerCase()}
          className='peer sr-only'
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          Include Double Bell Exercises
        </span>
      </label>
      <div className='flex items-center justify-end space-x-2 rounded-b p-6'>
        {newWorkoutOverview && (
          <Button
            onClick={() => {
              setFormStep(formStep + 1);
            }}
            variant='ghost'
          >
            Proceed with previous
          </Button>
        )}
        <Button
          onClick={async () => {
            setFormStep(formStep + 1);
            setIsLoading(true);
            const newWorkout = await generateNewWorkout(
              duration,
              selectedMuscleGroups.map((smg) => smg.value),
              skillLevel,
              otherInput
            );
            // eslint-disable-next-line no-console
            console.log('FIND ME');
            // eslint-disable-next-line no-console
            console.log(newWorkout);
            setNewWorkoutOverview(newWorkout);
            setSelectedSegment(newWorkout.segments[0].title);
            setIsLoading(false);
          }}
          data-modal-hide='defaultModal'
          type='button'
          variant='primary'
        >
          Generate Workout
        </Button>
      </div>
    </div>
  );

  // Form page 2
  const confirmWorkoutOverviewFormBlock = () => {
    if (!newWorkoutOverview) return <div></div>;
    return (
      <div className='m-2 flex flex-col p-2'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className='my-2 font-serif'>{`${newWorkoutOverview.title}`}</h2>
            <h4>{`Duration: ${newWorkoutOverview.duration} minutes`}</h4>
          </div>
          <SpinRefreshSVG
            large
            onClick={async () => {
              setIsLoading(true);
              const newWorkout = await generateNewWorkout(
                duration,
                selectedMuscleGroups.map((smg) => smg.value),
                skillLevel,
                otherInput
              );
              setNewWorkoutOverview(newWorkout);
              setSelectedSegment(newWorkout.segments[0].title);
              setIsLoading(false);
            }}
          />
        </div>

        <div className='my-4'>{newWorkoutOverview?.description}</div>
        <SegmentTimeline
          selectedSegment={selectedSegment}
          setSelectedSegment={(segment: string) => setSelectedSegment(segment)}
          workoutOverview={newWorkoutOverview}
        />
        <div className='flex items-center justify-between space-x-2 rounded-b p-6'>
          <Button
            onClick={async () => {
              setFormStep(formStep - 1);
            }}
            data-modal-hide='defaultModal'
            type='button'
            variant='ghost'
          >
            Go Back
          </Button>
          <Button
            onClick={async () => {
              setFormStep(formStep + 1);
            }}
            data-modal-hide='defaultModal'
            type='button'
            variant='primary'
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Choose Exercises
          </Button>
        </div>
      </div>
    );
  };

  // Form page 3
  const assignExercisesFormBlock = () => {
    const exercisesForSelectedSegment =
      selectedSegment &&
      selectedExercises &&
      selectedExercises[selectedSegment]?.exerciseIds.map((id) => {
        return exercises?.find((e) => e.id === id);
      });
    if (!newWorkoutOverview) return <div></div>;
    return (
      <div className='m-2 flex flex-col p-2'>
        <h2 className='my-2 font-serif'>{`${newWorkoutOverview.title}`}</h2>
        <SegmentTimeline
          selectedSegment={selectedSegment}
          setSelectedSegment={(segment: string) => setSelectedSegment(segment)}
          workoutOverview={newWorkoutOverview}
          showDetails={false}
        />
        {exercisesForSelectedSegment ? (
          <div>
            <hr className='my-4' />
            {/* List the selected exercises */}
            <div className='flex flex-col'>
              <table className='w-full table-fixed text-left text-sm text-gray-500'>
                <thead className='sticky top-0 bg-gray-50 text-xs uppercase text-gray-700'>
                  <tr className='sticky top-0'>
                    <th scope='col' className='w-2/3 px-4 py-2'>
                      Title
                    </th>
                    <th scope='col' className='px-4 py-2 text-end'>
                      Reps
                    </th>
                    <th scope='col' className='px-4 py-2 text-end'>
                      KG/LB
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exercisesForSelectedSegment.map((exercise, index) => {
                    if (!exercise) return <div></div>;
                    return (
                      <tr
                        key={index}
                        className='border-b bg-white hover:bg-gray-100'
                      >
                        <td className='border px-4 py-2'>
                          <div className='flex flex-row items-center justify-between'>
                            <div className='pr-2'>{exercise?.title}</div>
                            <SpinRefreshSVG
                              onClick={() => {
                                setSelectedExercises(
                                  replaceExerciseInSegment(
                                    selectedSegment,
                                    exercise.id,
                                    getRandomValueFromArray(filteredExercises)
                                      .id,
                                    selectedExercises
                                  )
                                );
                              }}
                            />
                          </div>
                        </td>
                        <td className='border px-4 py-2 text-end'>2</td>
                        <td className='border px-4 py-2 text-end'>2</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr className='my-4' />
          </div>
        ) : (
          <ExerciseLoadingIndicator />
        )}
        <div className='flex items-center justify-between space-x-2 rounded-b p-6'>
          <Button
            onClick={async () => {
              setFormStep(formStep - 1);
            }}
            data-modal-hide='defaultModal'
            type='button'
            variant='ghost'
          >
            Go Back
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              selectedExercises &&
                (await saveWorkout(
                  client,
                  newWorkoutOverview,
                  skillLevel,
                  includeBodyWeight,
                  includeExposive,
                  includeDoubleBells,
                  includeCarrying,
                  selectedMuscleGroups.map((mg) => mg.value),
                  selectedExercises
                ));
              setIsLoading(false);
              resetState();
              closeModal();
            }}
            data-modal-hide='defaultModal'
            type='button'
            variant='primary'
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Save Workout
          </Button>
        </div>
      </div>
    );
  };

  const getFormBlock = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    } else if (formStep === 0) {
      return newWorkoutOverviewFormBlock();
    } else if (formStep === 1) {
      return confirmWorkoutOverviewFormBlock();
    } else if (formStep === 2) {
      return assignExercisesFormBlock();
    }
  };

  return (
    <div
      id='defaultModal'
      tabIndex={-1}
      aria-hidden={!isOpen}
      className={`fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 ${
        isOpen ? '' : 'hidden'
      } bg-grey-500`}
    >
      <div className='z-1 absolute h-full w-full bg-gray-600 bg-opacity-75'></div>
      <div className='relative h-full w-full max-w-2xl md:h-auto'>
        <div className='relative rounded-lg bg-white shadow'>
          <div className='flex items-start justify-between rounded-t border-b p-4'>
            <h3 className='text-xl font-semibold text-gray-900'>
              New AI Generated Workout
            </h3>
            <button
              onClick={closeModal}
              type='button'
              className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='defaultModal'
            >
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <NewWorkoutModalStepper step={formStep} />
          <hr className='mb-2' />
          {getFormBlock()}
        </div>
      </div>
    </div>
  );
};
