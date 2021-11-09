import { useEffect, useState } from 'react'
import AgeGate from '@components/ui/AgeGate'
import useInteractiveCanvas, { Scenes } from '@hooks/useInteractiveCanvas'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectBirthday, selectIsBanned, setBirthday } from '@store/slices/ageGate'
import useAppBusListener from '@hooks/useAppBusListener'
import useNavigation from '@hooks/useNavigation'

export default function ageGate(): JSX.Element {
  const dispatch = useAppDispatch()

  const { outputTts, triggerScene } = useInteractiveCanvas()
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const birthday = useAppSelector(selectBirthday)
  const isBanned = useAppSelector(selectIsBanned)

  const navigation = useNavigation()

  useAppBusListener('onTtsMark', (markName) => {
    if ((markName === 'END') && isBanned && loading) {
      triggerScene(Scenes.EndConversation)
    }
  })

  useEffect(() => {
    if (isBanned) {
      outputTts('We’re sorry, but you’re not eligible to create an account. Please contact us at help.lumosity.com for more information.')
    } else if (birthday) {
      navigation.toHome()
    } else {
      outputTts(`Please select your birth date on the screen. Your birthday will be stored and added to your Lumosity account if you choose to create one.`)
      setLoading(false)
    }
  }, [isBanned, birthday])

  const onSubmit = (birthday: Date) => {
    setDisabled(true)
    dispatch(setBirthday(birthday))
  }

  if (loading) {
    return <></>
  }

  return <AgeGate onSubmit={onSubmit} disabled={disabled} />
}
