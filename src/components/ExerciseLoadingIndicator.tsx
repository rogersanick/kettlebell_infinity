import { useEffect, useState } from 'react';

const ExerciseLoadingIndicator = () => {
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingMessages] = useState([
    'Calculating how much pain you can handle...',
    'Adjusting workout based on your laziness level...',
    'Counting down the seconds until you start sweating...',
    'Generating workout plan to turn you into a muscle machine...',
    'Calculating the right amount of sweat for your shirt...',
    'Optimizing your workout to prevent grunting...',
    "Tuning your workout to your 'lazy but ambitious' personality...",
    'Matching exercises to your body type, even if you have a dad bod...',
    'Generating workout plan that will make you look like a fitness model (or at least make you feel like one)...',
    'Preparing a workout plan that will make your ex jealous...',
    'Calculating how many more pizzas you can eat after your workout...',
    'Optimizing your workout so you can watch Netflix while exercising...',
    'Analyzing your favorite dance moves to incorporate them into your workout...',
    'Adjusting workout plan based on how much you hate burpees...',
    'Calculating the right amount of sweat to make you look like a Greek god (or goddess)...',
    'Analyzing your love for food to create a workout plan that maximizes pizza and donut consumption...',
    'Creating a workout plan that makes your dog want to exercise too...',
    'Analyzing your social media profiles to create a workout plan that will make you insta-famous...',
    'Optimizing your workout plan to make you look good in gym selfies...',
    'Calculating how much you can bench press before collapsing...',
    'Creating a workout plan that helps you release your inner Hulk...',
    'Analyzing your dance moves to create a workout plan that maximizes your dabbing skills...',
    'Calculating how much you can lift without hurting yourself (too much)...',
    'Analyzing your social media followers to determine the optimal workout plan for influencer-level fitness...',
    'Preparing a workout plan that will make you forget all about that pizza...',
    'Optimizing your workout to make you look good in yoga pants...',
    'Analyzing your love for ice cream to create a workout plan that maximizes ice cream consumption...',
    'Calculating how many cheat meals you can have before sabotaging your progress...',
    'Creating a workout plan that makes you want to come back for more (even if you hate exercise)...',
    'Analyzing your favorite memes to incorporate them into your workout...',
    'Calculating the right amount of sweat to make you look like you just finished a marathon (even if you only ran for 5 minutes)...',
    "Preparing a workout plan that will make your mom proud (even if she's never proud of you)...",
    'Optimizing your workout to make you feel like you can conquer the world (or at least the gym)...',
    'Analyzing your love for sleep to create a workout plan that maximizes nap time...',
    'Calculating how much you can lift before making a scene (or at least dropping a weight)...',
    "Creating a workout plan that makes your cat want to exercise too (even if they don't care)...",
    'Analyzing your favorite TV shows to incorporate them into your workout...',
    "Preparing a workout plan that will make you feel like a superhero (even if you're just a regular person)...",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex(
        Math.round(Math.random() * loadingMessages.length) %
          loadingMessages.length
      );
    }, Math.random() * 800 + 200);
    return () => clearInterval(interval);
  });

  return (
    <div className='flex h-48 w-full flex-col items-center justify-center'>
      <svg
        aria-hidden='true'
        role='status'
        className='mr-3 inline h-12 w-12 animate-spin text-white'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='#E5E7EB'
        ></path>
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentColor'
        ></path>
      </svg>
      <span className='sr-only'>Loading...</span>
      <span className='mt-6 h-1/6 w-5/6 text-center'>
        {loadingMessages[loadingMessageIndex]}
      </span>
    </div>
  );
};

export default ExerciseLoadingIndicator;
