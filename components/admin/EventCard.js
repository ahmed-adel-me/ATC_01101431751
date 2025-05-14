import Link from "next/link";
import DeleteEventButton from "@/components/events/DeleteEventButton";

function EventCard({ event }) {
  return (
    <div className="border p-4 rounded shadow flex flex-col">
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
      <div className="mt-4 flex gap-2">
        <Link
          href={`/admin/events/edit/${event._id}`}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Edit
        </Link>
        <DeleteEventButton eventId={event._id} />
      </div>
    </div>
  );
}
export default EventCard;
