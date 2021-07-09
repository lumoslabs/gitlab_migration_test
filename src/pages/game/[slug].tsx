import { GetServerSideProps } from 'next'
import { GameConfig } from '@backend/models/config'
import ConfigService from '@backend/services/ConfigService'
import GameContainer from '@components/ui/GameContainer'

export default function Game({ game }: { game: GameConfig }): JSX.Element {
  return (
    <main>
      {/* {JSON.stringify(game)} */}
      <GameContainer
        game={game}
        showProgress={false}
      />
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
