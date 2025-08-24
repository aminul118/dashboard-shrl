/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useAddEventMutation } from '@/redux/features/event/event.api';
import { toast } from 'sonner';
import MultipleImageDrop from '@/components/ui/multiple-image-drop';
import ButtonSpinner from '@/components/ui/button-spinner';
import GradientTitle from '@/components/ui/gradientTitle';
import ReactQuil from '@/components/modules/common/ReactQuil';

// -----------------
// Zod schema
// -----------------
const formSchema = z.object({
  title: z.string().min(8, {
    message: 'Title must be at least 8 characters.',
  }),
  content: z.string(),
  photos: z
    .array(z.instanceof(File), {
      message: 'At least one photo is required',
    })
    .min(1, 'At least one photo is required'),
});

type FormValues = z.infer<typeof formSchema>;

// -----------------
// Component
// -----------------
const AddEvent = () => {
  const [addEvent, { isLoading }] = useAddEventMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      photos: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading('Event adding....');
    try {
      const payload = {
        title: data.title,
        content: data.content,
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));

      // Append each file individually
      data.photos.forEach((file) => {
        formData.append('files', file); // 'files' must match backend key
      });

      const res = await addEvent(formData).unwrap();
      toast.success(res.message, { id: toastId });
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'ERROR', { id: toastId });
    }
  };

  return (
    <div className="container mx-auto">
      <GradientTitle title="Add Event" description="This event which is already happened" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="write title here ....." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Photos */}
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <MultipleImageDrop onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quill Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ReactQuil value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-52" disabled={isLoading}>
            {isLoading ? <ButtonSpinner /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEvent;
