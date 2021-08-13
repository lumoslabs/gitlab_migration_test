import AppBusProvider from '@contexts/AppBusContext'
import useAppBus from '@hooks/useAppBus'
import useAppBusListener from '@hooks/useAppBusListener'
import { useCallback } from 'react'
import { useState } from 'react'



export function Test(): JSX.Element {
  return (
    <AppBusProvider>
      <div>
        hello
        <br />
        <Listener />
        <br />
        <Trigger />
      </div>
    </AppBusProvider>
  )
}

function Listener(): JSX.Element {
  const [count, setCount] = useState(0)

  const onHelp = useCallback(() => {
    console.log('onIntentHelp', count)
    if (count) {
      setCount(count + 1)
    }
  }, [count])
  useAppBusListener('onIntentHelp', onHelp)

  const rollbackCount = () => {
    setCount(count + 100)
  }

  return (
    <>
      {count}
      <button onClick={rollbackCount}>100</button>
    </>
  )
}

function Trigger(): JSX.Element {
  const bus = useAppBus()
  return <button onClick={() => { bus.emit('onIntentHelp') }}>inc</button>
}

export default Test
