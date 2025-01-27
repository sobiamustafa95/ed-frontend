import * as React from 'react';

interface CompletedIconProps extends React.SVGProps<SVGSVGElement> {
  disabled?: boolean;
  color?: string;
}

const CompletedIcon: React.FC<CompletedIconProps> = ({
  disabled,
  color,
  ...props
}) => {
  const iconColor = disabled ? '#797979' : color || '#ffffff';

  return (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.33203 11.0645C9.08203 11.0645 11.332 8.81445 11.332 6.06445C11.332 3.31445 9.08203 1.06445 6.33203 1.06445C3.58203 1.06445 1.33203 3.31445 1.33203 6.06445C1.33203 8.81445 3.58203 11.0645 6.33203 11.0645Z'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.20703 6.06441L5.62203 7.47941L8.45703 4.64941'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CompletedIcon;
