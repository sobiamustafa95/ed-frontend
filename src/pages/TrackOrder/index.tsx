import React, { useState } from 'react';

import { END_POINT, START_POINT } from '@/constants/dummyData';

import BookingDetailsDialog from './components/DialogContent';
import JobCompleted from './components/JobCompleted';
import MapWithRoute from './components/MapWithRoute';

const TrackOrder: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isJobCompleted] = useState(true);

  return (
    <div>
      <div className='relative'>
        <div className='z-10'>
          <BookingDetailsDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </div>
        <div className='w-full h-full absolute top-0 left-0'>
          <MapWithRoute startPoint={START_POINT} endPoint={END_POINT} />
        </div>
      </div>
      {isJobCompleted && (
        <div className='z-20'>
          <JobCompleted isOpen={isJobCompleted} onPrimaryAction={() => {}} />
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
