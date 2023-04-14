interface NewWorkoutModalStepperProps {
  step: number;
}

const NewWorkoutModalStepper = (props: NewWorkoutModalStepperProps) => {
  const { step } = props;
  return (
    <ol className='flex w-full items-center justify-between p-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400'>
      {['Workout', 'Overview', 'Exercises'].map((stepTitle, stepIndex) => {
        return stepIndex === step ? (
          <li
            key={stepIndex}
            className='flex w-1/4 justify-center text-blue-600 dark:text-blue-500'
          >
            <span className='mx-2 flex items-center underline after:text-gray-200 dark:after:text-gray-500'>
              {stepTitle}
            </span>
          </li>
        ) : (
          <li
            key={stepIndex}
            className='text-blue after:border-1 flex flex w-1/4 content-center items-center justify-center'
          >
            <span className='mx-2 flex items-center after:text-gray-200'>
              {stepTitle}
            </span>
            <hr className='w-43' />
          </li>
        );
      })}
    </ol>
  );
};

export { NewWorkoutModalStepper };
