import React from 'react';
import Lottie from 'lottie-react';
import { css, StyleSheet } from 'aphrodite';
import lumositySpinner from 'public/assets/loader_spin_black.json';
import { base } from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';

const styles = (titleDivHeight, loadingDivHeight) => StyleSheet.create({
  loadingAnimdiv: {
    display: 'flex',
    flexDirection: 'column'
  },

  titleDiv: {
    height: titleDivHeight
  },
  loadingTitle: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '1.95vw',
    fontWeight: 500
  },

  loadingdiv: {
    height: loadingDivHeight
  },
});

export interface ILoadingComponent {
  title?: string;
  titleDivHeight?: string;
  loadingDivHeight?: string;
}

const LoadingComponent = ({ title, titleDivHeight = '20vh', loadingDivHeight  = '40vh' }: ILoadingComponent): JSX.Element => {
  return (
    <div className={css([commonStyles.flexColumnAllCenter, styles.loadingAnimdiv])}>
      {title &&
        <div className={css([commonStyles.flexColumnAllCenter, styles({titleDivHeight}).titleDiv])}
        >
          <p className={css(styles.loadingTitle)}>
            {title}
          </p>
        </div>
      }
      <div className={css([commonStyles.flexColumnAllCenter, styles({loadingDivHeight}).loadingdiv]) }
      >
        <Lottie animationData={lumositySpinner} />
      </div>
    </div>
  );
};

export default LoadingComponent;
