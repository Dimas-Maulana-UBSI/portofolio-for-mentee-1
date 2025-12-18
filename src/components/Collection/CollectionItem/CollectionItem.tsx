import React from 'react';
import { motion, Variants } from 'framer-motion';

const collectionVariants: Variants = {
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

type CollectionItemProps = {
  children: React.ReactNode;
};

export const CollectionItem: React.FC<CollectionItemProps> = ({ children }) => {
  return <motion.div variants={collectionVariants}>{children}</motion.div>;
};
