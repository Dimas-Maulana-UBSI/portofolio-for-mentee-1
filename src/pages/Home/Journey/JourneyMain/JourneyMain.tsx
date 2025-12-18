import React from 'react';

import { useCalculationValue } from '../hooks/useCalculationValue';
import clsx from 'clsx';
import styles from './JourneyMain.module.scss';

type JourneyMainProps = {
  children: React.ReactNode;
};

export const JourneyMain: React.FC<JourneyMainProps> = ({ children }) => {
  const { isDesktop } = useCalculationValue();

  return (
    <div className={clsx(styles.journeyMain, !isDesktop && styles.mobile)}>
      {children}
    </div>
  );
};
