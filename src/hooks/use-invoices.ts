import { useContext } from 'react';
import { LocalDataContext } from '@/context/local-data';

export const useInvoices = () => {
  const { invoices } = useContext(LocalDataContext);
  if (!invoices) return [];
  return Object.values(invoices).map((invoice) => invoice);
};
