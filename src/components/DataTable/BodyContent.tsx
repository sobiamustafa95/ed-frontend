import React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { flexRender, Table } from '@tanstack/react-table';

import Loader from '../Loader';

interface DataTableProps<TData> {
  table: Table<TData>;
  handleTableRowClick?: (data: TData) => void;
  columnsLength: number;
  cellClassName?: string;
  loading?: boolean;
}

export function BodyContent<TData>({
  table,
  handleTableRowClick,
  columnsLength,
  cellClassName,
  loading,
}: DataTableProps<TData>) {
  const staticText = strings.table;

  if (loading)
    return (
      <TableRow>
        <TableCell
          colSpan={columnsLength}
          className='h-24 border-l border-lightGrey'
        >
          <div className='flex justify-center'>
            <Loader />
          </div>
        </TableCell>
      </TableRow>
    );
  if (!table.getRowModel().rows?.length)
    return (
      <TableRow>
        <TableCell
          colSpan={columnsLength}
          className='text-center h-24 font-semibold border-l border-lightGrey'
        >
          {staticText.noDataAvailable}
        </TableCell>
      </TableRow>
    );
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          onClick={() => handleTableRowClick?.(row.original)}
          className={cn('h-[75px]', { 'cursor-pointer': handleTableRowClick })}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className={cn('no-wrap', cellClassName)}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
