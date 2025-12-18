import React, { useCallback, useEffect, useState } from 'react';
import styles from './JourneyTimeline.module.scss';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  Variants,
} from 'framer-motion';
import { useCalculationValue } from '../hooks/useCalculationValue';
import { getFontSize } from '@/utils/style/getFontSize';
import { useCardsInView } from '../hooks/useCardsInView';
import { useJourneyContext } from '../hooks/useJourneyContext';

const timelineVariants: Variants = {
  inView: (type: 'mobile' | 'desktop') => ({
    opacity: 1,
    ...(type === 'mobile' ? { scaleY: 1 } : { y: 0 }),
    transition: {
      duration: 0.5,
    },
  }),
  outOfView: (type: 'mobile' | 'desktop') => ({
    opacity: 0,
    ...(type === 'mobile' ? { scaleY: 0 } : { y: -80 }),
  }),
};

export const JourneyTimeline: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [offsetIndex, setOffsetIndex] = useState(0);

  const {
    timelineWidth,
    milestonesGap,
    cardContainerWidth: timelineContainerWidth,
    isDesktop,
    verticalSnappedOffset,
    cardInnerContainerHeight,
  } = useCalculationValue();

  const { firstYearInCardsContainer, lastYearInCardsContainer } =
    useCardsInView();
  const { cardYears } = useJourneyContext();
  const totalYears = cardYears.length - 1;

  const yearIndex = cardYears.findIndex(
    (year) => year === lastYearInCardsContainer
  );

  const [milestonesVisibility, setMilestonesVisibility] = useState<boolean[]>(
    []
  );

  const timelineScale = useMotionValue(0);

  const scaleX = useTransform(timelineScale, [0, totalYears + 2], [0, 1]);

  useEffect(() => {
    animate(timelineScale, yearIndex + 1, {
      duration: 0.5,
    });

    if (yearIndex < totalYears) return;
    if (timelineScale.get() === totalYears) {
      animate(timelineScale, timelineScale.get() + 2, {
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        damping: 40,
      });
    }
  }, [timelineScale, totalYears, yearIndex]);

  const offset = useMotionValue(0);

  const updateVisibility = useCallback(() => {
    const currentOffset = offset.get();

    const newMilestonesVisibility = cardYears.map((_, index) => {
      const milestoneStart = (index + 1) * milestonesGap - getFontSize(12);
      const milestoneEnd = milestoneStart + getFontSize(24);

      const isVisible =
        milestoneStart + currentOffset >= 0 &&
        milestoneEnd + currentOffset <= timelineContainerWidth;

      return isVisible;
    });

    setMilestonesVisibility(newMilestonesVisibility);
  }, [cardYears, milestonesGap, offset, timelineContainerWidth]);

  const setVisibilityByIndex = useCallback(
    (index: number, isVisible: boolean) => {
      const newMilestonesVisibility = [...milestonesVisibility];

      newMilestonesVisibility[index] = isVisible;

      setMilestonesVisibility(newMilestonesVisibility);
    },
    [milestonesVisibility]
  );

  useEffect(() => {
    // run once
    updateVisibility();
  }, [updateVisibility]);

  const firstTrueIndex = milestonesVisibility.indexOf(true);
  const lastTrueIndex = milestonesVisibility.lastIndexOf(true);

  const handlePrev = useCallback(() => {
    if (!isMounted) return;

    const currentOffset = offset.get();

    animate(offset, currentOffset + milestonesGap, {
      duration: 0.5,
      onPlay: () => {
        setVisibilityByIndex(firstTrueIndex - 1, true);
      },
      onComplete: () => {
        updateVisibility();
        setOffsetIndex(offsetIndex - 1);
      },
    });
  }, [
    firstTrueIndex,
    isMounted,
    milestonesGap,
    offset,
    offsetIndex,
    setVisibilityByIndex,
    updateVisibility,
  ]);

  const handleNext = useCallback(() => {
    if (!isMounted) return;

    const currentOffset = offset.get();

    animate(offset, currentOffset - milestonesGap, {
      duration: 0.5,
      onPlay: () => {
        setVisibilityByIndex(lastTrueIndex + 1, true);
      },
      onComplete: () => {
        updateVisibility();
        setOffsetIndex(offsetIndex + 1);
      },
    });
  }, [
    isMounted,
    lastTrueIndex,
    milestonesGap,
    offset,
    offsetIndex,
    setVisibilityByIndex,
    updateVisibility,
  ]);

  useEffect(() => {
    if (!lastYearInCardsContainer) return;

    const yearIndex = cardYears.findIndex(
      (year) => year === lastYearInCardsContainer
    );

    if (yearIndex === -1) return;

    const milestoneVisibility = milestonesVisibility[yearIndex];

    if (!milestoneVisibility) {
      handleNext();
    }

    setIsMounted(true);
    // if lastYearInCardsContainer changes, run the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardYears, lastYearInCardsContainer]);

  // use effect for firstYearInCardsContainer
  useEffect(() => {
    if (!firstYearInCardsContainer) return;

    const yearIndex = cardYears.findIndex(
      (year) => year === firstYearInCardsContainer
    );

    if (yearIndex === -1) return;

    const milestoneVisibility = milestonesVisibility[yearIndex];

    if (!milestoneVisibility) {
      handlePrev();
    }

    setIsMounted(true);
    // if firstYearInCardsContainer changes, run the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardYears, firstYearInCardsContainer]);

  const getMilestoneOffset = useCallback(
    (index: number) => {
      if (milestonesVisibility[index]) return 0;

      if (index > lastTrueIndex) {
        return getFontSize(300);
      }

      if (index < firstTrueIndex) {
        return getFontSize(-300);
      }
    },
    [firstTrueIndex, lastTrueIndex, milestonesVisibility]
  );

  const verticalSnappedOffsetValue = useMotionValue(0);
  const minimumOffset = -cardInnerContainerHeight + getFontSize(1041);
  const startingScaleY = getFontSize(1041) / Math.abs(minimumOffset);
  const scaleY = useTransform(
    verticalSnappedOffsetValue,
    [0, minimumOffset],
    [startingScaleY, 1]
  );

  useEffect(() => {
    animate(verticalSnappedOffsetValue, verticalSnappedOffset, {
      duration: 0.5,
    });
  }, [verticalSnappedOffset, verticalSnappedOffsetValue]);

  useEffect(() => {
    offset.set(milestonesGap * -offsetIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milestonesGap]);

  if (isDesktop === null) return null;

  return isDesktop ? (
    <motion.div
      className={styles.journeyTimeline}
      variants={timelineVariants}
      initial='outOfView'
      whileInView='inView'
      viewport={{ once: true, amount: 0.35 }}
      custom='desktop'
    >
      <motion.div
        className={styles.milestonesYear}
        style={{ marginLeft: milestonesGap, x: offset }}
      >
        {cardYears.map((year, index) => (
          <motion.div
            key={year}
            className={styles.yearWrapper}
            style={{ width: milestonesGap }}
          >
            <motion.p
              className={styles.year}
              style={{
                translateX: '-50%',
                x: getMilestoneOffset(index),
              }}
            >
              {year}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className={styles.timeline}
        style={{ width: timelineWidth, x: offset }}
      >
        <motion.div
          className={styles.timelineProgress}
          style={{ scaleX, originX: 0 }}
        />
      </motion.div>

      <motion.div
        className={styles.milestones}
        style={{ marginLeft: milestonesGap, x: offset }}
      >
        {cardYears.map((year, index) => (
          <motion.div
            key={year}
            className={styles.milestoneWrapper}
            style={{
              width: milestonesGap,
              translateY: '-50%',
              x: getMilestoneOffset(index),
            }}
          >
            <motion.div className={styles.milestone} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      className={styles.verticalTimeline}
      variants={timelineVariants}
      initial='outOfView'
      whileInView='inView'
      viewport={{ once: true, amount: 0.35 }}
      custom='mobile'
      style={{ originY: 0 }}
    >
      <motion.div
        className={styles.timelineProgress}
        style={{ scaleY, originY: 0 }}
      />
    </motion.div>
  );
};
