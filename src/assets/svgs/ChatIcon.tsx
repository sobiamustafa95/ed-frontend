import * as React from 'react';
import { SVGProps } from 'react';

const ChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      className='stroke-current'
      d='M16 17.4299H12L7.54999 20.39C6.88999 20.83 6 20.3599 6 19.5599V17.4299C3 17.4299 1 15.4299 1 12.4299V6.42993C1 3.42993 3 1.42993 6 1.42993H16C19 1.42993 21 3.42993 21 6.42993V12.4299C21 15.4299 19 17.4299 16 17.4299Z'
      stroke={props.color || '#797979'}
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
  </svg>
);
export default ChatIcon;
