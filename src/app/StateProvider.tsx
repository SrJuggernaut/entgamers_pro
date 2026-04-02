'use client'
import store from '@/state/store'
import { type FC, type ReactNode } from 'react'
import { Provider } from 'react-redux'

export interface StateProviderProps {
  children: ReactNode
}

const StateProvider: FC<StateProviderProps> = ({ children }) => {
  return (
    <Provider
      store={store}
    >
      {children}
    </Provider>
  )
}
export default StateProvider
