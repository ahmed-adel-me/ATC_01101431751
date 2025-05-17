import cloudinary from "@/lib/cloudinary"; // adjust path as needed
import streamifier from "streamifier";

/**
 * Uploads an image file to Cloudinary.
 * Optionally deletes an old image (by public ID) before uploading the new one.
 * @param {File} image - The image file from FormData.
 * @param {string|null} oldPublicId - Optional Cloudinary public ID to delete.
 * @returns {Promise<{url: string, public_id: string}>} - Cloudinary image info.
 */
export async function uploadImage(image, oldPublicId = null) {
  if (!image || typeof image === "string") return null;

  if (oldPublicId) {
    try {
      await cloudinary.uploader.destroy(oldPublicId);
    } catch (err) {
      console.warn("Old image delete failed:", err.message);
    }
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads", // optional folder
        public_id: `${crypto.randomUUID()}`, // unique name
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

/**
 * Deletes an image from Cloudinary by its public ID.
 * @param {string} publicId - Cloudinary public ID.
 */
export async function deleteImage(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn("Failed to delete image:", err.message);
  }
}
