/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useAddUpcomingEventMutation } from "@/redux/features/event/event.api";
import { toast } from "sonner";
import ImageDrop from "@/components/ui/image-drop";

// ✅ FIXED Zod Schema
const formSchema = z.object({
  title: z.string().min(6, {
    message: "Title must be at least 6 characters.",
  }),
  date: z.date(),
  time: z.string().min(1, {
    message: "Time is required",
  }),
  venue: z.string().min(4, {
    message: "Venue must be at least 4 characters.",
  }),
  photo: z
    .instanceof(File, { message: "Must upload an image file" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB",
    }),
  details: z.string().min(10, {
    message: "Details must be at least 10 characters.",
  }),
});

const AddUpcomingEvent = () => {
  const [addUpcomingEvent] = useAddUpcomingEventMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "",
      venue: "",
      photo: "",
      details: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const eventInfo = {
      ...data,
    };
    try {
      console.log("Submitted Event Info:", eventInfo);
      // const res = await addUpcomingEvent(eventInfo).unwrap();
      // console.log("RES--->", res);
      // toast.success(res.message);
      // form.reset();
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10">
      <div className="text-center mb-12">
        <TypographyH3 title="Add Upcoming Event" />
        <TypographyP text="Add Your upcoming event that people know your step " />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Event Title */}
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

          {/* Time */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="Time (e.g. 6:00 PM)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Picker */}
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

          {/* Photo */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <ImageDrop {...field} />
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
