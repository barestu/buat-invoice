import { useContext, useEffect, useState } from 'react';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Invoice } from '@/lib/schemas';
import { FormGroupContext } from '@/context/form-group';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export default function FormCreate() {
  const navigate = useNavigate();
  const { saveInvoice, saveProfile } = useContext(LocalDataContext);
  const { formInvoice: form, formProfile } = useContext(FormGroupContext);
  const [showConfirmAutofill, setShowConfirmAutofill] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const clipboardValue = form.watch('receiverName').toLowerCase();

  // Detect prefilled form value from clipboard
  useEffect(() => {
    if (
      clipboardValue.includes('nama:') &&
      clipboardValue.includes('no hp:') &&
      clipboardValue.includes('alamat:')
    ) {
      setShowConfirmAutofill(true);
    }
  }, [clipboardValue]);

  const cleanPriceInput = (value: string) => {
    if (value.length > 1 && value[0] === '0') {
      return value.slice(1);
    }
    return value;
  };

  const handleAutofill = () => {
    const splitValue = clipboardValue.split(' ');

    const nameIdx = splitValue.indexOf('nama:') + 1;
    const name = splitValue[nameIdx];

    const phoneIdx = splitValue.indexOf('hp:') + 1;
    const phone = splitValue[phoneIdx];

    const addressIdx = splitValue.indexOf('alamat:') + 1;
    const address = splitValue[addressIdx];

    form.setValue('receiverName', name);
    form.setValue('receiverPhone', phone);
    form.setValue('receiverAddress', address);
  };

  const handleCreateInvoice = (values: Invoice) => {
    saveProfile(formProfile.getValues());
    saveInvoice(values);
    toast.success('Invoice created!');
    navigate(`/preview/${values.code}`);
  };

  return (
    <>
      <Dialog open={showConfirmAutofill} onOpenChange={setShowConfirmAutofill}>
        <DialogContent className="z-[999]">
          <DialogHeader>
            <DialogTitle className="font-bold text-center text-xl">
              Autofill
            </DialogTitle>
            <DialogDescription>
              We have detected prefilled form data from your clipboard, do you
              want to autofill the receiver name, phone & address fields?
              <br />
              <br />
              <span className="text-sm font-semibold">Data found:</span>
              <br />
              <span className="italic">{clipboardValue}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmAutofill(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setShowConfirmAutofill(false);
                handleAutofill();
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateInvoice)}>
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
                                <Input
                                  placeholder="Price"
                                  type="number"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(
                                      cleanPriceInput(e.target.value)
                                    );
                                  }}
                                />
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
                      <Input
                        placeholder="Shipment Price"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(cleanPriceInput(e.target.value));
                        }}
                      />
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
                      <Input
                        placeholder="Packing Price"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(cleanPriceInput(e.target.value));
                        }}
                      />
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
    </>
  );
}
