import React, { useState, useEffect, useContext } from 'react'
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import { UserContext } from '@/contexts/userContext';

function ListView() {

  const [data, setData] = useState();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const { userAge } = useContext(UserContext);
  const [loading, setLoading] = useState();
  const baseURL = 'https://fletnix-api.onrender.com/api/all-movies-shows';

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  }

  useEffect(() => {
    const getMoviesShows = async () => {
      try {
        setLoading(true);
        setData(null);
        const url = `${baseURL}?page=${page}&filter=${filter}&search=${search}&age=${userAge}`
        const res = await fetch(url);
        const resData = await res.json();
        setData(resData.moviesShows);
        setPaginationData(resData.paging);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getMoviesShows();

  }, [page, filter, search])

  return (
    <div className='py-10'>
      <div className='max-w-4xl mx-auto bg-white md:rounded-md shadow-md'>
        <div className='pt-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='mx-2 md:mx-0 flex justify-end'>
            <div className='flex-none border border-gray-200 rounded-md text-sm font-medium text-center'>
              <button onClick={(e) => setFilter('All')} className={`inline-block p-2 cursor-pointer rounded-l ${filter === 'All' && 'bg-gray-300'}`}>All</button>
              <button onClick={(e) => setFilter('Movie')} className={`inline-block p-2 cursor-pointer ${filter === 'Movie' && 'bg-gray-300'}`}>Movie</button>
              <button onClick={(e) => setFilter('TV Show')} className={`inline-block p-2 cursor-pointer rounded-r ${filter === 'TV Show' && 'bg-gray-300'}`}>Show</button>
            </div>
          </div>
          <form onSubmit={handleSearch} className=' mx-2 md:mx-0 md:mr-5 flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-100'>
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='w-full block p-2 bg-gray-100 outline-none text-sm' type='text' placeholder='Search Title, Caste, etc' />
            <button type='submit'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>

        {data?.length === 0 && (
          <div className='flex items-center justify-center font-semibold pb-5'>
            No result found
          </div>
        )}
        {loading && (
          <div className='flex items-center justify-center font-semibold pb-5'>
            Loading Data, Please wait...
          </div>
        )}

        {data?.map((movie, idx) => {
          return (
            <div className='pb-2 md:pb-5' key={idx}>
              <MovieCard data={movie} />
            </div>
          )
        })}

        <Pagination
          currentPage={page}
          totalPages={paginationData?.totalPages}
          onPageChange={page => setPage(page)}
        />
      </div>
    </div>
  )
}

export default ListView