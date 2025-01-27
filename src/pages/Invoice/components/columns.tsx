import { BsDownload } from 'react-icons/bs';

import { InvoiceData } from '@/@types/dummyTypes';
import TableHeading from '@/components/Table/TableHeading';
import { Typography } from '@/components/Typography';
import { PAYMENT_STATUS, statusPriority } from '@/constants';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { ColumnDef, Row } from '@tanstack/react-table';

const columnDefinitions = [
  { id: 'invoiceNo', name: strings.invoice.tableData.invoiceNo },
  { id: 'technician', name: strings.invoice.tableData.technician },
  { id: 'status', name: strings.invoice.tableData.status },
  { id: 'date', name: strings.invoice.tableData.date },
  { id: 'dueDate', name: strings.invoice.tableData.dueDate },
  { id: 'amount', name: strings.invoice.tableData.amount },
  { id: 'action', name: strings.invoice.tableData.action },
];

const getStatusColor = (status: string): string => {
  switch (status) {
    case PAYMENT_STATUS.PAID:
      return 'text-deereGreen';
    case PAYMENT_STATUS.PENDING:
      return 'text-orangeCrush';
    case PAYMENT_STATUS.OVERDUE:
      return 'text-tomatoRed';
    default:
      return 'text-SteelGray';
  }
};

export const InvoiceColumns: ColumnDef<InvoiceData>[] = columnDefinitions.map(
  (column) => ({
    id: column.id,
    accessorKey: column.id,
    header: () => (
      <TableHeading
        classNames={cn(
          'flex font-semibold justify-start text-SteelGray text-sm',
          column.id === 'no' ? 'w-5' : '',
        )}
        text={column.name || ''}
      />
    ),
    cell: ({ row, column: currentColumn }) => {
      if (currentColumn.id === 'invoiceNo') {
        return (
          <Typography variant='md' className='flex flex-1 gap-3 items-center'>
            <span className='border text-xs border-greyWhite rounded-full w-5 h-5 flex items-center justify-center text-center'>
              {row.original.id || 0}
            </span>
            <span className='truncate'>{row.original.invoiceNo || 'N/A'}</span>
          </Typography>
        );
      }

      if (currentColumn.id === 'status') {
        const statusColor = getStatusColor(row.original.status);
        return (
          <Typography variant='md' className={`font-semibold ${statusColor}`}>
            {row.original.status}
          </Typography>
        );
      }

      if (currentColumn.id === 'action') {
        return (
          <div className='flex items-center justify-center'>
            <BsDownload
              size={20}
              className='text-primary cursor-pointer hover:text-blue-500'
            />
          </div>
        );
      }
      if (currentColumn.id === 'amount') {
        return (
          <div className='flex items-center justify-center'>
            <Typography variant='md'>
              {row.original[column.id as keyof InvoiceData]?.toString() || '-'}
            </Typography>
          </div>
        );
      }

      return (
        <Typography variant='md' className='flex flex-1'>
          {row.original[column.id as keyof InvoiceData]?.toString() || '-'}
        </Typography>
      );
    },
    enableSorting: ['status', 'date', 'dueDate'].includes(column.id),
    sortingFn: (() => {
      switch (column.id) {
        case 'status':
          return (rowA: Row<InvoiceData>, rowB: Row<InvoiceData>) => {
            const statusA = rowA.original.status;
            const statusB = rowB.original.status;

            return (
              statusPriority[statusA as keyof typeof statusPriority] -
              statusPriority[statusB as keyof typeof statusPriority]
            );
          };
        case 'date':
        case 'dueDate':
          return (rowA: Row<InvoiceData>, rowB: Row<InvoiceData>) => {
            const dateA = new Date(
              rowA.original[column.id as 'date' | 'dueDate'],
            ).getTime();
            const dateB = new Date(
              rowB.original[column.id as 'date' | 'dueDate'],
            ).getTime();

            return dateA - dateB;
          };
        default:
          return undefined;
      }
    })(),
  }),
);
