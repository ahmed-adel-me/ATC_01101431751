import { getEventById } from "@/actions/eventActions";
import EditEventForm from "@/components/events/EditEventForm";

export default async function EditPage({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EditEventForm event={event} />
    </div>
  );
}
