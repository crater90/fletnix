import React from 'react'

function MovieCard({ data }) {
    const tagColor = data.type === 'Movie' ? 'bg-yellow-400' : 'bg-lime-400'
    return (
        <div className='grid grid-cols-3 md:grid-cols-7 py-2 border border-gray-200 rounded'>
            <a className='text-center text-gray-700 font-semibold'>{data.show_id}</a>
            <h1 className='col-span-2 font-semibold'>{data.title}</h1>
            <div className='flex justify-center items-center'>
                <a className={`py-0.5 px-1 rounded ${tagColor} font-semibold text-sm`}>{data.type}</a>
            </div>
            <h1 className='text-center text-gray-600'>{data.release_year}</h1>
            <h1 className='text-center font-semibold text-gray-700'>{data.rating}</h1>
            <h1>{data.duration}</h1>
        </div>
    )
}

export default MovieCard