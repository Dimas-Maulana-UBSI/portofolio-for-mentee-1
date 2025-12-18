import { useCalculationValue } from './useCalculationValue';
import { Children, ReactNode, useCallback, useMemo } from 'react';
import { MotionValue } from 'framer-motion';
import { useCardEntries } from './useCardEntries';

export const useCardsInView = () => {
  const { cardWidth, cardContainerWidth, cardsGap } = useCalculationValue();

  const { updateCardEntryVisibility, cardEntries } = useCardEntries();

  const { isFirstCardVisible, isLastCardVisible } = useMemo(
    () => ({
      isFirstCardVisible: cardEntries.get(0)?.isVisible ?? true, // will switch this to false later
      isLastCardVisible:
        cardEntries.get(cardEntries.size - 1)?.isVisible ?? false, // will switch this to true later
    }),
    [cardEntries]
  );

  const { firstYearInCardsContainer, lastYearInCardsContainer } =
    useMemo(() => {
      const cardEntriesArray = [...cardEntries.values()];

      const visibleCards = cardEntriesArray.filter((entry) => entry.isVisible);

      return {
        firstYearInCardsContainer: visibleCards[0]?.dateTo.getFullYear(),
        lastYearInCardsContainer:
          visibleCards[visibleCards.length - 1]?.dateTo.getFullYear(),
      };
    }, [cardEntries]);

  const checkVisibility = useCallback(
    (offset: MotionValue<number>, children: ReactNode | ReactNode[]) => {
      const currentOffset = offset.get();
      const containerWidth = cardContainerWidth;

      Children.toArray(children).forEach((_, index) => {
        const cardStart = index * (cardWidth + cardsGap);
        const cardEnd = cardStart + cardWidth;

        const isVisible =
          cardStart + currentOffset >= 0 &&
          cardEnd + currentOffset <= containerWidth;

        updateCardEntryVisibility(index, isVisible);
      });
    },
    [cardContainerWidth, cardWidth, cardsGap, updateCardEntryVisibility]
  );

  return {
    checkVisibility,
    isFirstCardVisible,
    isLastCardVisible,
    firstYearInCardsContainer,
    lastYearInCardsContainer,
  };
};
