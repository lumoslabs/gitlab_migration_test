import React from 'react';
import { css } from 'aphrodite';
import commonStyles from '@styles/commonStyles';

export interface ISkipComponent {
  message?: string;
  onClick?(e: React.MouseEvent<any>): any;
}

const SkipComponent = ({ message = 'Skip', onClick = () => void (0) }: ISkipComponent): JSX.Element => {
  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexRowAllCenter])}>
      <a onClick={onClick}>
        {message}
      </a>
    </div>
  );
};

export default SkipComponent;
