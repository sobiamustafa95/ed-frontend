import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BookingStatus, IAllBookingDetails } from '@/@types/booking';
import CompletedIcon from '@/assets/svgs/CompletedIcon';
import DocumentsIcon from '@/assets/svgs/DocumentIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';
import PendingRequest from '@/assets/svgs/PendingRequest';
import { Button } from '@/components/ui/button';
import { BUTTON_VARIANT } from '@/constants';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

const staticText = strings.booking.tableData.statusBtn;

const ButtonWithIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: BUTTON_VARIANT;
  disabled?: boolean;
  styleClass?: string;
}> = ({
  icon,
  label,
  onClick,
  variant = BUTTON_VARIANT.DEFAULT,
  disabled = false,
  styleClass = '',
}) => (
  <Button
    variant={variant}
    className={cn(
      'rounded-lg w-32 flex gap-1 justify-center text-xs items-center text-white',
      styleClass,
      disabled
        ? 'border-SteelGray border bg-gray-50 text-SteelGray cursor-not-allowed'
        : 'border-primary',
    )}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
  >
    {React.cloneElement(icon as React.ReactElement, { disabled })}
    {label}
  </Button>
);

const ActionsCell: React.FC<{ row: IAllBookingDetails }> = ({ row }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(ROUTES.TRACK_ORDER.replace(':id', row.id));
  };

  const handleViewInvoice = () => {
    navigate(ROUTES.INVOICES);
  };

  const renderStatusButton = () => {
    const isDisabled =
      row.status === BookingStatus.BOOKING_CREATED ||
      row.status === BookingStatus.BOOKING_CANCELED;
    const commonProps = {
      onClick: handleViewDetails,
      disabled: isDisabled,
    };

    switch (row.status) {
      case BookingStatus.BOOKING_CONFIRMED || BookingStatus.TECH_EN_ROUTE:
        return (
          <ButtonWithIcon
            icon={<LocationIcon />}
            label={staticText.trackOrder}
            {...commonProps}
          />
        );
      case BookingStatus.IN_PROGRESS:
        return (
          <ButtonWithIcon
            icon={<LocationIcon />}
            label={staticText.trackOrder}
            {...commonProps}
          />
        );
      case BookingStatus.COMPLETED:
        return (
          <ButtonWithIcon
            icon={<CompletedIcon />}
            label={staticText.completed}
            {...commonProps}
          />
        );
      case BookingStatus.BOOKING_CREATED || BookingStatus.BOOKING_CANCELED:
        return (
          <ButtonWithIcon
            icon={<PendingRequest />}
            label={staticText.pending}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  const isInvoiceDisabled = row.status !== BookingStatus.COMPLETED;

  return (
    <div className='flex flex-row space-x-2 justify-center'>
      {/* Invoice button with a custom style */}
      <ButtonWithIcon
        icon={<DocumentsIcon />}
        label={staticText.invoice}
        onClick={handleViewInvoice}
        variant={BUTTON_VARIANT.OUTLINE}
        disabled={isInvoiceDisabled}
        styleClass={
          isInvoiceDisabled
            ? 'border-SteelGray bg-gray-50 !text-SteelGray cursor-not-allowed'
            : 'border-primary text-primary'
        }
      />
      {/* Dynamically render the status button */}
      {renderStatusButton()}
    </div>
  );
};

export default ActionsCell;
