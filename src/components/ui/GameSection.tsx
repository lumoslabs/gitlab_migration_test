import GameCard from '@components/ui/GameCard'
import {  Container } from 'react-bootstrap'
// TODO import { analyticsPageView } from '../../segment/analytics'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'

const GameSection = (): JSX.Element => {

  // TODO: Get this from database?
  const allGames = [
    {
      slug: 'train-of-thought-nest',
      title: 'Train of Thought',
      brainArea: 'ATTENTION',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/train_of_thought_header.png'
    },
    {
      slug: 'color-match-nest',
      title: 'Color Match',
      brainArea: 'FLEXIBILITY',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/color_match_header.png'
    },
    {
      slug: 'ebb-and-flow-nest',
      title: 'Ebb and Flow',
      brainArea: 'FLEXIBILITY',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/ebb_and_flow_header.png'
    },
    {
      slug: 'raindrops-nest',
      title: 'Raindrops',
      brainArea: 'MATH',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/raindrops_header.png'
    },
    {
      slug: 'word-snatchers-nest',
      title: 'Word Snatchers',
      brainArea: 'LANGUAGE',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/word_snatchers_header.png'
    }
  ]

  const gameCards = allGames.map((props): JSX.Element => {
    const { title, brainArea, bannerUrl, slug } = props

    return (
      <GameCard
        key={`game_card_${title}`}
        title={title}
        brainArea={brainArea}
        bannerUrl={bannerUrl}
        slug={slug}
      />
    );
  });

  const gameCardColumns = []
  for (let col = 0, i=0; col < ((gameCards.length / 2)); col++) {
    gameCardColumns.push(
      <div className={css([commonStyles.flexRowAllCenter, styles.gridCol])}
        key={`game_col_${i}`}
      >
        {gameCards[i]}
        {gameCards[i+1]}
      </div>
    );
    i += 2;
  }

  return (
    <Container className={css([commonStyles.flexRowAllCenter, styles.gamesDiv])}>
      {gameCardColumns}
    </Container>
  );
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

export default GameSection;
