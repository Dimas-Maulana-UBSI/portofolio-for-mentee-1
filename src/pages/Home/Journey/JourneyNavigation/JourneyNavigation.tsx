import React from 'react';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import styles from './JourneyNavigation.module.scss';
import { useNavigation } from '../hooks/useNavigation';
import { useCardsInView } from '../hooks/useCardsInView';
import { useCalculationValue } from '../hooks/useCalculationValue';

const navigationVariants: Variants = {
  inView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
    scale: 1.4,
  },
};

const buttonVariants: Variants = {
  start: (disabled: boolean) => ({
    borderColor: disabled ? '#424242' : '#f4c81e',
  }),
};

const arrowPathVariants: Variants = {
  start: (disabled: boolean) => ({
    stroke: disabled ? '#424242' : '#f4c81e',
  }),
};

export const JourneyNavigation: React.FC = () => {
  const { goToPrev, goToNext } = useNavigation();
  const { isFirstCardVisible, isLastCardVisible } = useCardsInView();

  const { isDesktop } = useCalculationValue();

  if (!isDesktop) return null;

  return (
    <motion.div
      className={styles.journeyNavigation}
      variants={navigationVariants}
      initial='outOfView'
      whileInView='inView'
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className={clsx(styles.button, styles.leftButton)}
        onClick={goToPrev}
        variants={buttonVariants}
        custom={isFirstCardVisible}
        initial='start'
        animate='start'
      >
        <svg
          width='18'
          height='16'
          viewBox='0 0 18 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            d='M17.2502 8H0.750244'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={isFirstCardVisible}
          />
          <motion.path
            d='M7.50024 1.25L0.750244 8L7.50024 14.75'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={isFirstCardVisible}
          />
        </svg>
      </motion.div>

      <motion.div
        className={clsx(styles.button, styles.rightButton)}
        onClick={goToNext}
        variants={buttonVariants}
        custom={isLastCardVisible}
        initial='start'
        animate='start'
      >
        <svg
          width='18'
          height='16'
          viewBox='0 0 18 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            d='M0.749756 8H17.2498'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={isLastCardVisible}
          />
          <motion.path
            d='M10.4998 1.25L17.2498 8L10.4998 14.75'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={isLastCardVisible}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};
