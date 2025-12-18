import React from 'react';
import { getFontSize } from '@/utils/style/getFontSize';
import { motion, Variants } from 'framer-motion';
import clsx from 'clsx';
import styles from './Section.module.scss';

const sectionHeaderVariants: Variants = {
  inView: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  outOfView: {
    opacity: 0,
  },
};

type SectionProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  containerWidth?: number;
  id?: string;
  overflowHidden?: boolean;
};

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  containerWidth,
  id,
  overflowHidden,
}) => {
  const containerStyle = containerWidth
    ? { maxWidth: getFontSize(containerWidth) + 'px' }
    : undefined;

  return (
    <div
      className={clsx(
        styles.overflowWrapper,
        overflowHidden && styles.overflowHidden
      )}
      id={id}
    >
      <div className='container' style={containerStyle}>
        <section className={styles.section}>
          <motion.div
            className={styles.sectionHeader}
            variants={sectionHeaderVariants}
            whileInView='inView'
            initial='outOfView'
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </motion.div>
          <div className={styles.sectionBody}>{children}</div>
        </section>
      </div>
    </div>
  );
};
