import { IAllBookingDetails, IBookingDetails } from '@/@types/booking';
import TableHeading from '@/components/Table/TableHeading';
import { Typography } from '@/components/Typography';
import { urgencyPriority } from '@/constants';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { getUrgencyClass } from '@/utils/common';
import { ColumnDef, Row } from '@tanstack/react-table';

import ActionsCell from './ActionsCell';

const { tableData } = strings.booking;

const columnDefinitions = [
  { id: 'machineryType', name: tableData.machine },
  { id: 'serviceCategory', name: tableData.serviceCategory },
  { id: 'notes', name: tableData.notes },
  { id: 'urgency', name: tableData.urgency },
  { id: 'date', name: tableData.date },
  // { id: 'time', name: tableData.time },
  { id: 'status', name: tableData.status },
  { id: 'viewDetails', name: tableData.viewDetails },
];

const textDisplayColumns = columnDefinitions.map((column) => ({
  id: column.id,
  accessorKey: column.id,
  header: () => (
    <TableHeading
      classNames={cn(
        'flex font-semibold text-black text-sm',
        column.id === 'machineryType' ? 'text-black' : '',
      )}
      text={column.name || 'N/A'}
    />
  ),
  cell: ({ row }: { row: Row<IAllBookingDetails> }) => {
    const renderCellContent = () => {
      switch (column.id) {
        case 'machineryType':
          return (
            <Typography variant='md' className='flex flex-1 gap-3 items-center'>
              <span className='border text-xs border-greyWhite rounded-full w-5 h-5 flex items-center justify-center text-center'>
                {row.index + 1}
              </span>
              <span className='truncate'>
                {row.original.bookingDetails.machineryType || 'N/A'}
              </span>
            </Typography>
          );
        case 'urgency':
          return (
            <Typography
              variant='md'
              className={cn(
                'flex flex-1 font-semibold justify-center capitalize',
                getUrgencyClass(row.original.bookingDetails.urgency || ''),
              )}
            >
              {row.original.bookingDetails.urgency || 'N/A'}
            </Typography>
          );
        case 'viewDetails':
          return <ActionsCell row={row.original} />;
        case 'date':
          return (
            <Typography
              variant='md'
              className={cn('flex flex-1 justify-center truncate')}
            >
              {row.original.createdAt || '-'}
            </Typography>
          );
        // case 'time':
        //   return (
        //     <Typography
        //       variant='md'
        //       className={cn('flex flex-1 justify-center truncate')}
        //     >
        //       {row.original.updatedAt || '-'}
        //     </Typography>
        //   );
        case 'status':
          return (
            <Typography
              variant='md'
              className={cn('flex flex-1 justify-center truncate')}
            >
              {row.original.status || '-'}
            </Typography>
          );
        default:
          return (
            <Typography
              variant='md'
              className={cn(
                'flex flex-1 justify-center truncate',
                column.id === 'notes' ? 'w-36' : 'w-fit',
                column.id === 'serviceCategory' ? 'capitalize' : '',
              )}
            >
              {row.original.bookingDetails[
                column.id as keyof IBookingDetails
              ]?.toString() || '-'}
            </Typography>
          );
      }
    };

    return renderCellContent();
  },
  enableSorting: ['urgency', 'serviceCategory'].includes(column.id),
  sortingFn: (() => {
    switch (column.id) {
      case 'urgency':
        return (
          rowA: Row<IAllBookingDetails>,
          rowB: Row<IAllBookingDetails>,
        ) => {
          const urgencyA = rowA.original.bookingDetails.urgency?.toUpperCase();
          const urgencyB = rowB.original.bookingDetails.urgency?.toUpperCase();
          return (
            urgencyPriority[urgencyA as keyof typeof urgencyPriority] -
            urgencyPriority[urgencyB as keyof typeof urgencyPriority]
          );
        };
      case 'serviceCategory':
        return (
          rowA: Row<IAllBookingDetails>,
          rowB: Row<IAllBookingDetails>,
        ) => {
          const categoryA =
            rowA.original.bookingDetails.serviceCategory?.toUpperCase();
          const categoryB =
            rowB.original.bookingDetails.serviceCategory?.toUpperCase();
          return categoryA.localeCompare(categoryB);
        };
      default:
        return undefined;
    }
  })(),
}));

export const BookingColumns = (): ColumnDef<IAllBookingDetails>[] => {
  return [...textDisplayColumns];
};
