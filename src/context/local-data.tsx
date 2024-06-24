import { createContext, useContext, useEffect, useState } from 'react';
import { Invoice, Profile } from '@/lib/schemas';

interface ILocalDataContext {
  profile?: Profile | null;
  invoices?: Record<string, Invoice>;
  saveProfile: (values: Profile) => void;
  saveInvoice: (values: Invoice) => void;
}

const PROFILE_KEY = 'key_profile';
const INVOICES_KEY = 'key_invoices';

export const LocalDataContext = createContext<ILocalDataContext>({
  profile: null,
  invoices: {},
  saveProfile: () => {},
  saveInvoice: () => {},
});

export const LocalDataProvider = ({ children }: React.PropsWithChildren) => {
  const [profile, setProfile] = useState<Profile>();
  const [invoices, setInvoices] = useState<Record<string, Invoice>>({});

  useEffect(() => {
    const localProfile = localStorage.getItem(PROFILE_KEY) ?? '{}';
    const localInvoices = localStorage.getItem(INVOICES_KEY) ?? '{}';
    setProfile(JSON.parse(localProfile));
    setInvoices(JSON.parse(localInvoices));
  }, []);

  const saveProfile = (values: Profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(values));
    setProfile(values);
  };

  const saveInvoice = (values: Invoice) => {
    const newInvoice = { ...invoices, [values.code]: values };
    localStorage.setItem(INVOICES_KEY, JSON.stringify(newInvoice));
    setInvoices(newInvoice);
  };

  return (
    <LocalDataContext.Provider
      value={{
        profile,
        invoices,
        saveProfile,
        saveInvoice,
      }}
    >
      {children}
    </LocalDataContext.Provider>
  );
};

export const useSelectInvoice = (code?: string) => {
  const { invoices } = useContext(LocalDataContext);
  if (code && invoices) return invoices[code];
  return null;
};
