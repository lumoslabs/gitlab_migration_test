import React from 'react';
import { RoundedButton } from './buttons/';
import { css, StyleSheet } from 'aphrodite/no-important';
import { analyticsTrack } from '../segment/analytics';
import commonStyles from '../styles/commonStyles';

const ReloginComponent = (props) => {

  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.loggedOutdiv, ...props.extraMainDivStyles])}>
      <div className={css([commonStyles.flexJustifyCenter, commonStyles.titlediv])}>
        <p className={css(commonStyles.title)}>
          {props.sage}
        </p>
      </div>
      <div className={css(commonStyles.flexJustifyCenter)}>
        <RoundedButton
          styles={[commonStyles.cta, commonStyles.action]}
          value='Log In'
          onClick={e => {
            analyticsTrack('button_click', {
              id: props.id,
              current_page: props.currentPage,
              message: props.message,
            });
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
