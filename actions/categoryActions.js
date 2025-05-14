"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";

export const AddCategory = async (name) => {
  await requireAdmin();
  await dbConnect();
  const exists = await Category.findOne({ name });
  if (exists) throw new Error("Category already exists");
  const category = await Category.create({ name });
  revalidatePath("/admin/categories");
  return category;
};

export const DeleteCategory = async (id) => {
  try {
    await requireAdmin();
    await dbConnect();
    await Category.findByIdAndDelete(id);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};

export const GetCategories = async () => {
  await dbConnect();
  try {
    const categories = await Category.find().sort({ date: -1 }).lean();
    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
