import { Button } from '@/components/ui/button';
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
import type { IRequestJoin } from '@/pages/Team/TeamJoinRequest';
import { Eye } from 'lucide-react';

export function ShowRequestModal({ payload }: { payload: IRequestJoin }) {
  const {
    name,
    email,
    phone,
    gender,
    occupation,
    field_of_interest,
    time_commitment,
    Why_join_team,
    createdAt,
  } = payload;

  // Fields to display
  const fieldsToShow: Record<string, string> = {
    Name: name,
    Email: email,
    Phone: phone,
    Gender: gender,
    Occupation: occupation,
    'Field of Interest': field_of_interest,
    'Time Commitment': time_commitment,
    'Why Join Team': Why_join_team,
    CreatedAt: new Date(createdAt).toLocaleString(),
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          <DialogDescription>Information provided by the applicant.</DialogDescription>
        </DialogHeader>

        <div className=" rounded-lg p-4">
          <dl className="grid grid-cols-1 gap-y-4">
            {Object.entries(fieldsToShow).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                <dd className="mt-1 text-sm text-foreground break-all">{String(value) || '-'}</dd>
              </div>
            ))}
          </dl>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
