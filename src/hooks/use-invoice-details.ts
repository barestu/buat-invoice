import { useContext } from 'react';
import { LocalDataContext } from '@/context/local-data';

export const useInvoiceDetails = (code?: string) => {
  const { invoices } = useContext(LocalDataContext);
  if (!code || !invoices) return null;
  return invoices[code];
};
