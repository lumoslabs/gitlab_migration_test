import React from 'react'
import { css } from 'aphrodite'
import commonStyles from '@styles/commonStyles'

const LoadingComponent = (): JSX.Element => {
  return (
    <div className={css([commonStyles.flexColumnJustifyCenter, commonStyles.fullHeight])}>
      <div className='loader' />
    </div>
  )
}

export default LoadingComponent
