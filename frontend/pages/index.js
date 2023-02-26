import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Login from '@/components/Login'
import { useState, useEffect, useContext } from 'react'
import Header from '@/components/Header'
import ListView from '@/components/ListView'
import { UserContext } from '@/contexts/userContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsLoggedIn, isLoggedIn } = useContext(UserContext);
  const URL = process.env.PROD_URL;

  useEffect(() => {
    fetch('https://fletnix-api.onrender.com/api/checkAuth', {
      headers: {
        'x-access-token': localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? setIsLoggedIn(true) : null);
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} min-h-screen bg-gradient-to-r from-rose-400 to-orange-300`}>
        {
          isLoggedIn ?
            <>
              <Header />
              <ListView />
            </> :
            <Login />
        }

      </main>
    </>
  )
}
