import {
  useDeleteUpcomingEventMutation,
  useGetUpcomingEventsQuery,
} from '@/redux/features/event/event.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteConfirmation from '@/components/modules/actions/DeleteConfirmation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import dateFormat from '@/utils/dateFormat';
import GradientTitle from '@/components/ui/gradientTitle';
import { Link } from 'react-router';

export interface IUpcomingEventData {
  _id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  photo: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

const ManageUpcomingEvent = () => {
  const { data: upcomingEvents, isLoading } = useGetUpcomingEventsQuery(undefined);
  const [deleteEventById, { isLoading: isDeleting }] = useDeleteUpcomingEventMutation();

  const handleDelete = async (id: string) => {
    return await deleteEventById(id).unwrap();
  };

  if (!isLoading) {
    return (
      <div className="overflow-x-auto container mx-auto">
        <div className="flex justify-between items-center">
          <GradientTitle title="Upcoming Events" />
          <Button>
            <Link to="/add-upcoming-event">Add Upcoming Event</Link>
          </Button>
        </div>
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead>SI</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingEvents?.data?.length === 0 ? (
              <>
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No Upcoming Event Found
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {upcomingEvents?.data?.map((event: IUpcomingEventData, index: number) => (
                  <TableRow key={event._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={event.photo} alt={event.title} />
                        <AvatarFallback>{event.title?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{dateFormat(event.date)}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell className="space-x-2">
                      <DeleteConfirmation onConfirm={() => handleDelete(event._id)}>
                        <Button variant="destructive" size="sm" disabled={isDeleting}>
                          <Trash2 className="w-4 h-4" />
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

export default ManageUpcomingEvent;
