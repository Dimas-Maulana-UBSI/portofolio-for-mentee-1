import { useContext } from 'react';
import { AppFormContext } from '../context/AppFormContext';

export const useAppFormContext = () => {
  const context = useContext(AppFormContext);
  if (!context) {
    throw new Error('useAppFormContext must be used within an AppFormProvider');
  }
  return context;
};
