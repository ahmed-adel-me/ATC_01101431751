"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/eventActions";

export default function DeleteEventButton({ eventId, className }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    startTransition(async () => {
      try {
        await deleteEvent(eventId);
        router.push("/admin/events");
      } catch (err) {
        alert("Failed to delete event.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold ${className}`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
