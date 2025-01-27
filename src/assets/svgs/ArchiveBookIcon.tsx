import * as React from 'react';
import { SVGProps } from 'react';

const ArchiveBookIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d='M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z'
      stroke={props.color || '#797979'}
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M15.5 2V9.85999C15.5 10.3 14.98 10.52 14.66 10.23L12.34 8.09003C12.15 7.91003 11.85 7.91003 11.66 8.09003L9.34003 10.23C9.02003 10.52 8.5 10.3 8.5 9.85999V2H15.5Z'
      stroke={props.color || '#797979'}
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M13.25 14H17.5'
      stroke={props.color || '#797979'}
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
    <path
      className='stroke-current'
      d='M9 18H17.5'
      stroke={props.color || '#797979'}
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill={props.color || 'white'}
    />
  </svg>
);
export default ArchiveBookIcon;
