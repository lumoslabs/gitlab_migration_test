// import LoadingComponent from '@components/ui/LoadingComponent';
// import GameProgressBar from '@components/ui/GameProgressBar';
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
      <Button onClick={handleClick} text='Button' />
      <WideActionButton
        onClick={handleClick}
        buttonText='Wide Action Button'
        extendStyles={styles.nextButton}
        id='test'
        currentPage={window.location.href}
        />
    </main>
  )
}
