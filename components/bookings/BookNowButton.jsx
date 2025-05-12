import { createBooking, checkIfBooked } from "@/actions/bookingActions";
import SubmitButton from "../SubmitButton";

export default async function BookNowButton({ eventId }) {
  const isAlreadyBooked = await checkIfBooked(eventId);

  if (isAlreadyBooked) {
    return (
      <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold">
        ✔ Already Booked
      </span>
    );
  }

  const handleBooking = createBooking.bind(null, eventId);
  return (
    <form action={handleBooking}>
      <SubmitButton>Book Now</SubmitButton>
    </form>
  );
}
