import axios from './index'

export default async function (id: string, eventName: string, eventData: any): Promise<string> {
  const result = await axios.post('/api/games/update', {
    id,
    eventName,
    eventData
  })
  return result.data?.id
}
