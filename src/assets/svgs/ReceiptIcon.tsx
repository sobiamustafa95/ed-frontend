import React, { SVGProps } from 'react';

const HelpCenterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      className='stroke-current'
      d='M6.73 19.7C7.55 18.82 8.8 18.89 9.52 19.85L10.53 21.2C11.34 22.27 12.65 22.27 13.46 21.2L14.47 19.85C15.19 18.89 16.44 18.82 17.26 19.7C19.04 21.6 20.49 20.97 20.49 18.31V7.04C20.5 3.01 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01 3.5 7.04V18.3C3.5 20.97 4.96 21.59 6.73 19.7Z'
      stroke={props.color || '#797979'}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M8 7H16'
      stroke={props.color || '#797979'}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M9 11H15'
      stroke={props.color || '#797979'}
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
  </svg>
);
export default HelpCenterIcon;
