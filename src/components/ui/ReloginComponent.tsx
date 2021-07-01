import React from 'react';
import { RoundedButton } from './buttons';
import { css, StyleSheet } from 'aphrodite/no-important';
// TODO
// import { analyticsTrack } from '../segment/analytics';
import commonStyles from '../../styles/commonStyles';

export interface IReloginComponentProps {
  message: string;
  id: string;
  currentPage: string;
  //TODO define?
  loginCallback: any;
}

const ReloginComponent = (props: IReloginComponentProps): JSX.Element => {

  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.loggedOutdiv])}>
      <div className={css([commonStyles.flexJustifyCenter, commonStyles.titlediv])}>
        <p>
          {props.message}
        </p>
      </div>
      <div className={css(commonStyles.flexJustifyCenter)}>
        <RoundedButton
          styles={[commonStyles.cta, commonStyles.action]}
          value='Log In'
          onClick={e => {
            // TODO
            // analyticsTrack('button_click', {
            //   id: props.id,
            //   current_page: props.currentPage,
            //   message: props.message,
            // });
            e.preventDefault();
            props.loginCallback();
          }}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  loggedOutdiv: {
    height: '805px'
  },
});

export default ReloginComponent;