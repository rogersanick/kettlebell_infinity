import React, { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize); // Update height on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  const style = {
    height: viewportHeight,
  };

  return (
    <div className='w-screen' style={style}>
      {children}
    </div>
  );
}
