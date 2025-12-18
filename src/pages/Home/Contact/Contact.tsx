import React from 'react';
import { ContactForm } from '../ContactForm';
import styles from './Contact.module.scss';

export const Contact: React.FC = () => {
  return (
    <div className={styles.contact}>
      <ContactForm />
      <div className={styles.ellipseDecoration} />
    </div>
  );
};
