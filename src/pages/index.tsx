import { GetServerSideProps } from 'next'
import { GameConfig } from '@backend/services/ConfigService'
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
import ConfigService from '@backend/services/ConfigService'
import AppBusProvider from '@contexts/AppBusContext'
import InteractiveCanvasProvider from '@contexts/InteractiveCanvasContext'
import DebugBar from '@components/DebugBar'
import getConfig from 'next/config'

export function Index({ games }: { games: GameConfig[] }): JSX.Element {
  const { publicRuntimeConfig } = getConfig()
  const gameRoutes = games.map((game) => {
    return <Route exact path={`/game/${game.id}`} key={game.id}>
      <GamePage game={game} />
    </Route>
  })

  return (
    <Router>
      <AppBusProvider>
        <InteractiveCanvasProvider>
          {publicRuntimeConfig.debugBar && <DebugBar />}
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
        </InteractiveCanvasProvider>
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

export default Index
