/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteUpcomingEventMutation,
  useGetUpcomingEventsQuery,
} from "@/redux/features/event/event.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ✅ ShadCN Avatar
import { Skeleton } from "@/components/ui/skeleton"; // Optional: loading placeholder
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import ButtonSpinner from "@/components/ui/button-spinner";
import { toast } from "sonner";
import { useState } from "react";
import { TypographyH3 } from "@/components/ui/typography";

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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: upcomingEvents, isLoading } =
    useGetUpcomingEventsQuery(undefined);
  const [deleteEventById] = useDeleteUpcomingEventMutation();
  console.log("UPCO-->", upcomingEvents);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        ))}
      </div>
    );
  }

  const handleUpdate = (id: string) => {
    console.log("Update event:", id);
    // Navigate or open modal here
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteEventById(id).unwrap();
      console.log(res);
      toast.success(res.message);
      // await refetch();
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="overflow-x-auto container mx-auto">
      <TypographyH3
        title="Manage Upcoming Events"
        className="mb-12 text-center"
      />
      <table className="min-w-full border text-sm">
        <thead className="bg-primary">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Photo</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents?.data?.map(
            (event: IUpcomingEventData, index: number) => (
              <tr key={event._id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.photo} alt={event.title} />
                    <AvatarFallback>{event.title?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </td>
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{event.time}</td>
                <td className="space-x-2">
                  <Button onClick={() => handleUpdate(event._id)}>
                    <SquarePen size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(event._id)}
                    disabled={deletingId === event._id}
                  >
                    {deletingId === event._id ? (
                      <ButtonSpinner />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUpcomingEvent;
