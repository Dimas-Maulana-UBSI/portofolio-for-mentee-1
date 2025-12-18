import { useContext } from 'react';
import { JourneyContext } from '../context/JourneyContext';

export const useJourneyContext = () => {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error('useJourneyContext must be used within an AppFormProvider');
  }

  return context;
};
