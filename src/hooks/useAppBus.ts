import { useContext } from 'react'
import { BusContext } from '@contexts/AppBusContext'

export default function useAppBus() {
  return useContext(BusContext)
}
