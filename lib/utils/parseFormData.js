export default function parseFormData(formData) {
  const data = {};

  for (const [key, value] of formData.entries()) {
    if (key === "image") continue; // Skip the image field
    data[key] = value;
  }

  return data;
}
