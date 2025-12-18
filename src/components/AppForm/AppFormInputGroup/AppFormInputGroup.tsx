import React from 'react';
import styles from './AppFormInputGroup.module.scss';

type AppFormInputGroupProps = {
  children: React.ReactNode;
  errorMessage?: string;
};

export const AppFormInputGroup: React.FC<AppFormInputGroupProps> = ({
  children,
  errorMessage,
}) => {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.content}>{children}</div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
