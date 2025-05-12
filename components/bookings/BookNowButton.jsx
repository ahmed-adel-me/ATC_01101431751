import { createBooking, checkIfBooked } from "@/actions/bookingActions";

export default async function BookNowButton({ eventId }) {
  const isAlreadyBooked = await checkIfBooked(eventId);

  if (isAlreadyBooked) {
    return (
      <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold">
        ✔ Already Booked
      </span>
    );
  }

  async function handleBooking() {
    "use server";
    await createBooking(eventId);
  }

  return (
    <form action={handleBooking}>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition cursor-pointer"
      >
        Book Now
      </button>
    </form>
  );
}
