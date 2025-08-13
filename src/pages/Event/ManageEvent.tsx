/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDeleteEventMutation, useGetEventQuery } from '@/redux/features/event/event.api';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { TypographyH3 } from '@/components/ui/typography';
import DeleteConfirmation from '@/components/modules/common/DeleteConfirmation';

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
  updatedAt: string;
  slug: string;
}

const ManageEvent = () => {
  const { data: events, isLoading, refetch } = useGetEventQuery(null);
  const [deleteEvent] = useDeleteEventMutation();

  const handleUpdate = (id: string) => {
    // Navigate or open modal here
  };

  const handleDelete = async (eventSlug: string) => {
    return await deleteEvent(eventSlug).unwrap();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto container mx-auto">
      <TypographyH3 title="Manage Events" className="mb-12 text-center" />
      <table className="min-w-full border border-gray-300">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 border">SI</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events?.data?.map((event: IManageEvent, index: number) => (
            <tr key={event._id} className="hover:bg-primary/10">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{event.title}</td>
              <td className="px-4 py-2 border">
                {event.date ? new Date(event.date).toLocaleDateString() : 'No date'}
              </td>
              <td className="px-4 py-2 border space-x-2 flex">
                <Button onClick={() => handleUpdate(event._id)}>
                  <SquarePen size={16} />
                </Button>
                <DeleteConfirmation onConfirm={() => handleDelete(event.slug)}>
                  <Button>
                    <Trash2 />
                  </Button>
                </DeleteConfirmation>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvent;
