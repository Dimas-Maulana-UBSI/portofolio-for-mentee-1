import React from 'react';
import styles from './ProjectsItem.module.scss';
import RightArrowIcon from '@/assets/svg/icon-right-arrow.svg';

type ProjectsItemProps = {
  imageSrc: string;
  title: string;
  description: string;
  labels: string[];
  url: string;
};

export const ProjectsItem: React.FC<ProjectsItemProps> = ({
  imageSrc,
  title,
  description,
  labels,
  url,
}) => {
  return (
    <div className={styles.project}>
      <div className={styles.projectImageContainer}>
        <img src={imageSrc} alt={title} className={styles.projectImage} />
        <ul className={styles.projectLabels}>
          {labels.map((label, index) => (
            <li key={index} className={styles.projectLabel}>
              {label}
            </li>
          ))}
        </ul>
      </div>
      <h3 className={styles.projectTitle}>{title}</h3>
      <p className={styles.projectDescription}>{description}</p>
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className={styles.projectLink}
      >
        <p>View live demo</p>
        <RightArrowIcon />
      </a>
    </div>
  );
};
