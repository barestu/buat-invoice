import { useContext } from 'react';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Invoice, invoiceSchema } from '@/lib/schemas';
import { LocalDataContext } from '@/context/local-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function FormCreate() {
  const navigate = useNavigate();
  const { saveInvoice } = useContext(LocalDataContext);

  const form = useForm<Invoice>({
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (values: Invoice) => {
    saveInvoice(values);
    toast.success('Invoice created!');
    navigate(`/preview/${values.code}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Invoice</CardTitle>
            <CardDescription>
              Fill the information of the invoice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Receiver Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Receiver Phone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receiverAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Receiver Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <ul>
              <h3 className="font-medium mb-3 text-sm leading-none">
                Invoice Items
              </h3>

              {fields.map((_, idx) => (
                <li
                  key={idx}
                  className="mb-4 border p-4 rounded-md border-dashed"
                >
                  <FormField
                    control={form.control}
                    name={`items.${idx}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex gap-3 mt-3">
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.qty`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input placeholder="Quantity" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name={`items.${idx}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (Rp.)</FormLabel>
                            <FormControl>
                              <Input placeholder="Price" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full mt-3"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(idx)}
                  >
                    <Trash2Icon size={18} />
                  </Button>
                </li>
              ))}

              <li>
                <Button
                  type="button"
                  className="w-full border-dashed py-6"
                  variant="outline"
                  onClick={() => append({ name: '', qty: 1, price: 0 })}
                >
                  <PlusCircleIcon className="mr-2" /> Add Invoice Item
                </Button>
              </li>
            </ul>

            <FormField
              control={form.control}
              name="shipmentPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Price (Rp.)</FormLabel>
                  <FormControl>
                    <Input placeholder="Shipment Price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="packingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packing Price (Rp.)</FormLabel>
                  <FormControl>
                    <Input placeholder="Packing Price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="ml-auto"
              disabled={form.watch('items').length === 0}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
