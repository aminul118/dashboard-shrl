import { useGetUpcomingEventsQuery } from "@/redux/features/event/event.api";

const ManageUpcomingEvent = () => {
  const { data: upcomingEvents, isLoading } =
    useGetUpcomingEventsQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(upcomingEvents?.data);

  return <div></div>;
};

export default ManageUpcomingEvent;
