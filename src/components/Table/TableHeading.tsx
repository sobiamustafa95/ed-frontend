import React from 'react';

import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils';

type TableHeadingProp = {
  text: string;
  classNames?: string;
};
const TableHeading: React.FC<TableHeadingProp> = ({ text, classNames }) => {
  return (
    <Typography variant='sm' className={cn('', classNames)}>
      {text}
    </Typography>
  );
};

export default TableHeading;
