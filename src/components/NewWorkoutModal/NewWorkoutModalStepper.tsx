interface NewWorkoutModalStepperProps {
  step: number;
  length: number;
}

const NewWorkoutModalStepper = (props: NewWorkoutModalStepperProps) => {
  const { step, length } = props;
  return (
    <ol className='flex w-full items-center p-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base'>
      {['Workout', 'Exercises', 'Confirm'].map((stepTitle, stepIndex) => {
        return stepIndex === step ? (
          <li
            key={stepIndex}
            className={`flex items-center text-blue-600 dark:text-blue-500 md:w-full ${
              stepIndex !== length - 1
                ? "after:border-1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] xl:after:mx-10"
                : ''
            }`}
          >
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <svg
                aria-hidden='true'
                className='mr-2 h-4 w-4 sm:h-5 sm:w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {stepTitle}
            </span>
          </li>
        ) : (
          <li
            key={stepIndex}
            className="text-blue after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10"
          >
            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <span className='mr-2'>{stepIndex + 1}</span>
              {stepTitle}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export { NewWorkoutModalStepper };
