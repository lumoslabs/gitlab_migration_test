import GameCard from '@components/ui/GameCard'
import {  Container } from 'react-bootstrap'
// TODO import { analyticsPageView } from '../../segment/analytics'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'

const styles = StyleSheet.create({
  gamesDiv: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '10px'
  },

  title: {
    width: '100%',
    margin: 0,
  },

  gridCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  },
});

export interface IGameCardsProps {
  i: number;
  title: string;
  brainArea: string;
  bannerUrl: string;
  gameUrl: string;
}

const GameSection = (): JSX.Element => {
  const allGames = [
    {
      name: 'color-match-nest',
      title: 'Color Match',
      brainArea: 'FLEXIBILITY',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/color_match_header.png',
      gameUrl: 'https://assets.nest.lumosity.com/game-assets/ColorMatch_CC/nest_lowres/a213a4c63155fa5fde7fbe266d42654a33b71a56/289067450/release/'
    },
    {
      name: 'ebb-and-flow-nest',
      title: 'Ebb and Flow',
      brainArea: 'FLEXIBILITY',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/ebb_and_flow_header.png',
      gameUrl: 'https://assets.nest.lumosity.com/game-assets/EbbAndFlow_CC/nest_lowres/cd95f718b77a7320a74542238f9bf8895faac790/289522478/release/'
    },
    {
      name: 'raindrops-nest',
      title: 'Raindrops',
      brainArea: 'MATH',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/raindrops_header.png',
      gameUrl: 'https://assets.nest.lumosity.com/game-assets/Raindrops_CC/nest_lowres/3bea7a3244b88385fa8aef44f9484770f1a6d924/289602258/release/'
    },
    {
      name: 'train-of-thought-nest',
      title: 'Train of Thought',
      brainArea: 'ATTENTION',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/train_of_thought_header.png',
      gameUrl: 'https://assets.nest.lumosity.com/game-assets/TrainOfThought_CC/nest_lowres/43a41021888c93d6b1fe1401ca0459f4655f2df3/289057183/release/'
    },
    {
      name: 'word-snatchers-nest',
      title: 'Word Snatchers',
      brainArea: 'LANGUAGE',
      bannerUrl: 'https://assets.nest.lumosity.com/frontend_assets/banner/word_snatchers_header.png',
      gameUrl: 'https://assets.nest.lumosity.com/game-assets/WordSnatchers_CC/nest_lowres/65db28a8e7fa8b8bf3ea2a2a6c67ac6533956258/289509235/release/'
    }
  ]

  const gameCards = allGames.map((props): JSX.Element => {
    const { title, brainArea, bannerUrl, gameUrl } = props
    const handleClick = () => { window.location.href = gameUrl }

    return (
      <GameCard
        key={`game_card_${title}`}
        title={title}
        brainArea={brainArea}
        bannerUrl={bannerUrl}
        clickHandler={handleClick}
      />
    );
  });

  const gameCardColumns = [];
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
    <Container className={css([commonStyles.flexRowAllCenter, styles.gamesDiv]) }>
      {gameCardColumns}
    </Container>
  );
}

export default GameSection;
