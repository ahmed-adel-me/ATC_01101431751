import Link from "next/link";
import { checkIfBooked } from "@/actions/bookingActions";

export default async function EventCard({ event }) {
  const isBooked = await checkIfBooked(event._id);

  return (
    <Link
      href={`/events/${event._id}`}
      className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow relative bg-white dark:bg-gray-800"
    >
      {/* Event Image */}
      {event?.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      {/* Event Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {event.title}
      </h2>

      {/* Event Description */}
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {event.description}
      </p>

      {/* Event Date and Venue */}
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
        {new Date(event.date).toLocaleDateString()} at {event.venue}
      </p>

      {/* Event Price */}
      <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-2">
        ${event.price}
      </p>

      {/* Booking Status */}
      <div
        className={`mt-4 px-3 py-1 rounded-full text-sm font-semibold text-center w-fit ${
          isBooked
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        }`}
      >
        {isBooked ? "✔ Booked" : "Book Now"}
      </div>
    </Link>
  );
}
