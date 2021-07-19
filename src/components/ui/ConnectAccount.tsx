import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Container, Row, Col } from 'react-bootstrap'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'
import Button from '@components/ui/Button'

export interface IConnectAccountProps {
  handleCancel(e: React.MouseEvent<any>): any;
  handleConnect(e: React.MouseEvent<any>): any;
}

const ConnectAccount = (props: IConnectAccountProps): JSX.Element => {
  const { handleCancel, handleConnect } = props

  return (
    <Container className={css(commonStyles.flexColumnAlignCenter)}>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        <p className={css(styles.title)}>
          By clicking Connect, Google Assistant will collect your Lumosity audio commands,
          and their Terms and Privacy Policy will also apply along with Lumosity’s.
          <br />
          <br />
          {"To remove Google Assistant’s access, please visit Lumosity's Help Center."}
        </p>
      </Row>
      <Row className={css(commonStyles.flexRowAllCenter)}>
        <Col className={css(commonStyles.flexColumnAllCenter, styles.buttonDiv)}>
          <Button onClick={handleCancel} text='Cancel' />
        </Col>
        <Col className={css(commonStyles.flexColumnAllCenter, styles.buttonDiv)}>
          <Button onClick={handleConnect} text='Connect' />
        </Col>
      </Row>
    </Container>
  )
}

export default ConnectAccount

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
    textAlign: 'center'
  },
  buttonDiv: {
    padding: '20px'
  }
})
