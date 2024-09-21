import FormProfile from '@/components/form-profile';
import FormInvoice from '@/components/form-invoice';
import { FormGroupProvider } from '@/context/form-group';

export default function CreatePage() {
  return (
    <div className="container p-0 md:p-8 space-y-4 md:space-y-8">
      <FormGroupProvider>
        <FormProfile />
        <FormInvoice />
      </FormGroupProvider>
    </div>
  );
}
