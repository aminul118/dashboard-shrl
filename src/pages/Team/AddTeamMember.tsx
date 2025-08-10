import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import ReactQuil from '@/components/modules/common/ReactQuil';
import { TypographyH3 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageDrop from '@/components/ui/image-drop';
import { Plus, Trash2 } from 'lucide-react';

// ✅ Zod Schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  content: z.string().min(2, { message: 'Content must be at least 2 characters.' }),
  designation: z.array(z.string().min(1, 'Designation is required')).min(1),
  email: z.string().email(),
  phone: z.string().min(5, { message: 'Phone number is required.' }),
  photo: z.any().optional(),
});

const AddTeamMember = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      content: '',
      designation: [''],
      email: '',
      phone: '',
      photo: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'designation',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form Submitted:', values);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <TypographyH3 title="Add Team Member" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 🔹 Name / Email / Phone */}
          <div className="grid lg:grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 🔹 Designation Fields */}
          <div>
            <FormLabel>Designation</FormLabel>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`designation.${index}`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder={`Designation ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" className="mt-2" onClick={() => append('')}>
              <Plus className="w-4 h-4 mr-2" /> Add Designation
            </Button>
          </div>

          {/* 🔹 Photo Upload */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageDrop {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🔹 Content/Bio */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <ReactQuil value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTeamMember;
