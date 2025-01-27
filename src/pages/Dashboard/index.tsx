import React from 'react';

import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

interface DashboardProps {
  userName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const staticText = strings.dashboard;

  return (
    <div className='flex flex-col items-end gap-6 overflow-scroll scrollbarHidden relative'>
      <Typography variant='heading'>{staticText.title}</Typography>
      <Typography variant='p'>
        {staticText.desc.replace('{{userName}}', userName ? userName : 'Guest')}
      </Typography>
    </div>
  );
};

export default Dashboard;
