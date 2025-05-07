import { createEvent } from "@/actions/eventActions";

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <form action={createEvent} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2"
        />
        <input
          name="category"
          placeholder="Category"
          className="w-full border p-2"
        />
        <input
          name="venue"
          placeholder="Venue"
          className="w-full border p-2"
          required
        />
        <input type="date" name="date" className="w-full border p-2" required />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-2"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
