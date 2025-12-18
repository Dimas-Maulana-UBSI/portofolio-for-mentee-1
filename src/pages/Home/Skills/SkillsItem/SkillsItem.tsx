import React from 'react';
import styles from './SkillsItem.module.scss';
import { motion, Variants } from 'framer-motion';

const skillItemVariants: Variants = {
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

type SkillsItemProps = {
  title: string;
  description: string;
  proficiency: number;
};

export const SkillsItem: React.FC<SkillsItemProps> = ({
  title,
  description,
  proficiency,
}) => {
  const barContentVariants: Variants = {
    inView: {
      scaleX: proficiency / 100,
    },
    outOfView: {
      scaleX: 0,
    },
  };

  return (
    <motion.div className={styles.skillItem} variants={skillItemVariants}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.proficiency}>
        <motion.div className={styles.bar}>
          <motion.div
            className={styles.barContent}
            style={{ originX: 0 }}
            variants={barContentVariants}
            transition={{
              duration: 1,
              type: 'spring',
              damping: 20,
              stiffness: 100,
            }}
          />
        </motion.div>
        <span className={styles.percentage}>{proficiency}%</span>
      </div>
    </motion.div>
  );
};
