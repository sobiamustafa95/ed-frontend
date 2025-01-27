import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table } from '@tanstack/react-table';

interface Props<TData> {
  tableState: Table<TData> | null;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TablePagination = <TData,>({
  tableState,
  pageIndex,
  setPageIndex,
}: Props<TData>) => {
  const indexButtonCount = 5;
  const pageCount = tableState?.getPageCount() || 0;
  const showEllipseAndLastPageIndex =
    pageCount > indexButtonCount && pageCount - pageIndex > 4;

  const getIndexes = () => {
    if (pageIndex === 0) {
      if (pageCount > indexButtonCount) {
        // Show the first 3 pages plus ellipse and last page
        return tableState?.getPageOptions()?.slice(0, 3);
      }
      // Show all buttons from 0 to pageCount and hide ellipse and last page
      return tableState?.getPageOptions()?.slice(0, indexButtonCount);
    } else if (pageIndex >= pageCount - 4) {
      // Show all buttons from pageCount - 4 to pageCount are visible, hide ellipse and last page
      return tableState?.getPageOptions()?.slice(-indexButtonCount);
    }
    // Show current, previous and next page
    return tableState?.getPageOptions()?.slice(pageIndex - 1, pageIndex + 2);
  };

  const handleGoToPreviousPage = () => {
    if (tableState?.getCanPreviousPage()) {
      setPageIndex((prev) => prev - 1);
      tableState?.previousPage();
    }
  };
  const handleGoToIndex = (selectedPageIndex: number) => {
    setPageIndex(selectedPageIndex);
    tableState?.setPageIndex(selectedPageIndex);
  };
  const handleGoToNextPage = () => {
    if (tableState?.getCanNextPage()) {
      setPageIndex((prev) => prev + 1);
      tableState?.nextPage();
    }
  };

  if (pageCount < 2) return;
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex justify-center self-end'>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={handleGoToPreviousPage}
              disabled={!tableState?.getCanPreviousPage()}
              className='cursor-pointer'
            />
            {getIndexes()?.map((selectedPageIndex) => (
              <PaginationItem key={selectedPageIndex}>
                <PaginationLink
                  isActive={pageIndex === selectedPageIndex}
                  onClick={() => handleGoToIndex(selectedPageIndex)}
                >
                  {selectedPageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {showEllipseAndLastPageIndex ? (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={pageIndex === pageCount - 1}
                    onClick={() => handleGoToIndex(pageCount - 1)}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : null}
            <PaginationNext
              onClick={handleGoToNextPage}
              disabled={!tableState?.getCanNextPage()}
              className='cursor-pointer'
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
