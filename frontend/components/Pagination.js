import React from 'react'
import { usePagination, DOTS } from '@/hooks/usePagination';

function Pagination({
  onPageChange,
  totalPages,
  siblingCount = 1,
  currentPage,
}) {

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange?.length - 1];
  return (
    <div className='flex justify-center text-sm pb-5'>
      <ul className={`flex list-none space-x-1 md:space-x-2 border border-gray-200 rounded-md p-2`}>
        <li className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-md bg-slate-200 ${currentPage === 1 && 'pointer-events-none'}`} onClick={onPrevious}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </li>
        {
          paginationRange?.map((pageNumber, idx) => {
            if (pageNumber === DOTS) {
              return <li key={idx} className="bg-transparent cursor-default">&#8230;</li>;
            }

            return (
              <li key={idx} className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-md ${pageNumber === currentPage && 'bg-slate-200'}`} onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </li>
            );
          })
        }
        <li className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-md bg-slate-200 ${currentPage === lastPage && 'pointer-events-none'}`} onClick={onNext}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </li>
      </ul >
    </div>
  )
}

export default Pagination