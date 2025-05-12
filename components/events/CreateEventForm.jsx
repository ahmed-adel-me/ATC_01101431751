"use client";

import { useForm } from "react-hook-form";
import { createEvent } from "@/actions/eventActions";
import SubmitButton from "../SubmitButton";

export default function CreateEventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image[0]); // Get first file
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await createEvent(formData);
      alert("Event created successfully!");
      reset();
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Event creation failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title", { required: "Title is required" })}
        placeholder="Title"
        className="w-full border p-2"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2"
      />

      <input
        {...register("category")}
        placeholder="Category"
        className="w-full border p-2"
      />

      <input
        {...register("venue", { required: "Venue is required" })}
        placeholder="Venue"
        className="w-full border p-2"
      />
      {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}

      <input
        type="date"
        {...register("date", { required: "Date is required" })}
        className="w-full border p-2"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <input
        type="number"
        {...register("price", {
          required: "Price is required",
          min: { value: 0, message: "Price must be non-negative" },
        })}
        placeholder="Price"
        className="w-full border p-2"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <input
        type="file"
        {...register("image", { required: "Image is required" })}
        accept="image/*"
        className="w-full border p-2"
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
