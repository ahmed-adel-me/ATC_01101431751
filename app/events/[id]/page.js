// app/admin/events/[id]/page.js
import { getEventById } from "@/actions/eventActions";
import BookNowButton from "@/components/bookings/BookNowButton";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export default async function EventPage({ params }) {
  const t = await getTranslations("event");
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        {t("notFound")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Event Image */}
        <div className="relative w-full h-[350px] md:h-[400px]">
          <img
            src={event?.image?.url || "/placeholder.jpg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            style={{ height: "100%" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-8">
          <div className="flex flex-wrap gap-6 mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>{t("date")}:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>{t("venue")}:</strong> {event.venue}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>{t("category")}:</strong> {event?.category?.name}
            </p>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag._id || tag}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow"
                >
                  #{tag.name || tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-800 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {event.description}
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-8">
            {t("price")}: <span className="tracking-tight">${event.price}</span>
          </p>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <Suspense fallback={<Spinner size={50} />}>
              <BookNowButton eventId={event._id}>{t("bookNow")}</BookNowButton>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
