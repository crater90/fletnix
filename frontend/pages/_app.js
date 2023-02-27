import { UserProvider } from '@/contexts/userContext'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Toaster />
      <Component {...pageProps} />
    </UserProvider>
  )
}
