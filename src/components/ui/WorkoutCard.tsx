import React from 'react'
import { Card } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { base } from '@styles/colors'
import WideActionButton from '@components/ui/WideActionButton'

export interface IWorkoutCardProps {
  clickHandler(e: React.MouseEvent<any>): any;
  remainingGamesCount: number,
  totalGameCount: number
}

const WorkoutCard = ({ clickHandler, remainingGamesCount = 3, totalGameCount = 3 }: IWorkoutCardProps): JSX.Element => {
  // Workout Card Icon
  let workoutIconUrl = '/assets/workout_icon.svg'
  if (remainingGamesCount === 0) {
    workoutIconUrl = '/assets/training_complete.svg'
  }
  if (remainingGamesCount < totalGameCount && remainingGamesCount > 0) {
    workoutIconUrl = `/assets/training_${totalGameCount - remainingGamesCount}by3.svg`
  }

  // Workout Card Button Text
  let buttonText = 'Start My Workout'
  if (remainingGamesCount < totalGameCount) {
    buttonText = 'Resume Workout'
  }
  if (remainingGamesCount === 0) {
    buttonText = 'Workout Complete'
  }

  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.section])}>
      <Card className={css([commonStyles.flexColumnAllCenter, styles.card])}
        onClick={clickHandler}
      >
        <Card.Body className={css([commonStyles.flexColumnAllCenter, styles.cardBody])}>
          <Card.Img className={css(styles.cardImg)}
            src={workoutIconUrl}
            alt='Workout Icon'
          >
          </Card.Img>
          <Card.Title className={css(styles.cardTitle)}>
            {'Daily Workout'}
          </Card.Title>
          <Card.Subtitle className={css(styles.cardSubtitle)}>
            {'Your daily workout of 3 games.'}
          </Card.Subtitle>
          <WideActionButton
            disabled={remainingGamesCount === 0}
            extendStyles={styles.cta}
            buttonText={buttonText || 'Start My Workout'}
            onClick={clickHandler}
            eventData={{ id: 'start_workout' }}
          />
        </Card.Body>
      </Card>
    </div>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: '4vmin',
    border: 'none',
    boxShadow: `0px 0.125vmin 0.125vmin 0px rgba(0, 0, 0, 0.11),
      0px 0.25vmin 0.5vmin 0px rgba(0, 0, 0, 0.13),
      0px 0.25vmin 0.75vmin 0px rgba(0, 0, 0, 0.1)`
  },

  section: {
    marginRight: '2vmin'
  },

  cardTitle: {
    fontSize: '32x',
    fontFamily: 'MuseoSans700',
    fontWeight: 700,
    lineHeight: '4.5vmin'
  },

  cardSubtitle: {
    color: base.gray8,
    fontSize: '2.75vmin',
    fontFamily: 'MuseoSans500',
    fontWeight: 500,
    lineHeight: '3.25vmin'
  },

  cardImg: {
    width: '19.5vmin',
    height: '19.5vmin'
  },

  cardBody: {
    width: '30vmax',
    height: '60vmin',
    justifyContent: 'space-evenly'
  },

  cta: {
    height: '8.75vmin',
    width: '42.625vmin',
    borderRadius: '4.375vmin',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700
  }
})

export default WorkoutCard
