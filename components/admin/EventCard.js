import Link from "next/link";

function EventCard({ event }) {
  return (
    <Link
      href={`/admin/events/edit/${event._id}`}
      key={event._id}
      className="border p-4 rounded shadow"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p className="text-sm text-gray-600">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-800">{event.venue}</p>
      <p className="text-green-600 font-bold">${event.price}</p>
    </Link>
  );
}
export default EventCard;
