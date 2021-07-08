import React from 'react'
import Card from 'react-bootstrap/Card'
import { Container, Row, Col } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import WideActionButton from '@components/ui/WideActionButton'
import base from '@styles/colors/base'

const { black, gray7, lumosOrange } = base;

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
  topScoreTodaysScoreIndex: number;
  topScoresData: ITopScoreData[];
  actionButtonText: string;
  actionButtonHandler(e: React.MouseEvent<any>): any;
  currentPage: string;
  statLabel: string;
  stat: number;
}

const GameScoreCard = (props: IGameScoreCardProps): JSX.Element => {
  const dayjs = require('dayjs')
  const formattedDate = (date: string) => dayjs(date).format('MMM DD, YYYY')

  return (
    <div className={css([commonStyles.flexColumnAlignCenter, commonStyles.fullWidth])}>
      <Card className={css([commonStyles.flexColumnAlignCenter, styles.card])}>
        <Card.Body className={css(styles.cardBody)}>
          <div className={css([commonStyles.flexRowAllCenter, styles.titleDiv])}>
            <img
              src={props.gameIcon || '/assets/check_mark_done.png'}
              className={css(styles.gameIconImage)}
              alt='Game Icon'
            />
            <p className={css(styles.title)}>
              {props.title}
            </p>
            {props.showTrainingIcon && (
              <div className={css([commonStyles.flexRowAllCenter, styles.trainingIconTitleDiv])}>
                <img
                  src={props.trainingIcon}
                  className={css(styles.trainingIconImage)}
                  alt='Training Icon'
                />
              </div>
            )}
          </div>
          <div className={css([commonStyles.flexRowAllCenter, styles.scoresContainer])}>
            <div className={css(commonStyles.flexColumnAllCenter)}>
              <p className={css(styles.subTitle)}>
                {'Your Score'}
              </p>
              <p className={css(styles.currentScoreText)}>
                {props.currentScore}
              </p>
              <div className={css([commonStyles.flexColumnAlignCenter, styles.currentStatDiv])}>
                <Container>
                  <Row>
                    <Col xs={6} className={css(styles.alignLeft)}>
                      <p className={css(styles.statLabel)}>
                        {props.statLabel}
                      </p>
                    </Col>
                    <Col xs={6}>
                      <p className={css(styles.statNumber)}>
                        {props.stat}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            <div className={css([commonStyles.flexColumnAllCenter, styles.topScoreDiv])}>
              {props.topScoresData && (
                <>
                  <p className={css(styles.topScoresTitle)}>
                    {'Top Scores'}
                  </p>
                  <Container className={css([commonStyles.flexColumnAlignCenter, styles.topScoreValueDiv])}>
                    {props.topScoresData.map((topScoreData, i) => {
                      return (
                        <Row key={'row'+i} className={css(styles.topScoreRow)}>
                          {props.showTrophy && props.topScoreTodaysScoreIndex == i && (
                            <>
                              <img
                                src='/assets/trophy.svg'
                                className={css(styles.trophyImage)}
                                alt='trophy'
                              />
                              <img
                                src='/assets/trophy_banner.svg'
                                className={css(styles.trophyBannerImage)}
                                alt='trophy banner'
                              />
                            </>
                          )}
                          <Col xs={2} className={css(styles.alignLeft)}>
                            <p key={'col_index'} className={css(styles.topScoreBold)}>
                              {i+1}
                            </p>
                          </Col>
                          <Col className={css(styles.alignLeft)}>
                            <p key={'col_score'} className={css(styles.topScoreBold)}>
                              {topScoreData.score}
                            </p>
                          </Col>
                          <Col xs={7} className={css(styles.alignRight)}>
                            <p key={'col_date'} className={css(styles.topScoreDate)}>
                              {formattedDate(topScoreData.updated_at)}
                            </p>
                          </Col>
                        </Row>
                      );
                    })}
                  </Container>
                </>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className={css(commonStyles.flexColumnAllCenter)}>
        <WideActionButton
          extendStyles={styles.nextButton}
          buttonText={props.actionButtonText}
          onClick={props.actionButtonHandler}
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
    justifyContent: 'flex-start',
    flex: 2,
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

  title: {
    color: black,
    fontFamily: 'MuseoSans500',
    fontSize: '4.5vmin',
    fontWeight: 500,
    display: 'flex',
    margin: '0px',
    padding: '0px',
    marginLeft: '5vmin'
  },

  scoresContainer: {
    marginTop: '5vmin',
    marginLeft: '14vmin',
    marginRight: '4.5vmin',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },

  subTitle: {
    color: black,
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    display: 'flex',
    lineHeight: '4.25vmin',
    marginBottom: 0,
    width: '100%'
  },

  currentScoreText: {
    color: lumosOrange,
    fontFamily: 'MuseoSans700',
    fontSize: '7vmin',
    fontWeight: 500,
    letterSpacing: '-0.05vmin',
    lineHeight: '7.75vmin',
    marginTop: '0.33vh',
    marginBottom: 0,
    width: '100%'
  },

  leftScoreDiv: {
    justifyContent: 'flex-start',
    width: '16.9vw'
  },

  currentStatDiv: {
    width: '16.9vw',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '4vh',
    fontFamily: 'MuseoSans500',
    fontSize: '3vmin',
    fontWeight: 500,
    textAlign: 'left',
    flex: 1
  },

  statLabel: {
    color: black,
  },

  statNumber: {
    color: gray7
  },

  topScoreDiv: {
    justifyContent: 'flex-start',
    width: '29.6vw',
    marginLeft: '7.6vw',
    alignItems: 'flex-start'
  },

  topScoresTitle: {
    color: black,
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    display: 'flex',
    lineHeight: '4.25vmin',
    width: '100%',
    margin: 0
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

  topScoreValueDiv: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    padding: 0
  },

  topScoreRow: {
    marginTop: '1.66vh',
    width: '90%',
    flexWrap: 'nowrap',
    marginLeft: '1.33vh',
    height: '3.5vmin',
    position: 'relative',
    zIndex: 1
  },

  alignLeft: {
    textAlign: 'left',
    padding: 0
  },

  alignRight: {
    textAlign: 'right'
  },

  topScoreBold: {
    color: black,
    fontFamily: 'MuseoSans500',
    fontWeight: 500,
    fontSize: '3vmin',
    lineHeight: '3.4vmin',
    padding: 0
  },

  topScoreDate: {
    textAlign: 'right',
    color: gray7,
    fontFamily: 'MuseoSans500',
    fontWeight: 500,
    fontSize: '3vmin',
    lineHeight: '3.4vmin',
    flexBasis: 'unset',
    flexGrow: 0,
    padding: 0
  },

  nextButton: {
    height: '8.75vmin',
    width: '31.75vmin',
    fontFamily: 'MuseoSans700',
    fontSize: '3.625vmin',
    fontWeight: 700,
    margin: '3.33vh',
    padding: 0
  }
});

export default GameScoreCard;
