import { requireAdmin } from "@/lib/auth/requireAdmin";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const getTotalUsers = async () => {
  try {
    await requireAdmin();
    await dbConnect();
    const totalUsers = await User.countDocuments();
    // Using JSON.parse(JSON.stringify(...)) to remove Mongoose _id warning and ensure plain objects
    return totalUsers;
  } catch (error) {
    throw new Error("Failed to fetch total users");
  }
};
