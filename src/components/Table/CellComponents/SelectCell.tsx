import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Row, Table } from '@tanstack/react-table';

const SelectCell = <TData extends object>() => ({
  id: 'select',
  header: ({ table }: { table: Table<TData> }) => (
    <div
      className='h-full px-2 flex items-center justify-center'
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    </div>
  ),
  cell: ({ row }: { row: Row<TData> }) => (
    <div
      className='h-full px-2 flex items-center justify-center'
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    </div>
  ),
  enableSorting: false,
  enableHiding: false,
});

export default SelectCell;
