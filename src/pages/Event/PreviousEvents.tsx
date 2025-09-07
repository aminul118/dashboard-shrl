import { useDeleteEventMutation, useGetEventQuery } from '@/redux/features/event/event.api';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
import ButtonSpinner from '@/components/ui/button-spinner';
import GradientTitle from '@/components/ui/gradientTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dateFormat from '@/utils/dateFormat';
import { Link } from 'react-router';

export interface IManageEvent {
  _id: string;
  heading: string;
  date: string;
  time: string;
  venue: string;
  facilitators: string;
  photo: string;
  details: string;
  content: string;
  title: string;
  createdAt: string;
  slug: string;
  photos?: string[]; // added to match your API
}

const PreviousEvents = () => {
  const { data: events, isLoading } = useGetEventQuery(null);
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation();

  const handleDelete = async (eventSlug: string) => {
    return await deleteEvent(eventSlug).unwrap();
  };

  if (!isLoading) {
    return (
      <div className="overflow-x-auto container mx-auto">
        <div className="flex justify-between items-center">
          <GradientTitle title="All Events" />
          <Button>
            <Link to="/add-event">Add Events</Link>
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead>SI</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.data?.length === 0 ? (
              <>
                <TableRow className="hover:bg-primary/10">
                  <TableCell colSpan={5} className="text-center py-4">
                    No Events Found. Add Events to see here
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {events?.data?.map((event: IManageEvent, index: number) => (
                  <TableRow key={event._id} className="hover:bg-primary/10">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {event.photos && event.photos.length > 0 ? (
                        <img
                          src={event.photos[0]}
                          alt={event.title}
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No Photo</span>
                      )}
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{dateFormat(event.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <DeleteConfirmation onConfirm={() => handleDelete(event.slug)}>
                        <Button disabled={deleteLoading} size="icon" variant="destructive">
                          {deleteLoading ? <ButtonSpinner /> : <Trash2 />}
                        </Button>
                      </DeleteConfirmation>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default PreviousEvents;
