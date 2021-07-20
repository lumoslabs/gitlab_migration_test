import axios from './index'


export default async function (slug): Promise<Array<{ score: number; updated_at: string; }>> {
  const result = await axios.get('/api/games/scores', {
    params: {
      slug
    }
  })
  return result.data
}
