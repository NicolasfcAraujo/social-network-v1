import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "../../fontawesome-free-6.3.0-web/fontawesome-free-6.3.0-web/css/all.min.css"
import store from '@/redux/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
}
