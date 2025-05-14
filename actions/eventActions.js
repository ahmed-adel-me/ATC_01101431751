"use server";

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { uploadImage, deleteImage } from "@/lib/utils/imageHandler";
// Server action to get all events
export const getAllEvents = async () => {
  try {
    // Connect to the database
    await dbConnect();

    const events = await Event.find({}).sort({ date: 1 }).lean();

    // Using JSON.parse(JSON.stringify(...)) to remove Mongoose _id warning and ensure plain objects
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const getEventById = async (eventId) => {
  try {
    // Connect to the database
    await dbConnect();

    const event = await Event.findById(eventId).lean();
    if (!event) {
      throw new Error("Event not found");
    }
    // Using JSON.parse(JSON.stringify(...)) to remove Mongoose _id warning and ensure plain objects
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
};

// Server action to create a new event with an uploaded image
export const createEvent = async (formData) => {
  try {
    await requireAdmin();
    await dbConnect();

    const image = formData.get("image");
    if (!image || typeof image === "string") {
      throw new Error("Invalid image file");
    }

    const imageUrl = await uploadImage(image);

    let tags = formData.getAll("tags");
    if (tags.length === 1 && tags[0] === "") tags = [];

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      venue: formData.get("venue"),
      date: formData.get("date"),
      price: Number(formData.get("price")),
      image: imageUrl,
      tags,
    };

    await Event.create(eventData);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};
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

      const newImagePath = await uploadImage(image, existingEvent.image);
      updateData.image = newImagePath;
    }

    await Event.findByIdAndUpdate(id, updateData);
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

export const deleteEvent = async (eventId) => {
  try {
    await requireAdmin();
    await dbConnect();

    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");

    await Event.deleteOne({ _id: eventId });

    if (event.image) {
      await deleteImage(event.image);
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};
