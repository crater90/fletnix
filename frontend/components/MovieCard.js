import React from 'react'
import { useRouter } from 'next/router';

function MovieCard({ data }) {

  const router = useRouter();
  const tagColor = data.type === 'Movie' ? 'bg-yellow-400' : 'bg-lime-400';

  const handleClick = () => {
    router.push(`/${data.show_id}`);
  }

  return (
    <div className='grid grid-cols-5 gap-2 md:gap-0 md:grid-cols-7 py-2 border-y group hover:bg-slate-200 border-gray-200 md:rounded '>
      <p className='place-self-center  hidden md:inline-block text-gray-700 font-semibold'>{data.show_id}</p>
      <h1 onClick={handleClick} className='col-span-2 text-sm pl-2 md:pl-0 sm:text-base group-hover:underline font-semibold cursor-pointer'>{data.title}</h1>
      <div className='flex justify-center items-center'>
        <p className={`py-0.5 px-1 rounded ${tagColor} font-semibold text-xs md:text-sm`}>{data.type}</p>
      </div>
      <p className='place-self-center hidden md:inline-block text-gray-600'>{data.release_year}</p>
      <p className='place-self-center font-semibold text-gray-700 text-xs sm:text-base'>{data.rating}</p>
      <p className='place-self-center text-xs sm:text-base'>{data.duration}</p>
    </div>
  )
}

export default MovieCard