import { Invoice, invoiceSchema, Profile, profileSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

interface IFormGroupContext {
  formProfile: UseFormReturn<Profile>;
  formInvoice: UseFormReturn<Invoice>;
}

export const FormGroupContext = createContext<IFormGroupContext>({
  formProfile: {} as UseFormReturn<Profile>,
  formInvoice: {} as UseFormReturn<Invoice>,
});

// TODO: improve performance using React.memo
export const FormGroupProvider = ({ children }: React.PropsWithChildren) => {
  const formProfile = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: '',
      companyLogo: '',
      banks: [
        {
          name: '',
          accountName: '',
          accountNo: '',
        },
      ],
    },
  });

  const formInvoice = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      code: Date.now().toString(),
      issuedAt: new Date(),
      receiverName: '',
      receiverPhone: '',
      receiverAddress: '',
      items: [{ name: '', qty: 1, price: 0 }],
      shipmentPrice: 0,
      packingPrice: 0,
    },
  });

  return (
    <FormGroupContext.Provider value={{ formProfile, formInvoice }}>
      {children}
    </FormGroupContext.Provider>
  );
};
