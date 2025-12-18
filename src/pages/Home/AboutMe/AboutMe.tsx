import React from 'react';
import aboutMeProfileSrc from '@/assets/png/about-me-profile.png';
import clsx from 'clsx';
import styles from './AboutMe.module.scss';
import { FadeWrapper } from '@/components/FadeWrapper';
import { Variants, motion } from 'framer-motion';

const aboutMeVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

const aboutMeInfoVariants: Variants = {
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
    x: -50,
  },
};

const aboutMeProfileVariants: Variants = {
  inView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 10,
      stiffness: 100,
      delayChildren: 0.2,
    },
  },
  outOfView: {
    opacity: 0,
    scale: 0.9,
  },
};

export const AboutMe: React.FC = () => {
  return (
    <motion.div
      className={clsx(styles.aboutMe, 'container')}
      id='about'
      variants={aboutMeVariants}
      whileInView='inView'
      initial='outOfView'
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div className={styles.info} variants={aboutMeInfoVariants}>
        <h2 className={styles.title}>
          Turning Ideas Into Interactive Experiences
        </h2>
        <p className={styles.description}>
          I&apos;m Dimas, a graduate of{' '}
          <span style={{ color: '#F3BF03' }}>WebProgrammingHack</span> coding
          bootcamp and a web developer experienced in creating impactful
          solutions for organizations and businesses. My work includes leading
          creative projects and{' '}
          <span style={{ color: '#F3BF03' }}>
            delivering modern web interfaces
          </span>{' '}
          from concept to production.
        </p>
      </motion.div>
      <FadeWrapper
        direction='vertical'
        type='end'
        className={styles.profileWrapper}
      >
        <motion.div
          className={styles.profile}
          variants={aboutMeProfileVariants}
        >
          <motion.img
            src={aboutMeProfileSrc}
            alt='about me profile'
            className={styles.profileImage}
            variants={aboutMeProfileVariants}
          />
        </motion.div>
      </FadeWrapper>
    </motion.div>
  );
};
