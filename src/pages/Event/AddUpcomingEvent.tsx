/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import DatePicker from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { toast } from 'sonner';
import ImageDrop from '@/components/ui/image-drop';
import { useAddUpcomingEventMutation } from '@/redux/features/event/event.api';
import GradientTitle from '@/components/ui/gradientTitle';

// ✅ Validation schema
const formSchema = z.object({
  title: z.string().min(6, { message: 'Title must be at least 6 characters.' }),
  date: z.date(),
  time: z.string().min(1, { message: 'Time is required' }),
  venue: z.string().min(4, { message: 'Venue must be at least 4 characters.' }),
  photo: z.instanceof(File, { message: 'Must upload an image file' }),
  details: z.string().min(10, { message: 'Details must be at least 10 characters.' }),
});

const AddUpcomingEvent = () => {
  const [addUpcomingEvent] = useAddUpcomingEventMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      time: '',
      venue: '',
      details: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('file', data.photo);

    try {
      const res = await addUpcomingEvent(formData).unwrap();
      toast.success(res.message || 'Event added successfully!');
      form.reset(); // ✅ clears everything including image
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10">
      <GradientTitle
        title="Add Upcoming Event"
        description="Add Your upcoming event so people know your next step"
      />

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
                  <Input placeholder="Event Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Venue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time & Date */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="(e.g. 6:00 to 7:00 PM)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Photo */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageDrop onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Details */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Details" {...field} className="h-36" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddUpcomingEvent;
