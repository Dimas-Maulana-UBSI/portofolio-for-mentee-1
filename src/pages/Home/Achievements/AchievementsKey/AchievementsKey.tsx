import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './AchievementsKey.module.scss';

const achievementKeyVariants: Variants = {
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
    x: -30,
  },
};

type AchievementKeyProps = {
  metric: string;
  detail: string;
};

export const AchievementsKey: React.FC<AchievementKeyProps> = ({
  metric,
  detail,
}) => {
  return (
    <motion.div
      className={styles.achievementKey}
      variants={achievementKeyVariants}
    >
      <span className={styles.keyMetric}>{metric}</span>
      <p className={styles.keyDetail}>{detail}</p>
    </motion.div>
  );
};
