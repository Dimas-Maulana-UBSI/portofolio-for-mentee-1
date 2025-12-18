import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useJourneyContext } from '../hooks/useJourneyContext';
import { animate, motion, useMotionValue, Variants } from 'framer-motion';
import { JourneyCardsItem, JourneyCardsItemProps } from './JourneyCardsItem';
import { useCardEntries } from '../hooks/useCardEntries';
import { EssentialCardDetail } from '../context/JourneyContext';
import { useCalculationValue } from '../hooks/useCalculationValue';
import { useCardsInView } from '../hooks/useCardsInView';
import clsx from 'clsx';
import { getFontSize } from '@/utils/style/getFontSize';
import styles from './JourneyCards.module.scss';
import { FadeWrapper } from '@/components/FadeWrapper';

const cardsContainerVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

type ArrayOrSingle<T> = T | T[];

type JourneyCardsProps = {
  children: ArrayOrSingle<React.ReactElement<JourneyCardsItemProps>>;
};

type SubComponents = {
  Item: typeof JourneyCardsItem;
};

export const JourneyCards: React.FC<JourneyCardsProps> & SubComponents = ({
  children,
}) => {
  const { cardsContainerRef, setNavHandlers } = useJourneyContext();

  const cardsInnerContainerRef = useRef<HTMLDivElement>(null);

  const {
    offsetMovement,
    cardContainerWidth,
    cardHeight,
    cardInnerContainerWidth,
    cardInnerContainerHeight,
    isDesktop,
    verticalSnappedOffset,
    setCardContainerWidth,
    setCardInnerContainerWidth,
    setCardInnerContainerHeight,
    setVerticalSnappedOffset,
  } = useCalculationValue();

  const { addCardEntries } = useCardEntries();

  useEffect(() => {
    const cardEntries = Children.toArray(children).map<
      [number, EssentialCardDetail]
    >((child, index) => [
      index,
      {
        dateFrom: (child as ReactElement).props.dateFrom,
        dateTo: (child as ReactElement).props.dateTo,
        isVisible: false,
      },
    ]);

    addCardEntries(cardEntries);
  }, [addCardEntries, children]);

  const offset = useMotionValue(0);

  const { checkVisibility, isFirstCardVisible, isLastCardVisible } =
    useCardsInView();

  useEffect(() => {
    checkVisibility(offset, children);
  }, [checkVisibility, children, offset]);

  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;

    const currentOffset = offset.get();

    if (!isFirstCardVisible) {
      setIsAnimating(true);

      let targetOffset;

      if (currentOffset > -offsetMovement) {
        targetOffset = 0;
      } else {
        targetOffset = currentOffset + offsetMovement;
      }
      animate(offset, targetOffset, {
        duration: 0.5,
        onComplete: () => {
          setIsAnimating(false);
          checkVisibility(offset, children);
        },
      });
    }
  }, [
    checkVisibility,
    children,
    isAnimating,
    isFirstCardVisible,
    offset,
    offsetMovement,
  ]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;

    const currentOffset = offset.get();

    if (!isLastCardVisible) {
      setIsAnimating(true);

      let targetOffset;

      const endOffset = cardContainerWidth - cardInnerContainerWidth - 1; // -1 is extra offset to make sure the timeline progress is working properly
      const minOffsetToAnimate = endOffset + offsetMovement;

      if (currentOffset < minOffsetToAnimate) {
        targetOffset = endOffset;
      } else {
        targetOffset = currentOffset - offsetMovement;
      }

      animate(offset, targetOffset, {
        duration: 0.5,
        onComplete: () => {
          setIsAnimating(false);
          checkVisibility(offset, children);
        },
      });
    }
  }, [
    cardContainerWidth,
    cardInnerContainerWidth,
    checkVisibility,
    children,
    isAnimating,
    isLastCardVisible,
    offset,
    offsetMovement,
  ]);

  useEffect(() => {
    setNavHandlers({ goToPrev: handlePrev, goToNext: handleNext });
  }, [handleNext, handlePrev, setNavHandlers]);

  useEffect(() => {
    const cardContainer = cardsContainerRef.current;

    if (!cardContainer) return;

    const updateCardContainerWidth = () => {
      const cardContainerWidth = cardContainer.getBoundingClientRect().width;

      setCardContainerWidth(cardContainerWidth);
    };

    const resizeObserver = new ResizeObserver(updateCardContainerWidth);

    resizeObserver.observe(cardContainer);
  }, [cardsContainerRef, setCardContainerWidth]);

  useEffect(() => {
    const cardsInnerContainer = cardsInnerContainerRef.current;

    if (!cardsInnerContainer) return;

    const updateCardContainerWidthAndHeight = () => {
      const { width, height } = cardsInnerContainer.getBoundingClientRect();

      setCardInnerContainerWidth(width);
      setCardInnerContainerHeight(height);
    };

    const resizeObserver = new ResizeObserver(
      updateCardContainerWidthAndHeight
    );

    resizeObserver.observe(cardsInnerContainer);
  }, [
    cardsContainerRef,
    setCardContainerWidth,
    setCardInnerContainerHeight,
    setCardInnerContainerWidth,
    isDesktop,
  ]);

  const offsetY = useMotionValue(0);

  const snapThreshold = useMemo(
    () => cardHeight + getFontSize(24),
    [cardHeight]
  );

  const getSnapOffsets = useCallback(
    (offset: number, snapOffset: number) => {
      if (offset > 0) return 0; // Prevent overscrolling
      const minimumOffset = -cardInnerContainerHeight + getFontSize(1041);
      if (offset < minimumOffset) return minimumOffset; // Prevent overscrolling

      const positiveOffset = Math.abs(offset);
      const previousOffset = -(
        Math.floor(positiveOffset / snapOffset) * snapOffset
      ); // Previous snap point
      const nextOffset = -(Math.ceil(positiveOffset / snapOffset) * snapOffset); // Next snap point
      const remainder = positiveOffset % snapOffset; // Distance from the last snap point

      return remainder > snapOffset / 2 ? nextOffset : previousOffset; // Snap logic
    },
    [cardInnerContainerHeight]
  );

  const handleDragEnd = useCallback(() => {
    const snappedOffset = getSnapOffsets(offsetY.get(), snapThreshold); // Calculate snapped position

    setVerticalSnappedOffset(snappedOffset);

    animate(offsetY, snappedOffset, { duration: 0.5 });
  }, [getSnapOffsets, offsetY, setVerticalSnappedOffset, snapThreshold]);

  const fadeState = useMemo(() => {
    if (!isDesktop) {
      if (
        verticalSnappedOffset ===
        -cardInnerContainerHeight + getFontSize(1041)
      ) {
        return 'start';
      }
      if (verticalSnappedOffset === 0) return 'end';
      return 'both';
    }

    if (!isFirstCardVisible && !isLastCardVisible) return 'both';
    if (!isFirstCardVisible) return 'start';
    if (!isLastCardVisible) return 'end';
    return 'none';
  }, [
    cardInnerContainerHeight,
    isDesktop,
    isFirstCardVisible,
    isLastCardVisible,
    verticalSnappedOffset,
  ]);

  return (
    <FadeWrapper
      type={fadeState}
      direction={isDesktop ? 'horizontal' : 'vertical'}
      {...(isDesktop === null ? { style: { opacity: 0 } } : {})}
    >
      <motion.div
        className={clsx(styles.outerContainer, !isDesktop && styles.mobile)}
        ref={cardsContainerRef}
        variants={cardsContainerVariants}
        initial='outOfView'
        whileInView='inView'
        viewport={{ once: true, amount: !isDesktop ? 0.1 : 0.35 }}
      >
        <motion.div
          className={styles.cardsInnerContainer}
          ref={cardsInnerContainerRef}
          drag={isDesktop ? false : 'y'}
          onDragEnd={handleDragEnd}
          style={{ x: isDesktop ? offset : 0, y: isDesktop ? 0 : offsetY }}
        >
          {Children.map(
            children,
            (child, index) => React.cloneElement(child, { index }) // Edward style lol
            // Edward always says that if children need an identifier, the parent should provide it rather than letting the children request it.
          )}
        </motion.div>
      </motion.div>
    </FadeWrapper>
  );
};

JourneyCards.Item = JourneyCardsItem;
