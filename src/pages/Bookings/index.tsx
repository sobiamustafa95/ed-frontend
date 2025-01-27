import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { BookingStatus, IAllBookingDetails } from '@/@types/booking';
import { DataTable } from '@/components/DataTable';
import Loader from '@/components/Loader';
import TablePagination from '@/components/Table/TablePagination';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOKING_TABS, ROWS_PER_PAGE } from '@/constants';
import { useGenericQuery } from '@/hooks/useQueryData';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';
import { getAllBookings } from '@/services/booking';
import { Table } from '@tanstack/react-table';

import { BookingColumns } from './components/columns';

const Bookings = () => {
  const navigate = useNavigate();
  const staticText = strings.booking;

  const [filteredData, setFilteredData] = useState<IAllBookingDetails[]>([]); // setFilteredData
  const [activeTab, setActiveTab] = useState(BOOKING_TABS.ALL);
  const [tableState, setTableState] =
    useState<Table<IAllBookingDetails> | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const columns = BookingColumns();
  const { data, isLoading } = useGenericQuery(
    ['getAllBookings'],
    getAllBookings,
  );

  const totalRows = filteredData.length;
  const paginatedData = filteredData.slice(
    pageIndex * ROWS_PER_PAGE,
    (pageIndex + 1) * ROWS_PER_PAGE,
  );
  const shouldPaginate = totalRows > ROWS_PER_PAGE;

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filterData = () => {
        switch (activeTab) {
          case BOOKING_TABS.IN_PROGRESS:
            return data.filter(
              (item) =>
                item.status === BookingStatus.BOOKING_CONFIRMED ||
                BookingStatus.TECH_EN_ROUTE ||
                item.status === BookingStatus.IN_PROGRESS,
            );
          case BOOKING_TABS.COMPLETED:
            return data.filter(
              (item) => item.status === BookingStatus.COMPLETED,
            );
          case BOOKING_TABS.ALL:
          default:
            return data;
        }
      };

      setFilteredData(filterData());
      setPageIndex(0);
    }
  }, [activeTab, data]);

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex justify-between'>
        <Typography variant='subheading'>{staticText.title}</Typography>

        <Button
          className='w-40'
          onClick={() => navigate(ROUTES.CREATE_BOOKING)}
        >
          <div className='flex justify-between items-center gap-1'>
            <FiPlus className='w-8 h-8 text-white' />
            {staticText.createBooking}
          </div>
        </Button>
      </div>

      <div>
        <Tabs
          defaultValue={BOOKING_TABS.ALL}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as BOOKING_TABS)}
        >
          <TabsList>
            <TabsTrigger value={BOOKING_TABS.ALL}>{staticText.all}</TabsTrigger>
            <TabsTrigger value={BOOKING_TABS.IN_PROGRESS}>
              {staticText.inProgress}
            </TabsTrigger>
            <TabsTrigger value={BOOKING_TABS.COMPLETED}>
              {staticText.completed}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className='flex justify-center items-center h-40'>
          <Loader />
        </div>
      ) : (
        <Tabs
          defaultValue={BOOKING_TABS.ALL}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as BOOKING_TABS)}
          className='flex-grow'
        >
          {Object.values(BOOKING_TABS).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              <DataTable
                headClassName='first:rounded-l-xl last:rounded-r-xl border border-lightGrey'
                cellClassName='border-b border-borderColor'
                columns={columns}
                data={paginatedData}
                setTablesState={setTableState}
                pageCount={
                  shouldPaginate ? Math.ceil(totalRows / ROWS_PER_PAGE) : 0
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      )}

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

export default Bookings;
