import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Profile, profileSchema } from '@/lib/schemas';
import { DataContext } from '@/context/data';
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
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';

export default function FormProfile() {
  const { profile, saveProfile } = useContext(DataContext);

  const form = useForm<Profile>({
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
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
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
