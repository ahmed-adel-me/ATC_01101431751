import { getEventById } from "@/actions/eventActions";
import EditEventForm from "@/components/events/EditEventForm";
import { getTranslations } from "next-intl/server";

export default async function EditPage({ params }) {
  const t = await getTranslations("editEvent");
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return <p>{t("notFound")}</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <EditEventForm event={event} />
    </div>
  );
}
