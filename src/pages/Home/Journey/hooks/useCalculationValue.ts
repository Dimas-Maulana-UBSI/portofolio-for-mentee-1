import { getFontSize } from '@/utils/style/getFontSize';
import { useJourneyContext } from './useJourneyContext';

export const useCalculationValue = () => {
  const {
    offsetMovement,
    cardWidth,
    cardHeight,
    cardContainerWidth,
    cardInnerContainerWidth,
    cardInnerContainerHeight,
    cardYears,
    verticalSnappedOffset,
    setOffsetMovement,
    setCardWidth,
    setCardHeight,
    setCardContainerWidth,
    setCardInnerContainerWidth,
    setCardInnerContainerHeight,
    setVerticalSnappedOffset,
  } = useJourneyContext();

  const cardsGap = getFontSize(24);
  const timelineWidth = (cardYears.length + 1) * (cardContainerWidth / 4);
  const milestonesGap = cardContainerWidth / 4;

  // check if at least 2 cards can fit in the container
  const isDesktop = !cardContainerWidth
    ? null
    : cardContainerWidth >= getFontSize(376) * 2 + cardsGap;

  return {
    offsetMovement,
    cardWidth,
    cardHeight,
    cardsGap,
    cardContainerWidth,
    cardInnerContainerWidth,
    cardInnerContainerHeight,
    timelineWidth,
    milestonesGap,
    isDesktop,
    verticalSnappedOffset,
    setOffsetMovement,
    setCardWidth,
    setCardHeight,
    setCardContainerWidth,
    setCardInnerContainerWidth,
    setCardInnerContainerHeight,
    setVerticalSnappedOffset,
  };
};
