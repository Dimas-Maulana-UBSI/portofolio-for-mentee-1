import React, { createContext, useMemo, useRef, useState } from 'react';

export type EssentialCardDetail = {
  dateFrom: Date;
  dateTo: Date;
  isVisible: boolean;
};

type NavHandlers = {
  goToPrev: () => void;
  goToNext: () => void;
} | null;

type JourneyContextType = {
  cardsContainerRef: React.RefObject<HTMLDivElement>;
  isLastCardVisible: boolean;
  navHandlers: { goToPrev: () => void; goToNext: () => void } | null;
  offsetMovement: number;
  cardWidth: number;
  cardHeight: number;
  cardContainerWidth: number;
  cardInnerContainerWidth: number;
  cardInnerContainerHeight: number;
  cardEntries: Map<number, EssentialCardDetail>;
  verticalSnappedOffset: number;
  setIsLastCardVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setNavHandlers: (handlers: NavHandlers) => void;
  cardYears: number[];
  setOffsetMovement: React.Dispatch<React.SetStateAction<number>>;
  setCardWidth: React.Dispatch<React.SetStateAction<number>>;
  setCardHeight: React.Dispatch<React.SetStateAction<number>>;
  setCardContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setCardInnerContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setCardInnerContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setCardEntries: React.Dispatch<
    React.SetStateAction<Map<number, EssentialCardDetail>>
  >;
  setVerticalSnappedOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const JourneyContext = createContext<JourneyContextType | null>(null);

type JourneyProviderProps = {
  children: React.ReactNode;
};

export const JourneyProvider: React.FC<JourneyProviderProps> = ({
  children,
}) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isLastCardVisible, setIsLastCardVisible] = useState(false);
  const [navHandlers, setNavHandlers] = useState<NavHandlers>(null);
  const [offsetMovement, setOffsetMovement] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardContainerWidth, setCardContainerWidth] = useState(0);
  const [cardInnerContainerWidth, setCardInnerContainerWidth] = useState(0);
  const [cardInnerContainerHeight, setCardInnerContainerHeight] = useState(0);
  const [verticalSnappedOffset, setVerticalSnappedOffset] = useState(0);

  const [cardEntries, setCardEntries] = useState<
    Map<number, EssentialCardDetail>
  >(new Map());

  const cardYears = useMemo(
    () => [
      ...new Set(
        [...cardEntries.values()].map((entry) => entry.dateTo.getFullYear())
      ),
    ],
    [cardEntries]
  );

  return (
    <JourneyContext.Provider
      value={{
        cardsContainerRef,
        isLastCardVisible,
        navHandlers,
        cardYears,
        offsetMovement,
        cardWidth,
        cardHeight,
        cardInnerContainerWidth,
        cardInnerContainerHeight,
        cardContainerWidth,
        cardEntries,
        verticalSnappedOffset,
        setIsLastCardVisible,
        setNavHandlers,
        setOffsetMovement,
        setCardWidth,
        setCardHeight,
        setCardInnerContainerWidth,
        setCardInnerContainerHeight,
        setCardContainerWidth,
        setCardEntries,
        setVerticalSnappedOffset,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};
