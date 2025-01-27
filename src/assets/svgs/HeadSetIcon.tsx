import * as React from 'react';
import { SVGProps } from 'react';

const HeadSetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='30'
    height='30'
    viewBox='0 0 30 30'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect width='30' height='30' fill='url(#pattern0_416_36428)' />
    <defs>
      <pattern
        id='pattern0_416_36428'
        patternContentUnits='objectBoundingBox'
        width='1'
        height='1'
      >
        <use xlinkHref='#image0_416_36428' transform='scale(0.01)' />
      </pattern>
      <image
        id='image0_416_36428'
        width='100'
        height='100'
        xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
);
export default HeadSetIcon;
