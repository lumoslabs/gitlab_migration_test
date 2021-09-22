import React from 'react'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import { css, StyleSheet } from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { base } from '@styles/colors'

export interface IUserInfoProps {
  show: boolean;
  name?: string;
  email?: string;
  profilePicUrl?: string;
  timezone?: string;
  handleClose(e: React.MouseEvent<any>): any;
}

const UserInfo = ({ show, handleClose, profilePicUrl, email, name, timezone }: IUserInfoProps): JSX.Element => {

  return (
    <Modal className={css(styles.modal)}
      show={show}
      onHide={handleClose}
    >
      <Modal.Body>
        <div className={css([commonStyles.flexColumnAlignCenter, styles.avatarDiv])}>
          <img
            src={profilePicUrl || '/assets/guest_avatar.svg'}
            className={css(styles.avatarImg)}
            alt='Avatar'
          />
        </div>
        <Container className={css(styles.container)} >
          <Row>
            <Col xs={6}>
              <p className={css(styles.labelsText)}>
                {'Email'}
              </p>
            </Col>
            <Col xs={6}>
              <p className={css(styles.valueText, styles.email)}>
                {email || ''}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p className={css(styles.labelsText)}>
                {'Name'}
              </p>
            </Col>
            <Col xs={6}>
              <p className={css(styles.valueText)}>
                {name}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p className={css(styles.labelsText)}>
                {'Time Zone'}
              </p>
            </Col>
            <Col xs={6}>
              <p className={css(styles.valueText)}>
                {timezone}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p className={css(styles.labelsText)}>
                {'Language'}
              </p>
            </Col>
            <Col xs={6}>
              <p className={css(styles.valueText)}>
                {'English'}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={css(styles.valueText, styles.unlinkText)}>
                {'To unlink your Lumosity account from Google, visit myaccount.google.com/permissions.'}
                <br/><br/>
                {'To delete your Lumosity account, visit Lumosity.com.'}
              </p>
              </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    background: base.lumosWhite,
    borderRadius: '4.66vh',
    height: '96vh',
    width: '70vw',
    top: '2vh',
    left: '15vw',
    boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.11),
      0px 2px 4px 0px rgba(0, 0, 0, 0.13),
      0px 2px 6px 0px rgba(0, 0, 0, 0.1)`
  },
  title: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans700',
    fontSize: '4vh',
    fontWeight: 700,
    display: 'flex',
    margin: '0px',
    padding: '0px',
    marginLeft: '3.12vw'
  },
  avatarDiv: {
    marginBottom: '20px'
  },
  avatarImg: {
    width: '15vh',
    height: '15vh',
    borderRadius: '50%'
  },
  container: {
    margin: '0 auto'
  },
  labelsText: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans700',
    fontSize: '26px',
    fontWeight: 700,
    textAlign: 'right',
    marginRight: '2vw'
  },
  valueText: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '26px',
    fontWeight: 500,
    textAlign: 'left',
    flex: 1
  },
  email: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  unlinkText: {
    textAlign: 'center'
  },
})

export default UserInfo
