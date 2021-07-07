import LoadingComponent from '@components/ui/LoadingComponent';
import UserBar from '@components/ui/UserBar';
import GameContainer from '@components/ui/GameContainer';
import GameScoreCard from '@components/ui/GameScoreCard';
import { StyleSheet } from 'aphrodite';
import Button from '@components/ui/Button';
import WideActionButton from '@components/ui/WideActionButton';
import WorkoutCard from '@components/ui/WorkoutCard';

const styles = StyleSheet.create({
  nextButton: {
    fontStyle: 'italic'
  }
});

export default function Test(): JSX.Element {
  const handleClick = () => { window.location.href = 'https://lumos-assistant.ngrok.io' };

  return (
    <main>
      <WorkoutCard clickHandler={handleClick}  />
      <UserBar clickHandler={handleClick} />
      {/* <GameContainer /> */}
      {/* <LoadingComponent title=''/> */}
      {/* <GameScoreCard
        title='Color Match'
        description='description'
        gameIcon='https://assets-staging.nest.lumosity.com/frontend_assets/thumbnails/medium_thumbnail_color_match.png'
        showTrainingIcon={true}
        showTrophy={true}
        trainingIcon='assets/training_1by3.svg'
        currentScore={100000}
        topScoreTodaysScoreIndex={0}
        topScoresData={[{"updated_at":"05/02/2020","score":600000}, {"updated_at":"2021-07-02T20:15:27Z","score":55000}, {"updated_at":"07/01/2020","score":5000}, {"updated_at":"07/01/2020","score":4000}, {"updated_at":"07/01/2020","score":3000}]}
        actionButtonText='Next Game'
        actionButtonHandler={handleClick}
        currentPage={window.location.href}
        stat={10}
        statLabel='Cards'
      /> */}
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
