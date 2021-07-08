import { GetServerSideProps } from 'next'
import { GameConfig } from '@backend/models/config'
import ConfigService from '@backend/services/ConfigService'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  return (
    <main>
      Game info
      <div>
        {JSON.stringify(game)}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = new ConfigService()
  const game = await service.getCatalogGameBySlug(context.params?.slug as string)

  if (!game) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      game
    }
  }
}
