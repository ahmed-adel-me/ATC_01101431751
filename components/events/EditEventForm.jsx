"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "@/actions/eventActions";
import { GetCategories } from "@/actions/categoryActions";
import { GetTags } from "@/actions/tagActions";
import CategorySelect from "./CategorySelect";
import TagsMultiSelect from "./TagsMultiSelect";
import Spinner from "../Spinner";
export default function EditEventForm({ event }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: event.title,
      description: event.description,
      category: event?.category || "",
      venue: event.venue,
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      price: event.price,
      tags: event?.tags || [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);

  const selectedTags = watch("tags") || [];

  useEffect(() => {
    (async () => {
      try {
        const cats = await GetCategories();
        const tgs = await GetTags();
        setCategories(cats);
        setTags(tgs);
      } catch (err) {
        console.error("Failed to fetch categories or tags:", err);
      }
    })();
  }, []);
  const onSubmit = async (data) => {
    setServerError(null);
    setSuccess(null);

    const formData = new FormData();

    for (const key in data) {
      if (key === "image" && data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      } else if (key === "tags") {
        (data.tags || []).forEach((tag) => formData.append("tags", tag));
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await editEvent(event._id, formData);
      setSuccess("Event updated successfully.");
    } catch (err) {
      console.error(err);
      setServerError("Failed to update event.");
    }
  };

  if (!categories.length && !tags.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner size={70} />
      </div>
    );
  }

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
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2"
        />
      </div>
      {categories.length > 0 && (
        <CategorySelect
          categories={categories}
          register={register}
          error={errors.category}
        />
      )}

      <TagsMultiSelect
        tags={tags}
        selectedTags={selectedTags}
        setValue={setValue}
        error={errors.tags}
      />

      <div>
        <input
          {...register("venue", { required: "Venue is required" })}
          placeholder="Venue"
          className="w-full border p-2"
        />
        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
      </div>

      <div>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border p-2"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
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
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
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
