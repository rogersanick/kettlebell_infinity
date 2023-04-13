import UnderlineLink from '@/components/links/UnderlineLink';

export const Footer = () => {
  return (
    <footer className='absolute bottom-2 flex w-full flex-col items-center justify-between text-gray-700 sm:flex-row'>
      <UnderlineLink href='https://aifightiq.com'>
        <p className='font-serif'>powered by AI</p>
        <p className='px-1 font-serif text-red-500'>FIGHT</p>
        <p className='font-serif'>IQ</p>
      </UnderlineLink>
      <div>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://www.linkedin.com/in/nickrogers-se/'>
          Nick Rogers
        </UnderlineLink>
        {' and '}
        <UnderlineLink href='https://www.linkedin.com/in/jacobfoxwatkins/'>
          Jacob Watkins
        </UnderlineLink>
      </div>
    </footer>
  );
};
