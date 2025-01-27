import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InvoiceData } from '@/@types/dummyTypes';
import { DataTable } from '@/components/DataTable';
import TablePagination from '@/components/Table/TablePagination';
import { Typography } from '@/components/Typography';
import { INVOICE_ROWS_PER_PAGE } from '@/constants';
import { dummyInvoiceData } from '@/constants/dummyData';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';
import { Table } from '@tanstack/react-table';

import { InvoiceColumns } from './components/columns';

const Invoice = () => {
  const staticText = strings.invoice;
  const navigate = useNavigate();
  const [tableData] = useState<InvoiceData[]>(dummyInvoiceData);
  const [tableState, setTableState] = useState<Table<InvoiceData> | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const handleRowClick = () => {
    navigate(ROUTES.PAYMENT_METHODS);
  };

  const totalRows = tableData.length;
  const shouldPaginate = totalRows > INVOICE_ROWS_PER_PAGE;
  const paginatedData = shouldPaginate
    ? tableData.slice(
        pageIndex * INVOICE_ROWS_PER_PAGE,
        (pageIndex + 1) * INVOICE_ROWS_PER_PAGE,
      )
    : tableData;

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between'>
        <Typography variant='heading'>{staticText.title}</Typography>
      </div>

      <div className='flex-grow'>
        <DataTable
          headClassName='bg-snowFlake first:rounded-l-xl last:rounded-r-xl'
          cellClassName='border-b border-signalWhite'
          columns={InvoiceColumns}
          handleRowClick={handleRowClick}
          data={paginatedData}
          setTablesState={setTableState}
          pageCount={
            shouldPaginate ? Math.ceil(totalRows / INVOICE_ROWS_PER_PAGE) : 0
          }
        />
      </div>

      {shouldPaginate && (
        <TablePagination
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          tableState={tableState}
        />
      )}
    </div>
  );
};

export default Invoice;
