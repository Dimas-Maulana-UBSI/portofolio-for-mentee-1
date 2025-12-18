import React from 'react';
import clsx from 'clsx';
import { AchievementsKey } from './AchievementsKey';
import styles from './Achievements.module.scss';
import { motion, Variants } from 'framer-motion';
import { useMedia } from 'react-use';

const achievementsVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

type AchievementsProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Key: typeof AchievementsKey;
};

export const Achievements: React.FC<AchievementsProps> & SubComponents = ({
  children,
}) => {
  const isLargeIsh = useMedia('(min-width: 768px)');

  return (
    <motion.div
      className={clsx(styles.achievements, 'container')}
      variants={achievementsVariants}
      initial='outOfView'
      whileInView={'inView'}
      viewport={{ once: true, amount: !isLargeIsh ? 0.1 : 0.35 }}
    >
      {children}
    </motion.div>
  );
};

Achievements.Key = AchievementsKey;
