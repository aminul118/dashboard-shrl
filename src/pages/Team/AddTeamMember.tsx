// components/modules/team/AddTeamMember.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import GradientTitle from '@/components/ui/gradientTitle';
import { toast } from 'sonner';
import { useAddTeamMemberMutation } from '@/redux/features/team/team.api';
import type { FieldArrayPath } from 'react-hook-form';
import { Suspense } from 'react';
import ReactQuil from '@/components/modules/common/ReactQuil';
import { useNavigate } from 'react-router';

// ✅ Zod Schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  content: z.string().min(2, { message: 'Content must be at least 2 characters.' }),
  designation: z.array(z.string().min(1, 'Designation is required')).min(1),
  shrlDesignation: z
    .string()
    .min(2, { message: 'SHRL Designation must be at least 2 characters.' }),
  email: z.string().email(),
  phone: z.string().min(5, { message: 'Phone number is required.' }),
  photo: z.instanceof(File).optional().or(z.null()),
});

const AddTeamMember = () => {
  const [addTeamMember] = useAddTeamMemberMutation();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      content: '',
      shrlDesignation: '',
      designation: [''],
      email: '',
      phone: '',
      photo: null,
    },
  });

  type FormValues = z.infer<typeof formSchema>;
  const { fields, append, remove } = useFieldArray<FormValues>({
    control: form.control,
    name: 'designation' as FieldArrayPath<FormValues>,
  });
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    // Exclude the raw File from the JSON blob
    const { photo, ...rest } = data;
    formData.append('data', JSON.stringify(rest));

    if (photo instanceof File) {
      formData.append('file', photo);
    }

    const toastId = toast.loading('Adding team member…');
    try {
      const res = await addTeamMember(formData).unwrap();
      toast.success(res?.message || 'Team member added', { id: toastId });
      form.reset({
        name: '',
        content: '',
        shrlDesignation: '',
        designation: [''],
        email: '',
        phone: '',
        photo: null,
      });
      navigate('/team-members');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to add team member', { id: toastId });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8 text-center">
        <GradientTitle title="Add Team Member" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 🔹 Name / Email / Phone */}
          <div className="grid gap-3 lg:grid-cols-2">
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
            {/* 🔹 SHRL Designation */}
            <FormField
              control={form.control}
              name="shrlDesignation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SHRL Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Designation" {...field} />
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
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" className="mt-2" onClick={() => append('')}>
              <Plus className="mr-2 h-4 w-4" /> Add Designation
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
                  {/* Pass the onChange handler AS A PROP */}
                  <ImageDrop onChange={(file) => field.onChange(file)} />
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
                  <Suspense fallback={<div>Loading editor…</div>}>
                    <ReactQuil value={field.value} onChange={field.onChange} />
                  </Suspense>
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
