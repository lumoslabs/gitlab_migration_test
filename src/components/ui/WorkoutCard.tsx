import React from 'react'
import { Card } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { base } from '@styles/colors'
import WideActionButton from '@components/ui/WideActionButton'

export interface IWorkoutCardProps {
  clickHandler(e: React.MouseEvent<any>): any;
  workoutImage?: string;
  buttonText?: string;
  currentPage?: string;
}

const WorkoutCard = (props: IWorkoutCardProps): JSX.Element => {

  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.section])}>
      <Card className={css([commonStyles.flexColumnAllCenter, styles.card])}
        onClick={props.clickHandler}
      >
        <Card.Body className={css([commonStyles.flexColumnAllCenter, styles.cardBody])}>
          <Card.Img className={css(styles.cardImg)}
            src={props.workoutImage || '/assets/workout_icon.svg'}
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
            extendStyles={styles.cta}
            buttonText={props.buttonText || 'Start My Workout'}
            onClick={props.clickHandler}
            id='start_workout'
            currentPage={props.currentPage || window.location.href}
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
