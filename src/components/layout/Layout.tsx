import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='relative min-h-screen w-screen'>
      <div className='absolute inset-0 h-full w-full'>{children}</div>
    </div>
  );
}
