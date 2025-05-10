"use server";

import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export const signup = async (userData) => {
  const { name, email, password } = userData;

  try {
    // Connect to the database
    await dbConnect();

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { status: 200, message: "User created successfully!" };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Error creating user" };
  }
};
