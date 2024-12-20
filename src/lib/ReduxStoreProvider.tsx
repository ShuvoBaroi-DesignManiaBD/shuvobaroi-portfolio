'use client'
import { AppStore, store } from '@/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function ReduxStoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}