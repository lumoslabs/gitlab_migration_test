import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row } from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite/no-important';
import commonStyles from '@styles/commonStyles';
import WideActionButton from '@components/ui/WideActionButton';
import LoadingComponent from '@components/ui/LoadingComponent';
import trophyImg from '@assets/trophy.svg';
import trophyBannerImg from '@assets/trophy_banner.svg';

export interface ITopScoreData {
  score: number;
  updated_at: string;
}

export interface IGameScoreCardProps {
  title: string;
  description: string;
  gameIcon?: string;
  showTrainingIcon: boolean;
  showTrophy: boolean;
  trainingIcon?: string;
  currentScore: number;
  scoresData: ITopScoreData[];
  topScoresLoading: boolean;
  topScoreTodaysScoreIndex: number;
  topScoresData: ITopScoreData[];
  actionButtonText: string;
  actionButtonClicked: boolean;
  currentPage: string;
  statLabel: string;
  stat: number;
}

const GameScoreCard = (props: IGameScoreCardProps): JSX.Element => {
  return (
    <div className={css([commonStyles.flexColumnAlignCenter, commonStyles.fullWidth])}>
      <Card className={css([commonStyles.flexColumnAlignCenter, styles.card])}>
        <Card.Body className={ css([styles.cardBody])}>
          <div className={css([commonStyles.flexRowAllCenter, styles.titleDiv])}>
            <div className={css([commonStyles.flexRowAllCenter, styles.mainTitleDiv])}>
              <img
                src={props.gameIcon || '/assets/check_mark_done.png'}
                className={css(styles.gameIconImage)}
                alt='Game Icon'
              />
              <p className={css(styles.title)}>
                {props.title}
              </p>
            </div>
            {props.showTrainingIcon &&
              <div className={css([commonStyles.flexRowAllCenter, styles.trainingIconTitleDiv ])}>
                <img
                  src={props.trainingIcon}
                  className={css(styles.trainingIconImage)}
                  alt='Training Icon'
                />
              </div>
            }
          </div>
          <div className={css([commonStyles.flexRowAllCenter, styles.scoresContainer])}>
            <div className={css([commonStyles.flexColumnAllCenter, styles.currentScoreDiv])}>
              <p className={css(styles.subTitle)}>
                {'Your Score'}
              </p>
              <p className={css(styles.currentScoreText)}>
                {props.currentScore}
              </p>
              <div className={css([commonStyles.flexColumnAlignCenter, styles.scoreValuediv])}>
                <div  className={css(styles.currentStatDiv)}>
                  <p className={css(styles.scoreText)}>
                    <span className={css(styles.scoreLeftAlign)}>{props.statLabel}</span>
                    <span className={css(styles.scoreRightAlign)}>{props.stat}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={css([commonStyles.flexColumnAllCenter, styles.topScoreDiv])}>
              <p className={css(styles.topScoresTitle)}>
                {'Top Scores'}
              </p>
              <Container className={css([commonStyles.flexColumnAlignCenter, styles.topScoreValuediv])}>
                {props.topScoresLoading &&
                  <LoadingComponent
                    title="Loading Top Scores"
                    titleDivHeight='50'
                    loadingDivHeight='100'
                  />
                }
                {!props.topScoresLoading && props.topScoresData && props.topScoresData.map((topScoreData, i) => {
                  return (
                    <Row key={'row'+i} className={css(styles.topScoreRow)}>
                      {props.showTrophy && props.topScoreTodaysScoreIndex == i &&
                        <img
                          src={trophyImg}
                          className={css(styles.trophyImage)}
                        />
                      }
                      {props.showTrophy && props.topScoreTodaysScoreIndex == i &&
                        <img
                          src={trophyBannerImg}
                          className={css(styles.trophyBannerImage)}
                        />
                      }
                      <p key={'col_index'} className={css(styles.topScoreBold)}>
                        { i+1 }
                      </p>
                      <p key={'col_score'} className={css([styles.topScoreBold, styles.topScoreValue])}>
                        {topScoreData.score}
                      </p>
                      <p key={'col_date'} className={css(styles.topScoreDate)}>
                        {/* Will add DayJS to format date*/}
                        {topScoreData.updated_at}
                      </p>
                    </Row>
                  );
                })}
              </Container>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className={css([commonStyles.flexColumnAllCenter, styles.actiondiv])}>
        <WideActionButton
          extendStyles={styles.nextButton}
          buttonText={props.actionButtonText}
          onClick={props.actionButtonClicked}
          id='game_next'
          currentPage={props.currentPage}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  card: {
    cursor: 'pointer',
    borderRadius: '4vmin',
    boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.11),
      0px 2px 4px 0px rgba(0, 0, 0, 0.13),
      0px 2px 6px 0px rgba(0, 0, 0, 0.1)`,
    marginTop: '16vmin',
    width: '120vmin',
    justifyContent: 'space-around',
    height: '60vmin'
  },

  cardBody: {
    width: '100%',
    padding: 0
  },

  titleDiv: {
    marginTop: '5.875vmin',
    marginLeft: '4.5vmin',
    marginRight: '4.5vmin',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  mainTitleDiv: {
    flex: 2,
    justifyContent: 'flex-start'
  },

  trainingIconTitleDiv: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  gameIconImage: {
    height: '8vmin',
    width: '8vmin',
    borderRadius: '1.5vmin',
    objectFit: 'cover'
  },

  trainingIconImage: {
    height: '8vmin',
    width: '8vmin'
  },

  trophyImage: {
    height: '7.44vmin',
    width: '7.595vmin',
    position: 'absolute',
    left: '-5.86vw',
    top: '-2.33vh'
  },

  trophyBannerImage: {
    height: '4.625vmin',
    width: '55vmin',
    position: 'absolute',
    left: '-5vw',
    top: '-0.5vh',
    zIndex: -1
  },

  title: {
    color: '#000000',
    fontFamily: 'MuseoSans500',
    fontSize: '4.5vmin',
    fontWeight: 500,
    display: 'flex',
    margin: '0px',
    padding: '0px',
    marginLeft: '14px'
  },

  scoresContainer: {
    marginTop: '6.5vmin',
    marginLeft: '23.5vmin',
    marginRight: '4.5vmin',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },

  subTitle: {
    color: '#000000',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    display: 'flex',
    lineHeight: '4.25vmin',
    marginBottom: 0,
    width: '100%'
  },

  currentStatDiv: {
    width: '100%'
  },

  currentScoreText: {
    color: 'rgb(252, 99, 51)',
    fontFamily: 'MuseoSans700',
    fontSize: '7vmin',
    fontWeight: 500,
    letterSpacing: '-0.05vmin',
    lineHeight: '7.75vmin',
    marginTop: '0.33vh',
    marginBottom: 0,
    width: '100%'
  },

  currentScoreDiv: {
    justifyContent: 'flex-start',
    width: '16.9vw'
  },

  topScoreDiv: {
    justifyContent: 'flex-start',
    width: '29.6vw',
    marginLeft: '7.6vw',
    alignItems: 'flex-start'
  },

  topScoresTitle: {
    color: '#000000',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    display: 'flex',
    lineHeight: '4.25vmin',
    width: '100%',
    margin: 0
  },

  topScoreRow: {
    marginTop: '1.66vh',
    width: '100%',
    flexWrap: 'nowrap',
    marginLeft: '1.33vh',
    height: '3.5vmin',
    position: 'relative',
    zIndex: 1
  },

  topScoreValuediv: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    padding: 0
  },

  topScoreBold: {
    color: 'rgb(0, 0, 0)',
    fontFamily: 'MuseoSans500',
    fontWeight: 500,
    fontSize: '3vmin',
    lineHeight: '3.4vmin',
    marginRight: '3.515vw',
    padding: 0
  },

  topScoreIndex: {
    width: '5vmin',
    maxWidth: '5vmin',
    textAlign: 'center'
  },

  topScoreValue: {
    textAlign: 'left'
  },

  topScoreDate: {
    color: 'rgb(153, 153, 153)',
    fontFamily: 'MuseoSans500',
    fontWeight: 500,
    fontSize: '3vmin',
    lineHeight: '3.4vmin',
    flexBasis: 'unset',
    flexGrow: 0,
    padding: 0
  },

  scoreValuediv: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '4vh',
    width: '100%'
  },

  scoreText: {
    color: '#000000',
    fontFamily: 'MuseoSans500',
    fontSize: '3vmin',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },

  scoreLeftAlign: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'left',
    flex: 1
  },

  scoreRightAlign: {
    color: 'rgb(153, 153, 153)',
    textAlign: 'right',
    flex: 1
  },

  actiondiv: {
    margin: 0,
    marginTop: '3.33vh',
    padding: 0
  },

  nextButton: {
    height: '8.75vmin',
    width: '31.75vmin',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700
  }
});

export default GameScoreCard;
