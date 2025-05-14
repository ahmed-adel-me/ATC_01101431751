"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import dbConnect from "@/lib/dbConnect";
import Tag from "@/models/Tag";
import { revalidatePath } from "next/cache";

export const AddTag = async (name) => {
  await requireAdmin();
  await dbConnect();
  const exists = await Tag.findOne({ name });
  if (exists) throw new Error("Tag already exists");
  const tag = await Tag.create({ name });
  revalidatePath("/admin/tags");
  return tag;
};
export const DeleteTag = async (id) => {
  try {
    await requireAdmin();
    await dbConnect();
    await Tag.findByIdAndDelete(id);
    revalidatePath("/admin/tags");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete tag");
  }
};

export const GetTags = async () => {
  await dbConnect();
  try {
    const tags = await Tag.find().lean();
    // Using JSON.parse(JSON.stringify(...)) to remove Mongoose _id warning and ensure plain objects
    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
};
