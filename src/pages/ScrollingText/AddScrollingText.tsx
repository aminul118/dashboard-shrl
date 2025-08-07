/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAddScrollingTextMutation } from "@/redux/features/scrollingText/scrollingText.api";

const formSchema = z.object({
  text: z.string().min(10, {
    message: "Scrolling text must be at least 10 characters.",
  }),
});

const AddScrollingText = () => {
  const [addScrollingText] = useAddScrollingTextMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const res = await addScrollingText(values).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Text added failed");
    }
  };
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="text-center mb-12">
        <TypographyH3 title="Add Scrolling Text" />
        <TypographyP text="This text will show in event page top of the website" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your text"
                    {...field}
                    className="h-36"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mx-auto flex" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddScrollingText;
