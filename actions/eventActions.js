"use server";

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { uploadImage, deleteImage } from "@/lib/utils/imageHandler";
import { revalidatePath } from "next/cache";

// Get all events
export const getAllEvents = async (searchParams = {}) => {
  const { category, tags = [], page = 1 } = searchParams;

  try {
    await dbConnect();

    const query = {};

    // Normalize tags input
    const tagsArray = typeof tags === "string" ? [tags] : tags;
    if (Array.isArray(tagsArray) && tagsArray.length > 0) {
      query.tags = { $all: tagsArray };
    }

    if (category) query.category = category;

    const limit = 5;
    const skip = (parseInt(page) - 1) * limit;

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Event.countDocuments(query);

    return {
      events: JSON.parse(JSON.stringify(events)),
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

// Get one event
export const getEventById = async (eventId) => {
  try {
    await dbConnect();

    const event = await Event.findById(eventId).lean();
    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
};

// Create event
export const createEvent = async (formData) => {
  try {
    await requireAdmin();
    await dbConnect();

    const image = formData.get("image");
    let imageData;

    if (image && typeof image !== "string") {
      imageData = await uploadImage(image); // Returns { url, public_id }
    }

    let tags = formData.getAll("tags");
    if (tags.length === 1 && tags[0] === "") tags = [];

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      venue: formData.get("venue"),
      date: formData.get("date"),
      price: Number(formData.get("price")),
      tags,
    };

    if (imageData) {
      eventData.image = imageData; // Whole object
    }

    await Event.create(eventData);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

// Edit event
export async function editEvent(id, formData) {
  try {
    await requireAdmin();
    await dbConnect();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const tags = formData.getAll("tags");
    const venue = formData.get("venue");
    const date = formData.get("date");
    const price = formData.get("price");
    const image = formData.get("image");

    const updateData = {
      title,
      description,
      category,
      tags,
      venue,
      date,
      price: Number(price),
    };

    if (image && typeof image !== "string") {
      const existingEvent = await Event.findById(id);
      if (!existingEvent) throw new Error("Event not found");

      // Delete old image from Cloudinary
      if (existingEvent.image?.public_id) {
        await deleteImage(existingEvent.image.public_id);
      }

      // Upload new image to Cloudinary
      const newImageData = await uploadImage(image);
      updateData.image = newImageData;
    }

    await Event.findByIdAndUpdate(id, updateData);
    revalidatePath(`/admin/events/edit/${id}`);
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

// Delete event
export const deleteEvent = async (eventId) => {
  try {
    await requireAdmin();
    await dbConnect();

    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");

    await Event.deleteOne({ _id: eventId });

    if (event.image?.public_id) {
      await deleteImage(event.image.public_id);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};
