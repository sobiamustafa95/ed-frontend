import * as React from 'react';
import { SVGProps } from 'react';

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d='M20.04 6.82006L14.28 2.79006C12.71 1.69006 10.3 1.75006 8.78999 2.92006L3.77999 6.83006C2.77999 7.61006 1.98999 9.21006 1.98999 10.4701V17.3701C1.98999 19.9201 4.05999 22.0001 6.60999 22.0001H17.39C19.94 22.0001 22.01 19.9301 22.01 17.3801V10.6001C22.01 9.25006 21.14 7.59006 20.04 6.82006ZM12.75 18.0001C12.75 18.4101 12.41 18.7501 12 18.7501C11.59 18.7501 11.25 18.4101 11.25 18.0001V15.0001C11.25 14.5901 11.59 14.2501 12 14.2501C12.41 14.2501 12.75 14.5901 12.75 15.0001V18.0001Z'
      fill={props.color || 'white'}
    />
  </svg>
);
export default DashboardIcon;
