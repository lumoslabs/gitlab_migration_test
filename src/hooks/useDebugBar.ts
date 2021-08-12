import useAppBus from './useAppBus'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function useDebugBar() {
  const bus = useAppBus()

  if (!publicRuntimeConfig.debugBar) {
    return () => { }
  }

  return (...args) => {
    bus.emit('onDebugLog', args.map((e) => (typeof e === 'string') ? e : JSON.stringify(e)).join(' '))
  }
}

