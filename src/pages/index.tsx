import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { GameConfig } from '@backend/models/config'

import {
  MemoryRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import IndexPage from '@routes/index'
import HomePage from '@routes/home'
import GamePage from '@routes/game'
import NestHandler from '@components/NestHandler'

import ConfigService from '@backend/services/ConfigService'

export function Index({ games }: { games: GameConfig[] }): JSX.Element {
  const gameRoutes = games.map((game) => {
    return <Route exact path={`/game/${game.id}`} key={game.id}>
      <GamePage game={game} />
    </Route>
  })

  return (
    <Router>
      <NestHandler />
      <Switch>
        <Route exact path='/'>
          <IndexPage />
        </Route>
        <Route exact path='/home'>
          <HomePage games={games} />
        </Route>
        {gameRoutes}
      </Switch>
    </Router>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const games = await (new ConfigService()).getCatalogGames()
  return {
    props: {
      games
    }
  }
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false
})
