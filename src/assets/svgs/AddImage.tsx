import * as React from 'react';
import { SVGProps } from 'react';

const AddImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='31'
    height='30'
    viewBox='0 0 31 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <mask
      id='mask0_2095_4942'
      maskUnits='userSpaceOnUse'
      x='0'
      y='0'
      width='31'
      height='30'
    >
      <rect
        x='0.322266'
        y='0.142822'
        width='29.7143'
        height='29.7143'
        fill='#D9D9D9'
      />
    </mask>
    <g mask='url(#mask0_2095_4942)'>
      <path
        d='M6.10058 26.1429C5.53312 26.1429 5.04734 25.9408 4.64325 25.5368C4.23916 25.1327 4.03711 24.6469 4.03711 24.0794V5.92065C4.03711 5.35319 4.23916 4.86741 4.64325 4.46332C5.04734 4.05922 5.53312 3.85718 6.10058 3.85718H18.2546V5.92065H6.10058V24.0794H24.2594V11.9461H26.3228V24.0794C26.3228 24.6469 26.1208 25.1327 25.7167 25.5368C25.3126 25.9408 24.8268 26.1429 24.2594 26.1429H6.10058ZM21.7832 10.9143V8.41748H19.2863V6.35401H21.7832V3.85718H23.8466V6.35401H26.3435V8.41748H23.8466V10.9143H21.7832ZM7.7514 21.1493H22.6085L18.0895 15.1238L14.2308 20.2207L11.3625 16.4238L7.7514 21.1493Z'
        fill={props.fill || 'black'}
      />
    </g>
  </svg>
);
export default AddImage;
