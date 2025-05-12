"use server";

import { getServerSession } from "next-auth";
import Booking from "@/models/Booking";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export async function checkIfBooked(eventId) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  await dbConnect();

  const booking = await Booking.findOne({
    userId: session.user.id,
    eventId,
  });
  return booking ? true : false;
}

export async function createBooking(eventId) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const alreadyBooked = await checkIfBooked(eventId);

  if (alreadyBooked) {
    throw new Error("You already booked this event");
  }

  await Booking.create({
    userId: session.user.id,
    eventId,
  });

  revalidatePath("/"); // optional: revalidate event list
  redirect("/congrats");
}
