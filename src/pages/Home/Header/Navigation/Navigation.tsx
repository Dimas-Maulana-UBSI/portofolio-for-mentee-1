import React from 'react';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <a href='#home'>Home</a>
        </li>
        <li>
          <a href='#about'>About</a>
        </li>
        <li>
          <a href='#skills'>Skills</a>
        </li>
        <li>
          <a href='#projects'>Projects</a>
        </li>
        <li>
          <a href='#faq'>Faq</a>
        </li>
        <li>
          <a href='#contact'>Contact</a>
        </li>
      </ul>
    </nav>
  );
};
