import { useJourneyContext } from './useJourneyContext';

export const useNavigation = () => {
  const { navHandlers } = useJourneyContext();

  return { ...navHandlers };
};
