import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './Navigation';
import MainLogo from '@/assets/svg/logo-main-new.svg';
import { Button } from '@/components/Button';
import HamburgerIcon from '@/assets/svg/icon-hamburger.svg';
import CrossIcon from '@/assets/svg/icon-cross.svg';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className='container' id='home'>
      <header className={styles.header}>
        <MainLogo className={styles.logo} />
        <Navigation />
        <Button className={styles.ctaButton} as='a' href='#contact'>
          Hire Me
        </Button>
        <HamburgerIcon
          className={styles.hamburgerIcon}
          onClick={toggleMenu}
          style={{ cursor: 'pointer' }}
        />
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.mobileMenuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className={styles.mobileMenuHeader}>
                <CrossIcon
                  className={styles.closeIcon}
                  onClick={closeMenu}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <nav className={styles.mobileMenuNav}>
                <ul>
                  <li>
                    <a href='#home' onClick={closeMenu}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href='#about' onClick={closeMenu}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href='#skills' onClick={closeMenu}>
                      Skills
                    </a>
                  </li>
                  <li>
                    <a href='#projects' onClick={closeMenu}>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href='#faq' onClick={closeMenu}>
                      Faq
                    </a>
                  </li>
                  <li>
                    <a href='#contact' onClick={closeMenu}>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <Button
                className={styles.mobileMenuCta}
                as='a'
                href='#contact'
                onClick={closeMenu}
              >
                Hire Me
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
