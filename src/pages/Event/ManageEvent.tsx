import { useDeleteEventMutation, useGetEventQuery } from '@/redux/features/event/event.api';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import DeleteConfirmation from '@/components/modules/common/DeleteConfirmation';
import ButtonSpinner from '@/components/ui/button-spinner';

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
  const { data: events, isLoading } = useGetEventQuery(null);
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation();

  const handleDelete = async (eventSlug: string) => {
    return await deleteEvent(eventSlug).unwrap();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (events?.data.length === 0) {
    return (
      <div className=" text-center">
        <TypographyH3 className="text-primary" title="No Event Found" />
        <TypographyP text="Please add Event to show here" />
      </div>
    );
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
                <DeleteConfirmation onConfirm={() => handleDelete(event.slug)}>
                  <Button disabled={deleteLoading}>
                    {deleteLoading ? <ButtonSpinner /> : <Trash2 />}
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
