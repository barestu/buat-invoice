import FormProfile from '@/components/form-profile';
import FormInvoice from '../components/form-invoice';

export default function CreatePage() {
  return (
    <div className="container p-8 space-y-8">
      <FormProfile />
      <FormInvoice />
    </div>
  );
}
