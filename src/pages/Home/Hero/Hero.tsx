import React from 'react';
import heroProfileSrc from '@/assets/png/hero-profile.png';
import { FloatingSkill } from './FloatingSkill';
import clsx from 'clsx';
import styles from './Hero.module.scss';
import { motion, Variants } from 'framer-motion';

const staggeringVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

const heroTextVariants: Variants = {
  inView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
  outOfView: {
    opacity: 0,
    scale: 0.9,
  },
};

const heroProfileImageVariants: Variants = {
  inView: {
    opacity: 1,
    x: '-50%',
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
    x: '-50%',
    y: 100,
  },
};

export const Hero: React.FC = () => {
  return (
    <div className={styles.overflowWrapper}>
      <div className={clsx(styles.hero, 'container')}>
        <motion.div
          variants={staggeringVariants}
          initial='outOfView'
          animate='inView'
        >
          <motion.h1 className={styles.title} variants={heroTextVariants}>
            Dimas Maulana
          </motion.h1>
          <motion.p className={styles.subtitle} variants={heroTextVariants}>
            Front-End Developer with a passion for clean code and intuitive
            design. Turning ideas into functional beauty.
          </motion.p>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.img
            src={heroProfileSrc}
            alt='hero profile'
            className={styles.heroProfile}
            variants={heroProfileImageVariants}
            initial='outOfView'
            animate='inView'
          />
          <motion.div
            variants={staggeringVariants}
            initial='outOfView'
            animate='inView'
          >
            <FloatingSkill className={clsx(styles.skill, styles.ts)}>
              TypeScript
            </FloatingSkill>
            <FloatingSkill className={clsx(styles.skill, styles.js)}>
              JavaScript
            </FloatingSkill>
            <FloatingSkill className={clsx(styles.skill, styles.react)}>
              React
            </FloatingSkill>
            <FloatingSkill className={clsx(styles.skill, styles.motion)}>
              Motion
            </FloatingSkill>
          </motion.div>
          <div className={styles.ellipseDecoration} />
        </div>
      </div>
    </div>
  );
};
