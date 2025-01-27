import React, { SVGProps } from 'react';

const SendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='31'
    height='30'
    viewBox='0 0 31 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <mask
      id='mask0_2095_4949'
      maskUnits='userSpaceOnUse'
      x='0'
      y='0'
      width='31'
      height='30'
    >
      <rect
        x='0.857422'
        y='0.142822'
        width='29.7143'
        height='29.7143'
        fill='#D9D9D9'
      />
    </mask>
    <g mask='url(#mask0_2095_4949)'>
      <path
        d='M4.57129 24.9047V17.4762L14.4761 15L4.57129 12.5238V5.09521L28.0951 15L4.57129 24.9047Z'
        fill={props.fill || '#000000'}
      />
    </g>
  </svg>
);

export default SendIcon;
