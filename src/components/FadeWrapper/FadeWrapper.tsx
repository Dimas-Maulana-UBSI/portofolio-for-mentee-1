import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import clsx from 'clsx';
import { colorToRGBA } from './utils/colorToRGBA';
import styles from './FadeWrapper.module.scss';

interface FadeWrapperProps {
  children: React.ReactNode;
  type: 'start' | 'end' | 'both' | 'none';
  direction?: 'horizontal' | 'vertical';
  fadeWidth?: number;
  fadeColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const fadeVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const FadeWrapper: React.FC<FadeWrapperProps> = ({
  children,
  direction = 'horizontal',
  type,
  fadeWidth = 100,
  fadeColor = '#000',
  className,
  style,
}) => {
  const fadeWidthRem = `${fadeWidth / 16}rem`;
  const transparentColor = colorToRGBA(fadeColor);

  const isStartVisible = type === 'start' || type === 'both';
  const isEndVisible = type === 'end' || type === 'both';

  const fadeStyle = {
    ...(direction === 'horizontal'
      ? { width: fadeWidthRem }
      : { height: fadeWidthRem }),
    '--fade-color': fadeColor,
    '--transparent-color': transparentColor,
  };

  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
      <AnimatePresence initial={false}>
        {direction === 'horizontal' && (
          <>
            <motion.div
              className={clsx(styles.fade, styles.startHorizontal)}
              initial='hidden'
              animate={isStartVisible ? 'visible' : 'hidden'}
              exit='hidden'
              variants={fadeVariants}
              style={fadeStyle}
            />
            <motion.div
              className={clsx(styles.fade, styles.endHorizontal)}
              initial='hidden'
              animate={isEndVisible ? 'visible' : 'hidden'}
              exit='hidden'
              variants={fadeVariants}
              style={fadeStyle}
            />
          </>
        )}

        {direction === 'vertical' && (
          <>
            <motion.div
              className={clsx(styles.fade, styles.startVertical)}
              initial='hidden'
              animate={isStartVisible ? 'visible' : 'hidden'}
              exit='hidden'
              variants={fadeVariants}
              style={fadeStyle}
            />
            <motion.div
              className={clsx(styles.fade, styles.endVertical)}
              initial='hidden'
              animate={isEndVisible ? 'visible' : 'hidden'}
              exit='hidden'
              variants={fadeVariants}
              style={fadeStyle}
            />
          </>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};
