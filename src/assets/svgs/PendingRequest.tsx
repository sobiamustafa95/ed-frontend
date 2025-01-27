import React from 'react';

interface PendingRequestProps extends React.SVGProps<SVGSVGElement> {
  disabled?: boolean;
}

const PendingRequest: React.FC<PendingRequestProps> = ({
  disabled,
  color,
  ...props
}) => {
  const iconColor = disabled ? '#797979' : color || '#ffffff';

  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.97332 8.90012L7.18386 7.83222C6.87215 7.6475 6.61816 7.20302 6.61816 6.83936V4.47266'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.6045 7.06444C12.6045 10.2508 10.0184 12.8369 6.83202 12.8369C3.64563 12.8369 1.05957 10.2508 1.05957 7.06444C1.05957 3.87805 3.64563 1.29199 6.83202 1.29199C10.0184 1.29199 12.6045 3.87805 12.6045 7.06444Z'
        stroke={iconColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default PendingRequest;
