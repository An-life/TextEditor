import React from 'react';

import CloseIcon from '../../../assets/icons/CloseIcon';
import IconButton from '../IconButton';

import styles from './styles.module.scss';

type Props = {
  onClick?: () => void;
  children: React.ReactElement;
};

const Modal = ({ onClick, children }: Props): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <IconButton onClick={onClick}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
