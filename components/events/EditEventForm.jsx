"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "@/actions/eventActions";

export default function EditEventForm({ event }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: event.title,
      description: event.description,
      category: event.category,
      venue: event.venue,
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      price: event.price,
    },
  });

  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    setServerError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("category", data.category || "");
    formData.append("venue", data.venue);
    formData.append("date", data.date);
    formData.append("price", data.price);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // file upload
    }

    try {
      await editEvent(event._id, formData);
      setSuccess("Event updated successfully.");
      // Optional: Redirect or refresh
      // window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setServerError("Failed to update event.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && <p className="text-red-500">{serverError}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          className="w-full border p-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2"
        />
      </div>

      <div>
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border p-2"
        />
      </div>

      <div>
        <input
          {...register("venue", { required: "Venue is required" })}
          placeholder="Venue"
          className="w-full border p-2"
        />
        {errors.venue && (
          <p className="text-red-500 text-sm">{errors.venue.message}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border p-2"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          placeholder="Price"
          className="w-full border p-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Current Image:</p>
        <img
          src={event.image}
          alt={event.title}
          className="w-32 h-32 object-cover mb-2"
        />
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="w-full border p-2"
        />
        <p className="text-sm text-gray-500">
          Leave empty to keep current image.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Updating..." : "Update Event"}
      </button>
    </form>
  );
}
