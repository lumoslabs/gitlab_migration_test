import React from 'react'
import { Modal, Row} from 'react-bootstrap'
import { css, StyleSheet} from 'aphrodite/no-important'
import commonStyles from '@styles/commonStyles'
import { base} from '@styles/colors'
import WideActionButton from '@components/ui/WideActionButton'

export interface IUserInfoProps {
  show: boolean;
  name?: string;
  email?: string;
  profilePicUrl?: string;
  timezone?: string;
  handleClose(e: React.MouseEvent<any>): any;
  logoutCallback(e: React.MouseEvent<any>): any;
}

const UserInfo = (props: IUserInfoProps): JSX.Element => {
  const { show, handleClose, profilePicUrl, email, name, timezone, logoutCallback } = props

  return (
    <Modal className={css(styles.modal)}
      show={show}
      onHide={handleClose}
    >
      <Modal.Body>
        <p className={css(styles.title)}>
          {'Your Profile'}
        </p>
        <div className={css([commonStyles.flexColumnAlignCenter, styles.avatarDiv])}>
          <img
            src={profilePicUrl || '/assets/guest_avatar.svg'}
            className={css(styles.avatarImg)}
            alt='Avatar'
          />
        </div>
        <div className={css([commonStyles.flexColumnAlignCenter, styles.detailsDiv])}>
          <Row className={css(styles.rowDiv)}>
            <p className={css(styles.labelsText)}>
              {'Email'}
            </p>
            <p className={css(styles.valueText)}>
              {email || ''}
            </p>
          </Row>
          <Row className={css(styles.rowDiv)}>
            <p className={css(styles.labelsText)}>
              {'Name'}
            </p>
            <p className={css(styles.valueText)}>
              {name}
            </p>
          </Row>
          <Row className={css(styles.rowDiv)}>
            <p className={css(styles.labelsText)}>
              {'Time Zone'}
            </p>
            <p className={css(styles.valueText)}>
              {timezone || 'Pacific Time USA & Canada'}
            </p>
          </Row>
          <Row className={css(styles.rowDiv)}>
            <p className={css(styles.labelsText)}>
              {'Language'}
            </p>
            <p className={css(styles.valueText)}>
              {'English'}
            </p>
          </Row>
        </div>
        <WideActionButton
          extendStyles={styles.cta}
          buttonText='Logout'
          onClick={logoutCallback}
          id='logout'
          currentPage='account_info_modal'
        />
      </Modal.Body>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    background: base.lumosWhite,
    borderRadius: '4.66vh',
    height: '78vh',
    width: '57.81vw',
    top: '18vh',
    left: '21.1vw',
    boxShadow: `0px 1px 1px 0px rgba(0, 0, 0, 0.11),
      0px 2px 4px 0px rgba(0, 0, 0, 0.13),
      0px 2px 6px 0px rgba(0, 0, 0, 0.1)`
},

  contentDiv: {
    width: '100%',
    height: '100%'
},

  title: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans700',
    fontSize: '4vh',
    fontWeight: 700,
    display: 'flex',
    margin: '0px',
    padding: '0px',
    marginLeft: '3.12vw',
    marginTop: '5.33vh'
},

  avatarDiv: {
    marginTop: '3vh',
    marginBottom: '3vh',
    width: '100%',
    height: '15vh'
},

  avatarImg: {
    width: '15vh',
    height: '15vh',
    borderRadius: '50%'
},

  detailsDiv: {
    marginTop: '3vh',
    width: '100%',
    height: 'fit-content'
},

  rowDiv: {
    width: '100%'
},

  labelsText: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans700',
    fontSize: '3.33vh',
    fontWeight: 700,
    textAlign: 'right',
    flex: 1,
    marginLeft: '8.75vw'
},

  valueText: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '3.33vh',
    fontWeight: 500,
    textAlign: 'left',
    marginLeft: '2.34vw',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: '8.75vw'
},

  cta: {
    height: '9vh',
    width: '15vw',
    borderRadius: '36px'
}
});

export default UserInfo;
