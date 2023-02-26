import Header from '@/components/Header';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';


const inter = Inter({ subsets: ['latin'] });

function MovieShowPage() {
    const [data, setData] = useState()
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const getMovieShow = async () => {
            try {
                const url = `https://fletnix-api.onrender.com/api/get-a-movie-show?id=${id}`
                const res = await fetch(url);
                const resData = await res.json();
                setData(resData.data[0]);
                console.log(resData.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        getMovieShow();
    }, [])

    const cast = data?.cast?.split(",");
    const listed = data?.listed_in?.split(",");
    const tagColor = data?.type === 'Movie' ? 'bg-yellow-400 border-yellow-600' : 'bg-lime-400 border-lime-600'

    return (
        <>
            <main className={`${inter.className} min-h-screen bg-gradient-to-r from-rose-400 to-orange-300`}>
                <Header />
                <div className='py-10'>
                    {
                        data && (
                            <div className='max-w-4xl mx-auto bg-white md:rounded-md shadow-md text-sm sm:text-base p-5'>
                                <h1 className='text-3xl font-semibold pb-5'>{data?.title}</h1>
                                <ul className='flex flex-wrap items-center justify-start gap-2 md:gap-5 pb-2'>
                                    <li className='font-bold text-gray-500'>{data?.release_year}</li>
                                    <li>{data?.duration}</li>
                                    <li>{data?.country}</li>
                                    <li className={`px-2 py-0.5 rounded-2xl border shadow ${tagColor}`}><span>{data?.type}</span></li>
                                    <li className='text-rose-600 font-semibold'>{data?.rating}</li>
                                </ul>
                                <hr className='pb-2' />
                                <ul className='flex items-center justify-start space-x-3 list-none pb-2'>
                                    {listed?.map((list, idx) => {
                                        return (
                                            <li className='px-2 py-0.5 shadow rounded-2xl bg-slate-100 border border-slate-300 text-center' key={idx}>{list}</li>
                                        )
                                    })}
                                </ul>
                                <p className='text-gray-600 font-medium pb-2'>{data?.description}</p>
                                <hr className='pb-2' />
                                <h1 className='pb-2 text-gray-900 font-bold'>CAST</h1>
                                <ul className='flex flex-wrap gap-3 items-center justify-start list-none'>
                                    {cast?.map((item, idx) => {
                                        return (
                                            <li key={idx} className='py-2 font-medium text-slate-600 px-4 rounded bg-slate-50 border border-slate-300 shadow-xs shadow-slate-400'>{item}</li>
                                        )
                                    })}
                                </ul>

                            </div>
                        )
                    }
                    <div onClick={() => router.push('/')} className='flex items-center justify-center pt-5'>
                        <button className='flex items-center justify-center bg-white rounded-md shadow-md text-sm sm:text-base px-4 py-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Go Back
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MovieShowPage