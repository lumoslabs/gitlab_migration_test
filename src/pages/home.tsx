import { GetServerSideProps } from 'next'
import { GameConfig } from '@backend/models/config'
import ConfigService from '@backend/services/ConfigService'
import Link from 'next/link'

export default function Home({ games }: { games: GameConfig[] }): JSX.Element {
  return (
    <main>
      <h3>Games</h3>
      <ul>
        {
          games.map((game) =>
            <li key={game.id}><Link href={`/game/${game.values.slug}`}><a>{game.name}</a></Link></li>
          )
        }
      </ul>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const service = new ConfigService()
  const games = await service.getCatalogGames()
  return {
    props: {
      games
    }
  }
}
