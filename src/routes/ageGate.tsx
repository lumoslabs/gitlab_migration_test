import { useEffect, useState } from 'react'
import AgeGate from '@components/ui/AgeGate'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'

export default function ageGate(): JSX.Element {
  const { outputTts, sendTextQuery } = useInteractiveCanvas()
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    // TODO: Revise with legal approved copy
    outputTts(`Please select your birth date on the screen. Your birthday will be stored and added to your Lumosity account if you choose to create one.`)
  }, [])

  const onSubmit = (birthday) => {
    setDisabled(true)
    sendTextQuery('Invoke Age Gate Result', { birthday: birthday })
  }

  return <AgeGate onSubmit={onSubmit} disabled={disabled} />
}
