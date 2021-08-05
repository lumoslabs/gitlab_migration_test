import { useEffect, useState } from 'react'
import { getUser } from '@store/slices/appSlice'
import { useAppSelector } from '@store/hooks'
import AgeGate from '@components/ui/AgeGate'
import useInteractiveCanvas from '@hooks/useInteractiveCanvas'

export default function ageGate(): JSX.Element {
  const { outputTts, sendTextQuery } = useInteractiveCanvas()
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    outputTts(`Age gate welcome text`)
  }, [])

  const onSubmit = (birthday) => {
    setDisabled(true)
    sendTextQuery('Invoke Age Gate Result', { birthday: birthday })
  }

  return <AgeGate onSubmit={onSubmit} disabled={disabled} />
}
