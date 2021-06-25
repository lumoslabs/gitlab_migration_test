

import React from 'react';
import Lottie from 'lottie-react';
import { css, StyleSheet } from 'aphrodite';
import lumositySpinner from '../assets/loader_spin_black.json';
import { base } from '../styles/colors';
import commonStyles from '../styles/commonStyles';

const LoadingComponent = (props) => {
  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.loadingAnimdiv])}>
      {props.title &&
        <div className={css([commonStyles.flexColumnAllCenter, styles({
          titleDivHeight: props.titleDivHeight ? props.titleDivHeight : '20vh'
          }).titleDiv])}
        >
          <p className={css(styles.loadingTitle)}>
            {props.title}
          </p>
        </div>
      }
      <div className={css([commonStyles.flexColumnAllCenter, styles({
        loadingDivHeight: props.loadingDivHeight ? props.loadingDivHeight : '40vh'
        }).loadingdiv]) }
      >
        <Lottie animationData={lumositySpinner} />
      </div>
    </div>
  );
};

const styles = (props) => StyleSheet.create({
  loadingAnimdiv: {
    display: 'flex',
    flexDirection: 'column'
  },

  titleDiv: {
    height: props.titleDivHeight
  },
  loadingTitle: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '1.95vw',
    fontWeight: 500
  },

  loadingdiv: {
    height: props.loadingDivHeight
  },
});

export default LoadingComponent;
