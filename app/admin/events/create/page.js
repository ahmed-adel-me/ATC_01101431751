import CreateEventForm from "@/components/events/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}
