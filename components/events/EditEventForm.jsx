"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editEvent } from "@/actions/eventActions";
import { GetCategories } from "@/actions/categoryActions";
import { GetTags } from "@/actions/tagActions";
import CategorySelect from "./CategorySelect";
import TagsMultiSelect from "./TagsMultiSelect";
import Spinner from "../Spinner";
import { useTranslations } from "next-intl";

export default function EditEventForm({ event }) {
  const t = useTranslations("editEvent");
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
        setCategories(await GetCategories());
        setTags(await GetTags());
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
      setSuccess(t("success"));
      // Optionally reset the form or refetch event data here
    } catch (err) {
      console.error(err);
      setServerError(t("error"));
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400 text-center">
        {t("title")}
      </h2>

      {serverError && <p className="text-red-500">{serverError}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label className="block font-medium mb-1">{t("form.title")}</label>
        <input
          {...register("title", { required: t("form.titleRequired") })}
          placeholder={t("form.title")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">
          {t("form.description")}
        </label>
        <textarea
          {...register("description", {
            required: t("form.descriptionRequired"),
          })}
          placeholder={t("form.description")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
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
        <label className="block font-medium mb-1">{t("form.venue")}</label>
        <input
          {...register("venue", { required: t("form.venueRequired") })}
          placeholder={t("form.venue")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.venue && <p className="text-red-500">{errors.venue.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">{t("form.date")}</label>
        <input
          type="date"
          {...register("date", { required: t("form.dateRequired") })}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">{t("form.price")}</label>
        <input
          type="number"
          {...register("price", {
            required: t("form.priceRequired"),
            min: { value: 0, message: t("form.priceNonNegative") },
          })}
          placeholder={t("form.price")}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">{t("form.image")}</label>
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500 mt-1">{t("leaveEmpty")}</p>
        {event?.image && (
          <div className="mt-2">
            <span className="text-sm text-gray-500">{t("currentImage")}</span>
            <div className="w-32 h-32 mb-2">
              <img
                src={event.image?.url}
                alt={event.title}
                className="object-cover rounded w-full h-full"
                style={{ width: "128px", height: "128px" }}
              />
            </div>
          </div>
        )}
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? t("updating") : t("update")}
      </button>
    </form>
  );
}
