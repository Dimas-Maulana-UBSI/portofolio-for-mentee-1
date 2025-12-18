import React from 'react';
import styles from './Comparison.module.scss';
import { ComparisonCard } from './ComparisonCard';
import { comparisonCardsData } from '@/constants/comparison';
import { motion, Variants } from 'framer-motion';
import { useMedia } from 'react-use';

const comparisonVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

export const Comparison: React.FC = () => {
  const isLargeIsh = useMedia('(min-width: 768px)');

  return (
    <motion.div
      className={styles.comparison}
      variants={comparisonVariants}
      whileInView='inView'
      initial='outOfView'
      viewport={{ once: true, amount: !isLargeIsh ? 0.1 : 0.35 }}
    >
      {comparisonCardsData.map((cardData) => (
        <ComparisonCard key={cardData.title} {...cardData} />
      ))}
    </motion.div>
  );
};
