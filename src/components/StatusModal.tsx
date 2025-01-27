import * as React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';

import { MUTATION_STATUS } from '@/constants';
import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

interface StatusModalProps {
  isOpen: boolean;
  heading: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  status: MUTATION_STATUS;
  customClass?: string;
  children?: React.ReactNode;
  headingClassName?: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  heading,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryAction,
  onSecondaryAction,
  status,
  customClass,
  children,
  headingClassName,
}) => {
  const [, setIsModalOpen] = React.useState(false);

  const icon = React.useMemo(() => {
    switch (status) {
      case 'success':
        return <IoIosCheckmarkCircle className='text-primary w-12 h-12' />;
      case 'failed':
        return <TiDelete className='text-red-500 w-12 h-12' />;
      default:
        return null;
    }
  }, [status]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => !open && handleClose()}
    >
      <DialogContent
        className={cn(
          `py-12 w-fit sm:max-w-md rounded-xl sm:rounded-xl ${customClass}`,
        )}
      >
        <div className='flex justify-center mb-4'>{icon}</div>
        <DialogTitle className={headingClassName}>{heading}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
        {children}

        <div className='mt-4 mx-4 flex justify-center space-x-4'>
          {primaryButtonText ? (
            <Button
              variant='outline'
              onClick={onPrimaryAction}
              className='w-full text-primary'
            >
              {primaryButtonText}
            </Button>
          ) : null}
          {secondaryButtonText ? (
            <Button
              variant='default'
              onClick={onSecondaryAction}
              className='w-full'
            >
              {secondaryButtonText}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
