import axios from './index'


export default async function (slug): Promise<string> {
  const result = await axios.post('/api/games/create', {
    slug
  })
  return result.data?.id
}
