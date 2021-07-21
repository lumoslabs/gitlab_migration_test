import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import base from '@styles/colors/base'
import commonStyles from '@styles/commonStyles'

const baseStyles = StyleSheet.create({
  loadingTitle: {
    color: base.lumosBlack,
    fontFamily: 'MuseoSans500',
    fontSize: '1.95vw',
    fontWeight: 500
  },
})

const customStyles = (titleDivHeight, loadingDivHeight) => StyleSheet.create({
  titleDiv: {
    height: titleDivHeight
  },
  loadingdiv: {
    height: loadingDivHeight
  },
})

export interface ILoadingComponent {
  title?: string;
  titleDivHeight?: string;
  loadingDivHeight?: string;
}

// TODO: remove titleDivHeight and loadingDivHeight if we don't use them
const LoadingComponent = ({ title, titleDivHeight = '20vh', loadingDivHeight  = '40vh' }: ILoadingComponent): JSX.Element => {
  const customizedStyles = customStyles(titleDivHeight, loadingDivHeight)

  return (
    <div className={css([commonStyles.flexColumnJustifyCenter, commonStyles.fullHeight])}>
      {title && (
        <div className={css([commonStyles.flexColumnAllCenter, customizedStyles.titleDiv])}>
          <p className={css(baseStyles.loadingTitle)}>
            {title}
          </p>
        </div>
      )}
      <div className={css([commonStyles.flexColumnAllCenter, customizedStyles.loadingdiv])}>
        <div className='loader' />
      </div>
    </div>
  )
}

export default LoadingComponent
