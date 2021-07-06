import React from 'react';
import { Card } from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite/no-important';
import commonStyles from '@styles/commonStyles';
import { base } from '@styles/colors';

const { lumosOrange } = base

const brainAreaColorsMap = {
  ATTENTION: lumosOrange,
  FLEXIBILITY: 'rgb(249, 136, 22)',
  MATH: 'rgb(154, 75, 138)',
  LANGUAGE: 'rgb(14, 145, 161)',
};

export interface IGameCardProps {
  clickHandler(e: React.MouseEvent<any>): any;
  brainArea: string;
  bannerUrl: string;
  title: string;
}

const GameCard = (props: IGameCardProps): JSX.Element => {
  const brainAreaColor = brainAreaColorsMap[props.brainArea];

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
          <p className={css([commonStyles.pageTitle, subTitleStyle({color: brainAreaColor}).subTitle])}>
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

const subTitleStyle = (props) => StyleSheet.create({
  subTitle: {
    fontSize: '2.125vmin',
    fontWeight: 700,
    color: props.color,
    letterSpacing: '0.1vmin',
    lineHeight: '2.75vmin',
    fontFamily: 'MuseoSans700',
    marginBottom: '0.5vmin'
  },
});

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
    color: '#000000',
    fontFamily: 'MuseoSans700',
    lineHeight: '4.25vmin'
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
