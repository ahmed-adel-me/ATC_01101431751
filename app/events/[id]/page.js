// app/admin/events/[id]/page.js
import { getEventById } from "@/actions/eventActions";
import BookNowButton from "@/components/bookings/BookNowButton";

export default async function EventPage({ params }) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Event Image */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-4xl font-bold text-white">{event.title}</h1>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-8">
          <div className="flex flex-wrap gap-6 mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Category:</strong> {event.category}
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {event.description}
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
            ${event.price}
          </p>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <BookNowButton eventId={event._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
