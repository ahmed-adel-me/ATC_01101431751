"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/eventActions";
import { useTranslations } from "next-intl";

export default function DeleteEventButton({ eventId, className }) {
  const t = useTranslations("deleteEvent");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(t("confirm"))) return;
    startTransition(async () => {
      try {
        await deleteEvent(eventId);
        router.push("/admin/events");
      } catch (err) {
        alert(t("error"));
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
      {isPending ? t("deleting") : t("button")}
    </button>
  );
}
