import { useCallback } from 'react';
import { useJourneyContext } from './useJourneyContext';
import { EssentialCardDetail } from '../context/JourneyContext';

export const useCardEntries = () => {
  const { cardEntries, setCardEntries } = useJourneyContext();

  const addCardEntries = useCallback(
    (entries: [number, EssentialCardDetail][]) => {
      setCardEntries(new Map(entries));
    },
    [setCardEntries]
  );

  const updateCardEntryVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      setCardEntries((prev) => {
        const prevDetail = prev.get(id);
        if (!prevDetail) return prev;

        return new Map(prev).set(id, {
          ...prevDetail,
          isVisible,
        });
      });
    },
    [setCardEntries]
  );

  return { cardEntries, addCardEntries, updateCardEntryVisibility };
};
