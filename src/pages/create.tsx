import FormProfile from '@/components/form-profile';
import FormInvoice from '@/components/form-invoice';
import { FormGroupProvider } from '@/context/form-group';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function CreatePage() {
  return (
    <div className="container p-0 md:p-8">
      <FormGroupProvider>
        <Breadcrumb className="p-2 md:p-0 md:mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Create</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-4">
          <FormProfile />
        </section>

        <section className="mb-4">
          <FormInvoice />
        </section>
      </FormGroupProvider>
    </div>
  );
}
