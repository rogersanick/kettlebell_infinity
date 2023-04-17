import React, { useState } from 'react';

interface SpinRefreshSVGProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => void;
  large?: boolean;
  spinForever?: boolean;
}

const SpinRefreshSVG = (props: SpinRefreshSVGProps) => {
  const { onClick, large, spinForever = false } = props;
  const [spin, setSpin] = useState(false);

  const handleClick = () => {
    setSpin(true);
    setTimeout(() => {
      onClick && onClick();
      setSpin(false);
    }, 500);
  };

  const spinClass = spin || spinForever ? 'animate-spin' : '';
  return (
    <div className='refresh-svg-container' onClick={handleClick}>
      <svg
        className={`${spinClass} ${large ? 'h-8 w-8' : 'h-3 w-3'}`}
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        height='800px'
        width='800px'
        version='1.1'
        id='Layer_1'
        viewBox='0 0 383.748 383.748'
      >
        <g>
          <path d='M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30   C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593   L2.081,34.641v113.365h113.91L62.772,95.042z' />
          <path d='M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042   c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888   c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z' />
        </g>
      </svg>
    </div>
  );
};

export default SpinRefreshSVG;
