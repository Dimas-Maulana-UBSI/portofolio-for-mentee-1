import clsx from 'clsx';
import CheckIcon from '@/assets/svg/icon-check.svg';
import CrossIcon from '@/assets/svg/icon-cross.svg';
import EmptyProfile from '@/assets/svg/empty-profile.svg';
import { motion, Variants } from 'framer-motion';
import styles from './ComparisonCard.module.scss';

const comparisonCardVariants: Variants = {
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

type ComparisonCardType = 'primary' | 'secondary';

type ComparisonCardProps<T extends ComparisonCardType> = {
  type: T;
  profileSrc?: T extends Extract<ComparisonCardType, 'primary'>
    ? string
    : never;
  title: string;
  list: string[];
};

export const ComparisonCard = <T extends ComparisonCardType>({
  type,
  profileSrc,
  title,
  list,
}: ComparisonCardProps<T>) => {
  return (
    <motion.div
      className={clsx(
        styles.comparisonCard,
        type === 'primary' ? styles.primary : styles.secondary
      )}
      variants={comparisonCardVariants}
    >
      <div className={styles.cardHeader}>
        {profileSrc ? (
          <img
            src={profileSrc}
            alt='mini profile'
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.emptyProfileContainer}>
            <EmptyProfile />
          </div>
        )}
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.cardList}>
        {list.map((item, index) => (
          <div key={index} className={styles.cardListItem}>
            {type === 'primary' ? (
              <CheckIcon className={styles.listIcon} />
            ) : (
              <CrossIcon className={styles.listIcon} />
            )}
            <p className={styles.listText}>{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
