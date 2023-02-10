import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <ToastContainer Limit={1}/>
      <Component {...pageProps} />
    </Layout>
  )
}
