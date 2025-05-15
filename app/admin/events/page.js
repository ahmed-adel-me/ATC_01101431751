import { getAllEvents } from "@/actions/eventActions";
import EventCard from "@/components/admin/EventCard";
import Link from "next/link";
import Pagination from "@/components/events/Pagination";

export default async function EventsPage(props) {
  const searchParams = await props.searchParams;
  const { events, totalPages, page } = await getAllEvents(searchParams);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Link
          href="/admin/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
