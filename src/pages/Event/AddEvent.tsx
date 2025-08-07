import ReactQuil from "@/components/modules/common/ReactQuil";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
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
import { useAddEventMutation } from "@/redux/features/event/event.api";
import { toast } from "sonner";

// Schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  content: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const AddEvent = () => {
  const [addEvent] = useAddEventMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "", // quill content
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Submit Values:", values);

    try {
      const res = await addEvent(values).unwrap();
      console.log(res);
      toast.success(res.message);
      form.reset();
    } catch (error) {
      toast.error("ERROR");
    }

    // send values.username and values.description to backend
    // axios.post('/api/event', values);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-8">
        <TypographyH3 title="Add Event" />
        <TypographyP text="This event which is already happened" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Username */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your name..." {...field} />
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

          <Button type="submit" className="w-52">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEvent;
