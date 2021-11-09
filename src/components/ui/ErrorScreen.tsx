import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'
import { Container, Row } from 'react-bootstrap'
import Button from '@components/ui/Button'

const ErrorScreen = ({ text, buttonText = 'Continue', onClick }: { text?: string | boolean, buttonText?: string, onClick?: () => any }): JSX.Element => {
  return (
    <Container className={css(commonStyles.flexColumnAlignCenter)}>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        <p className={css(styles.title)}>
          {(typeof text === 'string') ? text : 'Something went wrong'}
        </p>
      </Row>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        {onClick &&
          <Button
            onClick={onClick}
            text={buttonText}
            eventData={{ id: 'error_continue_button' }}
          />
        }
      </Row>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '26px',
    fontWeight: 500,
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

export default ErrorScreen
