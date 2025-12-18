import React, { useCallback, useState } from 'react';
import DownArrowIcon from '@/assets/svg/icon-down-arrow.svg';
import styles from './FAQItem.module.scss';
import { Variants, motion } from 'framer-motion';

type FAQItemProps = {
  title: string;
  description: string;
  index?: number;
};

const faqItemVariants: Variants = {
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

const detailVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
  },
};

const arrowVariants: Variants = {
  collapsed: {
    rotate: 0,
    transition: {
      duration: 0.2,
    },
  },
  expanded: {
    rotate: 180,
    transition: {
      duration: 0.2,
    },
  },
};

export const FAQItem: React.FC<FAQItemProps> = ({
  title,
  description,
  index,
}) => {
  const formattedIndex = index?.toString().padStart(2, '0');

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <motion.div variants={faqItemVariants}>
      <motion.div
        className={styles.faq}
        initial='collapsed'
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        <div className={styles.faqHeader} onClick={handleExpandClick}>
          <span className={styles.faqIndex}>{formattedIndex}</span>
          <p className={styles.faqTitle}>{title}</p>
          <motion.div className={styles.faqIcon} variants={arrowVariants}>
            <DownArrowIcon />
          </motion.div>
        </div>

        <motion.div className={styles.faqDetail} variants={detailVariants}>
          <p className={styles.faqDescription}>{description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
