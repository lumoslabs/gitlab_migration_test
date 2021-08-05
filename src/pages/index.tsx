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
import TrainingPage from '@routes/training'
import AccountLinkingPage from '@routes/accountLinking'
import AgeGate from '@routes/ageGate'
import NestHandler from '@components/NestHandler'
import ConfigService from '@backend/services/ConfigService'
import AppBusProvider from '@contexts/AppBusContext'

export function Index({ games }: { games: GameConfig[] }): JSX.Element {
  const gameRoutes = games.map((game) => {
    return <Route exact path={`/game/${game.id}`} key={game.id}>
      <GamePage game={game} />
    </Route>
  })

  return (
    <Router>
      <AppBusProvider>
        <NestHandler />
        <Switch>
          <Route exact path='/'>
            <IndexPage />
          </Route>
          <Route exact path='/home'>
            <HomePage games={games} />
          </Route>
          <Route exact path='/training'>
            <TrainingPage games={games} />
          </Route>
          <Route exact path='/account-linking'>
            <AccountLinkingPage />
          </Route>
          <Route exact path='/age-gate'>
            <AgeGate />
          </Route>
          {gameRoutes}
        </Switch>
      </AppBusProvider>
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
