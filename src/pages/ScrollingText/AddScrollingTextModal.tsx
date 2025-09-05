/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAddScrollingTextMutation } from '@/redux/features/scrollingText/scrollingText.api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const formSchema = z.object({
  text: z.string().min(10, {
    message: 'Scrolling text must be at least 10 characters.',
  }),
});

function AddScrollingTextModal() {
  const [open, setOpen] = useState(false);

  const [addScrollingText] = useAddScrollingTextMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading('Adding scrolling text...');
      const res = await addScrollingText(values).unwrap();
      toast.success(res.message || 'Scrolling text added', { id: toastId });
      form.reset();
      setOpen(false); // ✅ close modal shadcn way
    } catch (error: any) {
      toast.error(error.message || 'Failed to add scrolling text');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Scrolling Text</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Scrolling Text</DialogTitle>
          <DialogDescription>This text will show at the top of the event page.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your scrolling text..."
                      {...field}
                      className="h-36"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddScrollingTextModal;
