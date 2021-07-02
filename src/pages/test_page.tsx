// import LoadingComponent from '@components/ui/LoadingComponent';
// import GameProgressBar from '@components/ui/GameProgressBar';
import GameScoreCard from '@components/ui/GameScoreCard';
import { StyleSheet } from 'aphrodite';
import Button from '@components/ui/Button';
import WideActionButton from '@components/ui/WideActionButton';

const styles = StyleSheet.create({
  nextButton: {
    fontStyle: 'italic'
  }
});
export default function Test(): JSX.Element {
  const handleClick = () => { window.location.href = 'https://lumos-assistant.ngrok.io' };
  return (
    <main>
      {/* <GameProgressBar name='Train of Thought' progressLevel={50} /> */}
      {/* <LoadingComponent title=''/> */}
      <GameScoreCard
        title='Color Match'
        description='description'
        gameIcon='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
        showTrainingIcon={true}
        showTrophy={true}
        trainingIcon='assets/training_1by3.svg'
        currentScore={1000}
        scoresData={[]}
        topScoresLoading={false}
        topScoreTodaysScoreIndex={1}
        topScoresData={[]}
        actionButtonText='Next Game'
        actionButtonClicked={false}
        currentPage={window.location.href}
        stat={10}
        statLabel='Cards'
      />
      {/* <Button onClick={handleClick} text='Button' />
      <WideActionButton
        onClick={handleClick}
        buttonText='Wide Action Button'
        extendStyles={styles.nextButton}
        id='test'
        currentPage={window.location.href}
        /> */}
    </main>
  )
}
