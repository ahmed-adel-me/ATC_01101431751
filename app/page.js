import { getAllEvents } from "@/actions/eventActions";
import Link from "next/link";

export default async function Home() {
  // Fetch events from the server

  const events = await getAllEvents();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            href={`/events/${event._id}`}
            key={event._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {event.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {new Date(event.date).toLocaleDateString()} at {event.venue}
            </p>
            <p className="text-lg font-bold mt-2">${event.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
