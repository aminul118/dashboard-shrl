/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
import { Input } from '@/components/ui/input';
import { useAiTrainingsMutation } from '@/redux/features/ai/ai.api';

const formSchema = z.object({
  question: z.string().min(5, {
    message: 'Question text must be at least 10 characters.',
  }),
  answer: z.string().min(5, {
    message: 'Answer text must be at least 10 characters.',
  }),
});

const AddAiTrainingsModal = () => {
  const [open, setOpen] = useState(false);

  const [aiTraining] = useAiTrainingsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading('Adding scrolling text...');
      const res = await aiTraining(values).unwrap();
      toast.success(res.message || 'Scrolling text added', { id: toastId });
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add scrolling text');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add AI Training data</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add AI Trainings data</DialogTitle>
          <DialogDescription>This text will use as a ai search on SHRL website</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Write your question..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Write your answer..." {...field} className="h-36" />
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
};

export default AddAiTrainingsModal;
