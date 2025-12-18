import React from 'react';
import styles from './TestimonialsItem.module.scss';

type TestimonialsItemProps = {
  profileSrc: string;
  title: string;
  subtitle: string;
  description: string;
};

export const TestimonialsItem: React.FC<TestimonialsItemProps> = ({
  profileSrc,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className={styles.testimonial}>
      <div className={styles.header}>
        <img src={profileSrc} alt='Profile' className={styles.profileImage} />
        <div className={styles.details}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.content}>{description}</div>
    </div>
  );
};
