/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { IChildren } from '@/types';
import { toast } from 'sonner';

interface IDeleteResponse {
  success: boolean;
  message?: string;
}

interface IDeleteConfirmation extends IChildren {
  onConfirm: () => Promise<IDeleteResponse>;
}

const DeleteConfirmation = ({ children, onConfirm }: IDeleteConfirmation) => {
  // Delete data function to delete something
  const handleDelete = async () => {
    const toastId = toast.loading('Removing...');
    try {
      const res = await onConfirm();
      console.log('RES-->', res);
      if (res.success) {
        toast.success(res.message ?? 'Removed Successfully', { id: toastId });
      }
    } catch (error: any) {
      console.log('ERROR-->', error);
      toast.error('Failed to delete. Please try again.', { id: toastId });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
