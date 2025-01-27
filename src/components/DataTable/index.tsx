/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { LuArrowUpDown } from 'react-icons/lu';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { CenterAlignedFieldsEnum } from '@/constants';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TanStackTable,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { BodyContent } from './BodyContent';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  setTablesState?: React.Dispatch<
    React.SetStateAction<TanStackTable<TData> | null>
  >;
  handleRowClick?: (data: TData) => void;
  cellClassName?: string;
  loading?: boolean;
  headClassName?: string;
}

export function DataTable<TData, TValue>({
  data,
  headClassName,
  columns,
  loading,
  cellClassName,
  handleRowClick,
  setTablesState,
  onRowSelectionChange,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const handleTableRowClick = (data: TData) => {
    if (handleRowClick) {
      handleRowClick(data);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    pageCount,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    onRowSelectionChange?.(selectedRows);
  }, [rowSelection, onRowSelectionChange, table]);
  useEffect(() => {
    if (setTablesState) {
      setTablesState(table);
    }
  }, []);

  return (
    <Table className='h-full border-separate border-spacing-0 max-w-full overflow-x-scroll overflow-y-hidden scrollbarHidden'>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { enableSorting } = header.column.columnDef;
              return (
                <TableHead
                  className={cn(
                    'bg-signalWhite text-nowrap cursor-pointer',
                    headClassName,
                  )}
                  key={header.id}
                  // set width for select checkbox column
                  style={{
                    width: header.id === 'select' ? '40px' : 'auto',
                  }}
                  onClick={
                    enableSorting
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <div className={cn('flex justify-center items-center gap-1')}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {enableSorting && <LuArrowUpDown size={15} />}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        <BodyContent
          table={table}
          cellClassName={cellClassName}
          columnsLength={columns?.length}
          handleTableRowClick={handleTableRowClick}
          loading={loading}
        />
      </TableBody>
    </Table>
  );
}
