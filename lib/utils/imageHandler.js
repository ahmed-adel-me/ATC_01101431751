import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

/**
 * Uploads an image file to the public/uploads folder.
 * Optionally deletes an old image before uploading the new one.
 * @param {File} image - The image file from FormData.
 * @param {string|null} oldImage - Optional existing image path to delete.
 * @returns {Promise<string>} - Public path to the new image.
 */
export async function uploadImage(image, oldImage = null) {
  if (!image || typeof image === "string") return null;

  if (oldImage) {
    const oldPath = path.join(process.cwd(), "public", oldImage);
    await fs
      .unlink(oldPath)
      .catch((err) =>
        console.warn("Old image not found or already deleted:", err.message)
      );
  }

  const uniqueName = `${crypto.randomUUID()}-${image.name}`;
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const imagePath = path.join(uploadDir, uniqueName);
  const buffer = Buffer.from(await image.arrayBuffer());

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(imagePath, buffer);

  return `/uploads/${uniqueName}`;
}

/**
 * Deletes an image from the public/uploads folder.
 * @param {string} imagePath - Relative public path (e.g., /uploads/image.jpg).
 */
export async function deleteImage(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    await fs.unlink(fullPath);
  } catch (err) {
    console.warn("Failed to delete image:", err.message);
  }
}
