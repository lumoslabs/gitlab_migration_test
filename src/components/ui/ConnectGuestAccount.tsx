import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Container, Row, Col } from 'react-bootstrap'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'
import Button from '@components/ui/Button'

export interface IConnectAccountProps {
  handleCancel(e: React.MouseEvent<any>): any;
}

const ConnectGuestAccount = ({ handleCancel }: IConnectAccountProps): JSX.Element => {
  const text = 'We are unable to verify your account. If you would like to save your scores and progress, please update your Google Voice Match settings in the Google Home app. Then exit and restart Lumosity.'
  const buttonText = 'Return to Main Menu'

  return (
    <Container className={css(commonStyles.flexColumnAlignCenter)}>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        <p className={css(styles.title)}>
          {text}
        </p>
      </Row>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        <Col className={css(commonStyles.flexColumnAllCenter, styles.buttonDiv)}>
          <Button
            onClick={handleCancel}
            text={buttonText}
            eventData={{ id: 'connect_guest_return_to_main_menu', message: buttonText }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default ConnectGuestAccount

const styles = StyleSheet.create({
  title: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '26px',
    fontWeight: 700,
    display: 'flex',
    paddingRight: '20vh',
    paddingLeft: '20vh',
    marginTop: '20vh',
    textAlign: 'left'
  },
  buttonDiv: {
    padding: '20px'
  }
})
