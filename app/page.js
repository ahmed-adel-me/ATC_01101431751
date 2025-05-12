import { getAllEvents } from "@/actions/eventActions";
import EventCard from "@/components/events/EventCard";

export default async function Home() {
  const events = await getAllEvents();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
