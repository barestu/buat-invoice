import { useContext, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';

import { Profile } from '@/lib/schemas';
import { FormGroupContext } from '@/context/form-group';
import { LocalDataContext } from '@/context/local-data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export default function FormProfile() {
  const { profile, saveProfile } = useContext(LocalDataContext);
  const { formProfile: form } = useContext(FormGroupContext);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'banks',
  });

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [form, profile]);

  const onSubmit = (values: Profile) => {
    saveProfile(values);
    toast.success('Profile saved!');
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is your shop or company profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = (e) => {
                            if (e.target?.result) {
                              field.onChange(e.target.result);
                            }
                          };
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />

                  {form.getValues('companyLogo') && (
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-32 object-contain mb-2"
                        src={form.getValues('companyLogo')}
                        alt="Company logo preview"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => form.setValue('companyLogo', '')}
                      >
                        <Trash2Icon size={16} className="mr-2" />
                        Remove logo
                      </Button>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <ul>
              <h3 className="font-medium mb-3 text-sm leading-none">Banks</h3>

              {fields.map((_, idx) => (
                <li
                  key={idx}
                  className="mb-4 border p-4 rounded-md border-dashed"
                >
                  <FormField
                    control={form.control}
                    name={`banks.${idx}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank XYZ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`banks.${idx}.accountNo`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account No.</FormLabel>
                        <FormControl>
                          <Input placeholder="1000200300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`banks.${idx}.accountName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full mt-3"
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(idx)}
                  >
                    <Trash2Icon size={18} />
                  </Button>
                </li>
              ))}

              {fields.length < 3 && (
                <li>
                  <Button
                    type="button"
                    className="w-full border-dashed py-6"
                    variant="outline"
                    onClick={() =>
                      append({ name: '', accountNo: '', accountName: '' })
                    }
                  >
                    <PlusCircleIcon className="mr-2" /> Add Bank
                  </Button>
                </li>
              )}

              {form.formState.errors.banks?.root && (
                <p className="text-destructive text-center text-sm py-3">
                  You need to fill the Bank information (minimum 1)
                </p>
              )}
            </ul>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="ml-auto">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
