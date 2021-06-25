
import React from 'react';
import { css } from 'aphrodite';
import { Link } from 'react-router-dom';
import commonStyles from '../styles/commonStyles';

const SkipComponent = (props) => {
  return (
    <div className={css([commonStyles.fullWidth, commonStyles.flexRowAllCenter])}>
      <Link
        to=''
        onClick= { e => props.onClick(e) }
      >
        { props.message || 'Skip' }
      </Link>
    </div>
  );
};

export default SkipComponent;
