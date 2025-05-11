"use server";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import fs from "fs/promises";
import crypto from "crypto";
// Server action to get all events
export const getAllEvents = async () => {
  try {
    // Connect to the database
    await dbConnect();

    const events = await Event.find({}).sort({ date: 1 }).lean();

    return events;
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
    return event;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
};

// Server action to create a new event with an uploaded image
export const createEvent = async (formData) => {
  try {
    await dbConnect();

    // Extract image file
    const image = formData.get("image");
    if (!image || typeof image === "string") {
      throw new Error("Invalid image file");
    }

    // Create a unique filename
    const uniqueName = `${crypto.randomUUID()}-${image.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const imagePath = path.join(uploadDir, uniqueName);

    // Convert image to buffer and save
    const buffer = Buffer.from(await image.arrayBuffer());
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(imagePath, buffer);

    // Construct event data object
    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      venue: formData.get("venue"),
      date: formData.get("date"),
      price: Number(formData.get("price")),
      image: `/uploads/${uniqueName}`,
    };

    // Save to DB
    await Event.create(eventData);
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

// Server action to update an existing event
// Server action to update an existing event
export async function editEvent(id, formData) {
  try {
    await dbConnect();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const venue = formData.get("venue");
    const date = formData.get("date");
    const price = formData.get("price");
    const image = formData.get("image"); // file or string

    // Build the update object
    const updateData = {
      title,
      description,
      category,
      venue,
      date,
      price: Number(price),
    };

    // Handle new image upload if provided
    if (image && typeof image !== "string") {
      // Find existing event to delete old image
      const existingEvent = await Event.findById(id);

      if (!existingEvent) {
        throw new Error("Event not found");
      }

      // Delete the old image
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        existingEvent.image
      );
      await fs.unlink(oldImagePath).catch((err) => {
        console.warn("Old image not found or already deleted:", err.message);
      });

      // Save new image
      const uniqueName = `${crypto.randomUUID()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const imagePath = path.join(uploadDir, uniqueName);
      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(imagePath, buffer);

      // Set new image path
      updateData.image = `/uploads/${uniqueName}`;
    }

    // Update in the DB
    await Event.findByIdAndUpdate(id, updateData);
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

export const deleteEvent = async (eventId) => {
  try {
    await dbConnect();

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    // Delete the event from the database
    await Event.deleteOne({ _id: eventId });

    // Delete the image file from the server
    const imagePath = path.join(process.cwd(), "public", event.image);
    await fs.unlink(imagePath);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};
