"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { createEvent } from "@/actions/eventActions";
import { GetCategories } from "@/actions/categoryActions";
import { GetTags } from "@/actions/tagActions";
import CategorySelect from "./CategorySelect";
import TagsMultiSelect from "./TagsMultiSelect";

// Main Form Component
export default function CreateEventForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const selectedTags = watch("tags") || [];

  useEffect(() => {
    (async () => {
      try {
        setCategories(await GetCategories());
        setTags(await GetTags());
      } catch (err) {
        console.error("Failed to fetch categories or tags:", err);
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else if (key === "tags") {
        (data.tags || []).forEach((tag) => formData.append("tags", tag));
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      await createEvent(formData);
      alert("Event created successfully!");
      reset();
    } catch (error) {
      console.error("Event creation failed:", error);
      alert("Event creation failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400 text-center">
        Create Event
      </h2>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Description"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <CategorySelect
        categories={categories}
        register={register}
        error={errors.category}
      />

      <TagsMultiSelect
        tags={tags}
        selectedTags={selectedTags}
        setValue={setValue}
        error={errors.tags}
      />

      <div>
        <label className="block font-medium mb-1">Venue</label>
        <input
          {...register("venue", { required: "Venue is required" })}
          placeholder="Venue"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Date</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Price</label>
        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be non-negative" },
          })}
          placeholder="Price"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Image</label>
        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          accept="image/*"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
