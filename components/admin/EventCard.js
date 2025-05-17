import Link from "next/link";
import DeleteEventButton from "@/components/events/DeleteEventButton";
import { useTranslations } from "next-intl";

function EventCard({ event }) {
  const t = useTranslations("eventCard");

  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-shadow flex flex-col overflow-hidden group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event?.image.url}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {event.title}
          </h2>
          <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded font-semibold">
            {new Date(event.date).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {event.venue}
        </p>
        <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-4">
          ${event.price}
        </p>
        <div className="mt-auto flex gap-2">
          <Link
            href={`/admin/events/edit/${event._id}`}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition font-semibold text-center"
          >
            {t("edit")}
          </Link>
          <DeleteEventButton
            eventId={event._id}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition font-semibold text-center"
          />
        </div>
      </div>
    </div>
  );
}
export default EventCard;
