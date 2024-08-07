import { useContext } from 'react';
import { LocalDataContext } from '@/context/local-data';

export const useProfile = () => {
  const { profile } = useContext(LocalDataContext);
  return profile;
};
