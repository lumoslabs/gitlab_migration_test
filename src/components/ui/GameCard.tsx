import React from 'react'
import { Card } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { base } from '@styles/colors'

const { black } = base

export interface IGameCardProps {
  clickHandler(e: React.MouseEvent<any>): any;
  brainArea: string;
  bannerUrl: string;
  title: string;
}

const GameCard = (props: IGameCardProps): JSX.Element => {
  return (
    <div className={css([commonStyles.flexRowAllCenter, styles.gridCol])}>
      <Card className={css([commonStyles.flexColumnAllCenter, styles.card])}
        onClick={props.clickHandler}
      >
        <Card.Img className={css(styles.cardImg)}
          variant="top"
          src={props.bannerUrl}
        />
        <Card.Body className={css([commonStyles.flexColumn, styles.cardBody])}>
          <p className={css([commonStyles.pageTitle, styles.subTitle])}>
            {props.brainArea}
          </p>
          <Card.Title className={css(styles.title)}>
            {props.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = StyleSheet.create({
  gridCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  },

  card: {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '2vmin',
    boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.11),
      0px 2px 4px 0px rgba(0, 0, 0, 0.13),
      0px 2px 6px 0px rgba(0, 0, 0, 0.1)`,
    overflow: 'hidden',
    marginBottom: '2vmin',
    marginRight: '2vmin'
  },

  title: {
    fontSize: '3.625vmin',
    fontWeight: 700,
    color: black,
    fontFamily: 'MuseoSans700',
    lineHeight: '4.25vmin'
  },

  subTitle: {
    fontSize: '2.125vmin',
    fontWeight: 700,
    color: '#717171',
    letterSpacing: '0.1vmin',
    lineHeight: '2.75vmin',
    fontFamily: 'MuseoSans700',
    marginBottom: '0.5vmin'
  },

  cardImg: {
    width: '34.5vmin',
    height: '14.5vmin',
    objectFit: 'cover'
  },

  cardBody: {
    width: '34.5vmin',
    height: '14.5vmin',
    justifyContent: 'flex-start',
    padding: '2.5vmin'
  },
});

export default GameCard;
