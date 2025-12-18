import React from 'react';
import MainLogo from '@/assets/svg/logo-main-new.svg';
import styles from './Footer.module.scss';
import FacebookLogo from '@/assets/svg/logo-facebook.svg';
import TwitterLogo from '@/assets/svg/logo-twitter.svg';
import InstagramLogo from '@/assets/svg/logo-instagram.svg';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <MainLogo className={styles.logo} />
        <div className={styles.description}>
          Front-End Developer with a passion for clean code and intuitive
          design. Turning ideas into functional beauty
        </div>
        <div className={styles.socialMedia}>
          <FacebookLogo className={styles.socialMediaLogo} />
          <TwitterLogo className={styles.socialMediaLogo} />
          <InstagramLogo className={styles.socialMediaLogo} />
        </div>
      </div>
      <div className={styles.copyright}>
        <p className={styles.copyrightText}>© 2025 Dimas Maulana.</p>
      </div>
    </div>
  );
};
