import React, { SVGProps } from 'react';

const HelpCenterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      className='stroke-current'
      d='M17 18.43H13L8.54999 21.39C7.88999 21.83 7 21.36 7 20.56V18.43C4 18.43 2 16.43 2 13.43V7.42993C2 4.42993 4 2.42993 7 2.42993H17C20 2.42993 22 4.42993 22 7.42993V13.43C22 16.43 20 18.43 17 18.43Z'
      stroke={props.color || '#797979'}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M12.0001 11.36V11.15C12.0001 10.47 12.4201 10.11 12.8401 9.82001C13.2501 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.9201 6.85999 12.0001 6.85999C11.0801 6.85999 10.3401 7.60002 10.3401 8.52002'
      stroke={props.color || '#797979'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      className='stroke-current'
      d='M11.9955 13.75H12.0045'
      stroke={props.color || '#797979'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default HelpCenterIcon;
