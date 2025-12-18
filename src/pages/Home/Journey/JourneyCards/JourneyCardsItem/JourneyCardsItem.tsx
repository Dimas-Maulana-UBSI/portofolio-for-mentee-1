import React, { useEffect, useRef } from 'react';
import { getFontSize } from '@/utils/style/getFontSize';
import { motion, Variants } from 'framer-motion';
import moment from 'moment';
import { useCalculationValue } from '../../hooks/useCalculationValue';
import clsx from 'clsx';
import styles from './JourneyCardsItem.module.scss';

const cardVariants: Variants = {
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

export type JourneyCardsItemProps = {
  Logo: React.FC<React.SVGProps<SVGElement>>;
  dateFrom: Date;
  dateTo: Date;
  title: string;
  subtitle: string;
  description: string;
  index?: number;
};

export const JourneyCardsItem: React.FC<JourneyCardsItemProps> = ({
  Logo,
  dateFrom,
  dateTo,
  title,
  subtitle,
  description,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setOffsetMovement, setCardWidth, setCardHeight, isDesktop } =
    useCalculationValue();

  useEffect(() => {
    if (index !== 0) return; // Only calculate offset movement based on the first card to improve performance

    const card = cardRef.current;

    if (!card) return;

    const updateOffsetMovementAndCardWidth = () => {
      const cardWidth = card.getBoundingClientRect().width;
      const cardHeight = card.getBoundingClientRect().height;
      const gap = getFontSize(24);

      setOffsetMovement(gap + cardWidth);
      setCardWidth(cardWidth);
      setCardHeight(cardHeight);
    };

    updateOffsetMovementAndCardWidth();

    const resizeObserver = new ResizeObserver(updateOffsetMovementAndCardWidth);

    resizeObserver.observe(card);

    return () => resizeObserver.disconnect();
  }, [index, setCardHeight, setCardWidth, setOffsetMovement]);

  return (
    <motion.div
      className={clsx(styles.card, !isDesktop && styles.mobile)}
      ref={cardRef}
      data-date-to={dateTo}
      data-index={index}
      variants={cardVariants}
    >
      <div className={styles.cardHeader}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <p className={styles.date}>
          {moment(dateFrom).format('MMM YYYY')} -{' '}
          {moment(dateTo).format('MMM YYYY')}
        </p>
      </div>
      <div className={styles.cardDetails}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  );
};
