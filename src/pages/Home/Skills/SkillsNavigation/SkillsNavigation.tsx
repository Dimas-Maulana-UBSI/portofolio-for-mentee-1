import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './SkillsNavigation.module.scss';
import clsx from 'clsx';

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

type SkillsNavigationProps = {
  onLeftClick: () => void;
  onRightClick: () => void;
  leftButtonDisabled: boolean;
  rightButtonDisabled: boolean;
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

export const SkillsNavigation: React.FC<SkillsNavigationProps> = ({
  onLeftClick,
  onRightClick,
  leftButtonDisabled,
  rightButtonDisabled,
}) => {
  return (
    <motion.div
      className={styles.skillsNavigation}
      variants={navigationVariants}
      initial='outOfView'
      whileInView='inView'
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className={clsx(styles.button, styles.leftButton)}
        onClick={onLeftClick}
        variants={buttonVariants}
        custom={leftButtonDisabled}
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
            custom={leftButtonDisabled}
          />
          <motion.path
            d='M7.50024 1.25L0.750244 8L7.50024 14.75'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={leftButtonDisabled}
          />
        </svg>
      </motion.div>

      <motion.div
        className={clsx(styles.button, styles.rightButton)}
        onClick={onRightClick}
        variants={buttonVariants}
        custom={rightButtonDisabled}
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
            custom={rightButtonDisabled}
          />
          <motion.path
            d='M10.4998 1.25L17.2498 8L10.4998 14.75'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={arrowPathVariants}
            custom={rightButtonDisabled}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};
