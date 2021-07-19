import { useAppSelector } from '@store/hooks'
import { getBaseUrl } from '@store/slices/appSlice'
import axios from '@api/index'
import { useEffect } from 'react'

function AxiosHandler(): JSX.Element {
  const baseUrl = useAppSelector(getBaseUrl)
  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])
  return <></>
}

export default AxiosHandler
