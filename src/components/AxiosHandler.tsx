import { useAppSelector } from '@store/hooks'
import { getBaseUrl, getAuthToken } from '@store/slices/appSlice'
import axios from '@api/index'
import { useEffect } from 'react'

function AxiosHandler(): JSX.Element {
  const baseUrl = useAppSelector(getBaseUrl)
  const authToken = useAppSelector(getAuthToken)
  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }, [authToken])
  return <></>
}

export default AxiosHandler
