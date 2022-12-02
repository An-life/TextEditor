import React from 'react';

import styles from './styles.module.scss';

type Props = {
  onClick?: () => void;
  children: React.ReactElement;
};

const IconButton = ({ onClick, children }: Props): React.ReactElement => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
