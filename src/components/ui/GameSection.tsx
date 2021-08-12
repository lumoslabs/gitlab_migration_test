import GameCard from '@components/ui/GameCard'
import { Container } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { GameConfig } from '@backend/services/ConfigService'

const GameSection = ({ games, onClick }: { games: GameConfig[], onClick: (slug: string) => void }): JSX.Element => {

  const gameCards = games.map((props): JSX.Element => {
    const { id: slug } = props
    const { title, brain_area: brainArea, banner_url: bannerUrl } = props.values

    return (
      <GameCard
        onClick={onClick}
        key={`game_card_${title}`}
        title={title}
        brainArea={brainArea}
        bannerUrl={bannerUrl}
        slug={slug}
      />
    )
  })

  const gameCardColumns = []
  for (let col = 0, i = 0; col < ((gameCards.length / 2)); col++) {
    gameCardColumns.push(
      <div className={css([commonStyles.flexRowAllCenter, styles.gridCol])}
        key={`game_col_${i}`}
      >
        {gameCards[i]}
        {gameCards[i + 1]}
      </div>
    )
    i += 2
  }

  return (
    <Container className={css([commonStyles.flexRowAllCenter, styles.gamesDiv])}>
      {gameCardColumns}
    </Container>
  )
}

const styles = StyleSheet.create({
  gamesDiv: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '10px'
  },
  gridCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  }
})

export default GameSection
