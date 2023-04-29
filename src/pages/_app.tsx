import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "fontawesome-free-6.3.0-web/fontawesome-free-6.3.0-web/css/all.min.css"

import store from '@/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    )
}
