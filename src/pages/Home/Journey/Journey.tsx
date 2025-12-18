import React from 'react';
import { motion } from 'framer-motion';
import { JourneyTimeline } from './JourneyTimeline';
import { JourneyNavigation } from './JourneyNavigation';
import { JourneyCards } from './JourneyCards';
import { JourneyProvider } from './context/JourneyContext';
import styles from './Journey.module.scss';
import { JourneyMain } from './JourneyMain';

type JourneyProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Timeline: typeof JourneyTimeline;
  Cards: typeof JourneyCards;
  Card: typeof JourneyCards.Item;
  Navigation: typeof JourneyNavigation;
  Main: typeof JourneyMain;
};

export const Journey: React.FC<JourneyProps> & SubComponents = ({
  children,
}) => {
  return (
    <JourneyProvider>
      <motion.div className={styles.journey}>{children}</motion.div>
    </JourneyProvider>
  );
};

Journey.Timeline = JourneyTimeline;
Journey.Cards = JourneyCards;
Journey.Card = JourneyCards.Item;
Journey.Navigation = JourneyNavigation;
Journey.Main = JourneyMain;
