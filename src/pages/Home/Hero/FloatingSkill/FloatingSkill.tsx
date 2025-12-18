import React from 'react';
import styles from './FloatingSkill.module.scss';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

const floatingSkillVariants: Variants = {
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

type FloatingSkillProps = {
  children: React.ReactNode;
  className?: string;
};

export const FloatingSkill: React.FC<FloatingSkillProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={clsx(styles.floatingSkill, className)}
      variants={floatingSkillVariants}
    >
      <div className={styles.innerWrapper}>{children}</div>
    </motion.div>
  );
};
