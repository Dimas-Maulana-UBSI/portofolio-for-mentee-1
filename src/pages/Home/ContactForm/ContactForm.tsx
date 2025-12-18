import React, { useState } from 'react';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { AppForm, AppFormProps } from '@/components/AppForm';
import { Button } from '@/components/Button';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import styles from './ContactForm.module.scss';

const contactFormVariants: Variants = {
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

const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const schema = z.object({
  name: z.string().refine((val) => val.trim() !== '', {
    message: 'Name cannot be empty',
  }),
  email: z.string().superRefine((val, ctx) => {
    if (val.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email cannot be empty',
      });
    } else {
      try {
        z.string().email().parse(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'email',
          message: 'Invalid email address',
        });
      }
    }
  }),
  message: z.string().refine((val) => val.trim() !== '', {
    message: 'Message cannot be empty',
  }),
});

const EMAILJS_SERVICE_ID = 'service_dimas';
const EMAILJS_TEMPLATE_ID = 'template_6l0dofm';
const EMAILJS_PUBLIC_KEY = 'UUVvpn-NnK41c2vcN';

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [variant, setVariant] = useState<'success' | 'error'>('success');

  const handleOnSubmit: AppFormProps<typeof schema>['onSubmit'] = async (
    data
  ) => {
    try {
      setLoading(true);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setVariant('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setVariant('error');
    } finally {
      setShowDialog(true);
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className={styles.contactForm}
        variants={contactFormVariants}
        initial='outOfView'
        whileInView='inView'
        viewport={{ once: true, amount: 0.35 }}
      >
        <AppForm
          schema={schema}
          onSubmit={handleOnSubmit}
          options={{ clearOnSubmit: variant === 'success' }}
        >
          <AppForm.Input
            name='name'
            label='Name'
            placeholder='Enter your name'
          />
          <AppForm.Input
            name='email'
            label='Email'
            placeholder='Enter your email'
          />
          <AppForm.TextArea
            name='message'
            label='Message'
            placeholder='Enter your message'
          />
          <Button className={styles.submitButton} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </AppForm>
      </motion.div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            className={styles.dialogOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              className={styles.dialog}
              variants={dialogVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.dialogContent}>
                {variant === 'success' ? (
                  <>
                    <h3 className={styles.dialogTitle}>Message Sent!</h3>
                    <p className={styles.dialogText}>
                      Thank you for reaching out. I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className={styles.dialogTitle}>Something went wrong</h3>
                    <p className={styles.dialogText}>
                      Failed to send your message. Please try again later.
                    </p>
                  </>
                )}
                <Button
                  className={styles.dialogButton}
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
